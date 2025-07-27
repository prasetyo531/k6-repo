import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  // 1. Register
  const registerPayload = JSON.stringify({
    username: 'pzn-guest-admin-seven',
    password: 'rahasia',
    name: 'Programmer Zaman Now',
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  const registerRes = http.post(
    'http://localhost:3000/api/users',
    registerPayload,
    { headers }
  );

  check(registerRes, {
    'Register success (200 or 201)': (res) => res.status === 200 || res.status === 201,
  });

  // 2. Login and extract token
  const loginPayload = JSON.stringify({
    username: 'pzn-guest-admin-seven',
    password: 'rahasia',
  });

  const loginRes = http.post(
    'http://localhost:3000/api/users/login',
    loginPayload,
    { headers }
  );

  check(loginRes, {
    'Login success (200)': (res) => res.status === 200,
    'Token received': (res) => res.json('data')?.token !== undefined,
  });

  const token = loginRes.json('data').token;
  console.log(`🔑 Token received: ${token}`);

  // 3. Get user details
  const userRes = http.get('http://localhost:3000/api/users/current', {
    headers: {
      Authorization: token,
    },
  });

  const currentUser = userRes.json('data');
  console.log(`👤 Username received: ${currentUser.username}`);
  const expectedUsername = 'pzn-guest-admin-seven'; 

  check(userRes, {
    'Get current user success (200)': (res) => res.status === 200,
    'Correct username returned': () => currentUser.username === expectedUsername,
  });

  sleep(1);
}