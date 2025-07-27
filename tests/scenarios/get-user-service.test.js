import userService from '../endpoint/user.service.js';
import { randomUsername } from '../utils/data.helper.js';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const username = randomUsername('pzn');
  const password = 'rahasia';
  const name = 'Programmer Zaman Now';

  const registerRes = userService.register(username, password, name);
  check(registerRes, {
    'Register success': (res) => res.status === 200 || res.status === 201,
  });

  const loginRes = userService.login(username, password);
  const token = loginRes.json('data')?.token;
  console.log(`🔑 Token received: ${token}`);
  check(loginRes, {
    'Login success': (res) => res.status === 200,
    'Token received': () => !!token,
  });

  const userRes = userService.getCurrentUser(token);
  const userData = userRes.json('data');
  console.log(`👤 Username received: ${userData.username}`);

  check(userRes, {
    'Get current user success': (res) => res.status === 200,
    'Correct username returned': () => userData.username === username,
  });
}
