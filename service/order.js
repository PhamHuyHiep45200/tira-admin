import request from ".";

export async function getAllOrder() {
  return request(`/order`, {
    method: "GET",
  });
}

export async function changeStatusOrder(id, status) {
  return request(`/order/update/${id}`, {
    method: "POST",
    data: {
      status
    }
  });
}