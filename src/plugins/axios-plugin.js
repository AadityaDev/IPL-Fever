import Axios from 'axios';

// Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api-router.azurefd.net' : 'https://genpact-router-app-service.azurewebsites.net';
Axios.defaults.baseURL = window.location.origin.includes('genpact.com') || !!window.cordova ? 'https://api-router.azurefd.net' : 'https://genpact-router-app-service.azurewebsites.net';
Axios.defaults.headers.common.Accept = 'application/json';
// Axios.defaults.headers.common.withCredentials = true;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return Axios;
      },
    },
  });
};
