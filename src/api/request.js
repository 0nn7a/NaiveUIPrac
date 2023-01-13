import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5173',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    pragma: 'no-cache',
    'cache-control': 'no-cache',
  },
});

instance.interceptors.request.use(
  config => {
    let token = localStorage.getItem('Authorization');
    return {
      ...config,
      headers: { ...config.headers, Authorization: token },
    };
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 2xx 以外的狀態碼就會觸發
    return Promise.reject(error);
  }
);

const useApi = {
  get(url) {
    return instance.get(url);
  },
  post(url, body) {
    return instance.post(url, body);
  },
};

export default useApi;
