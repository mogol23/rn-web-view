import user from '../redux/actions/user';
import { auth as authService } from '../services';

async function login(email: String, password: String) {
  try {
    user.fetchStart();
    // const response = await authService.login(email, password);
    // if (response.data.user) {
    //   response.data.current = response.data.user;
    //   delete response.data.user;
    // }
    user.setState({
      logged_in: true,
      // ...response.data,
    });
  } catch (error) {
  } finally {
    user.fetchEnd();
  }
}

function signout() {
  user.resetState();
}

export default {
  login,
  signout,
};
