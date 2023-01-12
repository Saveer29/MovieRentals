import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "http://localhost:3900/api/auth";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
  return jwt;
}

http.setJwt(getJwt());

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export async function logout() {
  localStorage.removeItem("token");
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

const Auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default Auth;
