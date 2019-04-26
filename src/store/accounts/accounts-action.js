export default ({ $http }) => ({
  login(context, payload) {
    return $http
      .post('/api/v1/login', payload, {
        requestName: 'login',
      })
      .then((res) => {
        const response = res.data;
        response.user = response.profile;
        delete response.profile;

        context.commit('setLoggedInState', response);
        context.commit('setNextRouteState', {
          next: context.rootState.route.query.redirect ? context.rootState.route.query.redirect : '/dashboard',
        });

        $http.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));

        if (response.sessionRedirectUrl && process.env.NODE_ENV === 'production' && window.location.origin.includes('gsocialgo')) window.location.replace(response.sessionRedirectUrl);

        return response;
      })
      .catch((err) => {
        context.dispatch('addToastNotifications', {
          text: 'Invalid username or password',
          timer: 4000,
          type: 'error',
        });
        throw (err.response && err.response.data && err.response.data.message) || err;
      });
  },

  logout(context, redirectUrl) {
    delete $http.defaults.headers.common.Authorization;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    context.commit('setNextRouteState', {
      next: `/login${redirectUrl ? `?redirect=${redirectUrl}` : ''}`,
    });
    context.commit('setLoggedOutState');
  },

  getProfile(context) {
    return $http.get('/api/v1/account/profile', {
      requestName: 'getProfile',
    })
      .then((res) => {
        const response = res.data;
        context.commit('setProfileState', response);
        return response;
      }).catch((err) => {
        context.dispatch('addToastNotifications', {
          text: (err.response && err.response.data && err.response.data.message) || err
            .message,
          timer: 4000,
          type: 'error',
        });
        throw (err.response && err.response.data && err.response.data.message) || err;
      });
  },

  updateProfile(context, payload) {
    return $http.put('/api/v1/account/profile', payload, {
      requestName: 'updateProfile',
    })
      .then((res) => {
        const response = res.data;
        context.commit('updateProfileState', payload);
        context.dispatch('addToastNotifications', {
          text: 'Successfully updated profile details',
          timer: 4000,
        });
        return response;
      }).catch((err) => {
        context.dispatch('addToastNotifications', {
          text: (err.response && err.response.data && err.response.data.message) || err
            .message,
          timer: 4000,
          type: 'error',
        });
        throw (err.response && err.response.data && err.response.data.message) || err;
      });
  },

});
