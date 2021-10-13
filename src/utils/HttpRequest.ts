import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: Config.API_URL,
  // baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  timeout: 5000,
});

instance.interceptors.request.use(
  config => {
    // const token = 'dljsfklsdfklsdklfsdklfklds';

    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }

    return config;
  },
  error => {
    console.log('ERROR', error);
  },
);

export default instance;
