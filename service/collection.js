import request from ".";

export async function getAllCollection(params) {
  return request(`/collection/all`, {
    method: "GET",
    params
  });
}
export async function getCollectionById(id) {
  return request(`/collection/${id}`, {
    method: "GET",
  });
}
export async function createCollection(data) {
  return request(`/collection/create`, {
    method: "POST",
    data,
  });
}
export async function updateCollection(id, data) {
  return request(`/collection/update/${id}`, {
    method: "POST",
    data,
  });
}
export async function deleteCollection(id) {
  return request(`/collection/delete/${id}`, {
    method: "DELETE",
  });
}