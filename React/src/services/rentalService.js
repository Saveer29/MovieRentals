import http from "./httpService";
const apiEndpoint = "http://localhost:3900/api/rentals";

export function getRentals() {
  return http.get(apiEndpoint);
}
