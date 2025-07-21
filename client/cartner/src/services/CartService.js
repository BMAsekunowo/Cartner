import axios from "axios";

//This is the base URL for local server
const port = "http://localhost:5005";

export const getCartByUserId = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${port}/api/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCartQuantity = async (cartId, productId, quantity) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return await axios.patch(
    `${port}/api/carts/${cartId}/quantity`,
    { productId, change: quantity }, // assuming `change` is expected
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const removeProductFromCart = async (cartId, productId) => {
  const token = localStorage.getItem("token");
  return await axios.delete(
    `${port}/api/carts/${cartId}/product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const addProductToCart = async (cartId, productId, quantity = 1) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const res = await axios.post(
    `${port}/api/carts/${cartId}/product`,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getSingleCart = async (cartId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${port}/api/carts/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const clearCart = async (cartId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return await axios.delete(`${port}/api/carts/${cartId}/clear`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCart = async (cartId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return await axios.delete(`${port}/api/carts/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
