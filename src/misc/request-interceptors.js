function setAuthHeaders({ $http }) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    $http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete $http.defaults.headers.common.Authorization;
  }
}

export default ({ store, $http }) => {
  // Initialize the function first time
  setAuthHeaders({ $http });

  // Add a request interceptor
  $http.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      setAuthHeaders({ $http });
      store.dispatch('setRequestStatus', {
        inProgress: true,
        status: 'IN_PROGRESS',
        key: config.requestName || '',
      });
      return config;
    },
    error => Promise.reject(error), // Do something with request error
  );

  // Add a response interceptor
  $http.interceptors.response.use(
    (response) => {
      // Do something with response data
      store.dispatch('clearRequestStatus');
      return response;
    },
    (error) => {
      // Do something with response error
      try {
        if (error.response.status === 401) {
          store.dispatch('addToastNotifications', {
            text: 'You have been logged out due to token expiry...',
            timer: 4000,
            type: 'error',
          });
          store.dispatch('logout', store.state.route.fullPath);
        }
      } catch (e) {
        console.warn(e.message); // eslint-disable-line
      }

      store.dispatch('clearRequestStatus');
      return Promise.reject(error);
    },
  );
};
