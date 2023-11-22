import { AuthData } from '../interface/functionInterface';
import axiosClient from './axiosClient';

const authApi = {
  checkAuth: () => axiosClient.get('auth/checkAuth', { withCredentials: true }),
  login: (params: AuthData) =>
    axiosClient.post('auth/login', params, { withCredentials: true }),
  logout: () =>
    axiosClient.get('auth/logout', {
      withCredentials: true,
    }),
  signup: (params: AuthData) =>
    axiosClient.post('auth/signup', params, { withCredentials: true }),
};

export default authApi;
