import axios from 'axios';

//開発時： "http://localhost:9876/api/v1"
//デプロイ時: endpointまでのパスで良いので "/api/v1"

const axiosClient = axios.create({
  baseURL: '/api/v1',
});

export default axiosClient;
