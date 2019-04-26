import dayJs from 'dayjs';
import accountsActionModule from './accounts-actions';

const initializeState = () => ({
  accessToken: null,
  user: {},
  profile: {},
  workHistory: [],
  itAssets: [],
  approvalRequests: [],
  rewards: {
    earnedBadges: [],
    pointsEarned: [],
    totalPoints: 0,
  },
  preferences: {},
});

export default ({ $http }) => ({
  state: {
    ...initializeState(),
    accessToken: localStorage.getItem('accessToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
  },
  mutations: {
    setLoggedInState(state, payload) {
      state.accessToken = payload.accessToken ? payload.accessToken : null;
      state.user = payload.user ? { ...payload.user } : {};
    },
    setLoggedOutState(state) {
      Object.assign(state, initializeState());
    },
    setProfileState(state, payload) {
      state.profile = Object.keys(payload).length ? payload : {};
    },
    setProfilePreferencesInState(state, payload) {
      state.preferences = Object.keys(payload).length ? payload : {};
    },
    updateProfileState(state, payload) {
      state.profile = Object.keys(payload).length ? { ...state.profile, ...payload } : state.profile;
    },
    setWorkHistoryInState(state, payload) {
      state.workHistory = payload.length ? payload : [];
    },
    setITAssetsInState(state, payload) {
      state.itAssets = payload.length ? payload : [];
    },
    setRewardsInState(state, payload) {
      state.rewards = Object.keys(payload).length ? payload : {
        earnedBadges: [],
        pointsEarned: [],
        totalPoints: 0,
      };
    },
    setApprovalRequestsInState(state, payload) {
      state.approvalRequests = payload.length ? payload : [];
    },
    updateApprovalRequestsInState(state, payload) {
      if (Object.keys(payload).length) {
        const index = state.approvalRequests.findIndex(request => request.Signature_Instance_ID__c === payload.Signature_Instance_ID__c);

        state.approvalRequests = [
          ...state.approvalRequests.slice(0, index),
          ...state.approvalRequests.slice(index + 1, state.approvalRequests.length),
        ];
      }
    },
  },
  actions: accountsActionModule({ $http }),
  getters: {
    isLoggedIn: state => !!state.accessToken,
    user: (state) => {
      const user = { ...state.user };
      const fullName = `${user.firstName ? `${user.firstName}` : ''}${user.middleName
        ? ` ${user.middleName}`
        : ''} ${user.lastName ? `${user.lastName}` : ''}`;
      user.fullName = fullName;
      return user;
    },
    profile: (state) => {
      const profile = { ...state.profile };
      const FullName = `${profile.FirstName ? `${profile.FirstName}` : ''}${profile.MiddleName
        ? ` ${profile.MiddleName}`
        : ''} ${profile.LastName ? `${profile.LastName}` : ''}`;
      profile.FullName = FullName.trim();

      if (profile.SupervisorName) {
        const SupervisorName = `${profile.SupervisorName.split(',')[0]
          ? `${profile.SupervisorName.split(',')[0]}`
          : ''}${profile.SupervisorName.split(',')[1]
          ? ` ${profile.SupervisorName.split(',')[1]}`
          : ''}${profile.SupervisorName.split(',')[2] ? `${profile.SupervisorName.split(',')[2]}` : ''}`;
        profile.SupervisorName = SupervisorName;
      }
      if (profile.BandCode) {
        const bandCode = profile.BandCode;
        const empBand = `${bandCode.substring(0, 1) ? `${bandCode.substring(0, 1)}` : ''}${bandCode.substring(3)
          ? ` ${bandCode.substring(3)}`
          : ''} `;
        profile.EmpBand = empBand;
      }
      return profile;
    },
    workHistory: (state) => {
      const workHistoryArr = [...state.workHistory].map((obj) => {
        const work = obj;
        const grade = work.GRADE;
        const date1 = dayJs(work.ASSIGNMENT_START_DATE);
        const date2 = dayJs(work.ASSIGNMENT_END_DATE).isAfter(new Date()) ? dayJs(new Date()) : dayJs(work.ASSIGNMENT_END_DATE);
        work.duration = date2.diff(date1, 'month');

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(grade)) work.gradeSi = parseInt(grade, 10) + grade[grade.length - 1];
        else work.gradeSi = parseInt(grade, 10);

        // const years = date2.diff(date1, 'year');
        // const updatedDateAfterYear = date1.add(years, 'year');

        // const months = updatedDateAfterYear.diff(date1, 'months');
        // const updatedDateAfterMonths = date1.add(months, 'month');

        // const days = updatedDateAfterMonths.diff(date1, 'days');

        // console.log(`${years} years ${months} months ${days} days`);

        return work;
      });
      return workHistoryArr;
    },
    itAssets: state => state.itAssets,
    rewards: state => state.rewards,
    approvalRequests: state => state.approvalRequests,
    preferences: state => state.preferences,
  },
});
