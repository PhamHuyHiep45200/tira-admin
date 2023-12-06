import request from ".";

export async function getAllUser() {
  return request(`/user/all`, {
    method: "GET",
  });
}
export async function getUserById(id) {
  return request(`/user/${id}`, {
    method: "GET",
  });
}
export async function createUser(data) {
  return request(`/user/create`, {
    method: "POST",
    data,
  });
}
export async function updateUser(id, data) {
  return request(`/user/update/${id}`, {
    method: "PUT",
    data,
  });
}
export async function deleteUser(id) {
  return request(`/user/delete/${id}`, {
    method: "DELETE",
  });
}