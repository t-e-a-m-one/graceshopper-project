import axios from "axios";

export const addCartItemAPI = async (dogId, userId) => {
  try {
    const response = await axios.post("/cart/add", { dogId, userId });
    return response.data;
  } catch (error) {
    throw new Error("Error adding item to cart.");
  }
};
