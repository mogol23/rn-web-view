import { apiInstance } from './../utils';
import { response } from './../utils/apiInstance';

function login(email: String, password: String): Promise<response> {
  return apiInstance.post('api/auth/login/manager', {
    email,
    password,
    origin: 'application',
  });
}

function requestResetPasswordLink(email: String): Promise<response> {
  return apiInstance.post('api/auth/reset-password/send', {
    email,
  });
}

function changePassword(
  newPassword: String,
  oldPassword: String,
): Promise<response> {
  return apiInstance.put('api/users/me/password', {
    newPassword,
    oldPassword,
  });
}

export default {
  login,
  requestResetPasswordLink,
  changePassword,
};
