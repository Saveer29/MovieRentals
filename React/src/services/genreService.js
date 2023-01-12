import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/genres";

export function getGenres() {
  return http.get(apiEndpoint);
}
