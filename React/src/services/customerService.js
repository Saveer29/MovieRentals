import http from "./httpService";
const apiEndpoint = "http://localhost:3900/api/customers";

function getCustomerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function deleteCustomer(id) {
  return http.delete(getCustomerUrl(id));
}
