import axios from "axios";

export const fetchCart = async (userId) => {
  try {
    const response = await axios.get(`/api/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cart.");
  }
};

export const addCartItem = async (userId, dogId, quantity) => {
  try {
    const response = await axios.post(`/api/cart/add/${userId}`, {
      dogId,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error adding item to cart.");
  }
};

export const updateCartItemQuantity = async (userId, cartItemId, quantity) => {
  try {
    const response = await axios.put(`/api/cart/${userId}/${cartItemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating item quantity.");
  }
};

export const removeCartItem = async (userId, cartItemId) => {
  await axios.delete(`/api/cart/${userId}/${cartItemId}`);
};
