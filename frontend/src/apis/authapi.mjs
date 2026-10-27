import axios from 'axios';
import { BASE_URL } from './config.mjs';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = async ({ email, password }) => {
  // The backend currently identifies users by email; password authentication
  // is not implemented in its API.
  const response = await axiosInstance.get(`/api/users/email/${encodeURIComponent(email)}`);
  const user = response.data.user;
  return {
    data: {
      username: user.email,
      email: user.email,
      user_id: user._id
    }
  };
};

export const signupUser = async ({ username, email, password }) => {
  return axiosInstance.post('/api/users', {
    email,
    user_type: 'USER'
  });
};

const AUTH_APIS = {
    loginUser,
    signupUser
};

export default AUTH_APIS;
