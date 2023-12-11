import axios from 'axios';

//開発時： "http://localhost:9876/api/v1"
//デプロイ時: endpointまでのパスで良いので "/api/v1"
const BaseURL = {
  clientDev: 'http://localhost:9876/api/v1',
  production: '/api/v1',
};
const path = BaseURL[import.meta.env.VITE_NODE_ENV as keyof typeof BaseURL];
console.log('BaseURL : ', path);
console.log('VITE_NODE_ENV : ', import.meta.env.VITE_NODE_ENV);

const axiosClient = axios.create({
  baseURL: path,
});

export default axiosClient;
