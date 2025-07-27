import http from 'k6/http';

const BASE_URL = __ENV.BASE_URL;

function register(username, password, name) {
  const payload = JSON.stringify({ username, password, name });
  return http.post(`${BASE_URL}/api/users`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}

function login(username, password) {
  const payload = JSON.stringify({ username, password });
  return http.post(`${BASE_URL}/api/users/login`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}

function getCurrentUser(token) {
  return http.get(`${BASE_URL}/api/users/current`, {
    headers: { Authorization: token },
  });
}

export default {
  register,
  login,
  getCurrentUser,
};
