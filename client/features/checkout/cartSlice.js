import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (userId) => {
  try {
    const { data } = await axios.get(`/api/cart/${userId}`);
    return data;
  } catch (error) {
    return error.message;
  }
});

export const createOrder = createAsyncThunk("cart/createOrder", async (orderData) => {
  const response = await axios.post("/api/orders", orderData);
  const createdOrder = response.data;

  return createdOrder;
});


// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (item) => {
//       const response = await axios.post("/api/cart", item);
//       return response.data;

//   }
// );
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const { name, sponsorFee,  userId, dogId,  cartItems } = item;
    // sponsorFee, gender, imageUrl,email, address, firstName, lastName, password, isAdmin,userName,
    const payload = {
      name,
      sponsorFee,
      // gender,
      // imageUrl,
      userId,
      dogId,
      user: {
        // userName,
        // email,
        // address,
        // firstName,
        // lastName,
        // password,
        // isAdmin,
        cartItems,
      },
    };

    dispatch(addToCart(item));


    const response = await axios.post("/api/cart", payload);
    return response.data;
  }
);



export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId) => {

      await axios.delete(`/api/removeFromCart/${itemId}`);
    return itemId;
  }
);
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ itemId, quantity }) => {
    const response = await axios.put(`/api/cart/${itemId}`, { quantity });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.items = [];
      state.totalPrice = 0;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.sponsorFee === item.sponsorFee
      );
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        const newItem = {
          ...item,
          amount: 1,
          price: item.price,
        };
        state.items.push(newItem);
      }
      state.totalPrice += item.price;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        if (existingItem.amount === 1) {
          state.items = state.items.filter((i) => i.id !== itemId);
        } else {
          existingItem.amount -= 1;
        }
        state.totalPrice -= existingItem.price;
      }
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        existingItem.amount = quantity;
        state.totalPrice += (quantity - existingItem.amount) * existingItem.price;
      }
    });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
















// export const{
//   createOrder,
//   addToCart,
//   removeFromCart,
//   fetchCartItems,
//   selectCartItems,
// } = cartSlice.actions


// addToCart: (state, action) => {
    //   const item = action.payload;
    //   const existingItem = state.items.find(
    //     (i) => i.id === item.id && i.sponsorFee === item.sponsorFee
    //   );

    //   if (existingItem) {
    //     existingItem.amount += 1;
    //   } else {
    //     const newItem = {
    //       ...item,
    //       amount: 1,
    //       price: item.price,
    //     };
    //     state.items.push(newItem);
    //   }
    //   state.totalPrice += item.price;
    // },
    // removeFromCart: (state, action) => {
    //   const itemId = action.payload;
    //   const existingItem = state.items.find((i) => i.id === itemId);
    //   if (existingItem) {
    //     if (existingItem.amount === 1) {
    //       state.items = state.items.filter((i) => i.id !== itemId);
    //     } else {
    //       existingItem.amount -= 1;
    //     }
    //     state.totalPrice -= existingItem.price;
    //   }
    // },




// addToCart: (state, action) => {
//   const item = action.payload;
//   const existingItem = state.items.find((i) => i.id === item.id);
//   if (existingItem) {
//     existingItem.amount += 1;
//   } else {
//     const newItem = {
//       ...item,
//       amount: 1,
//       price: item.price, // Set the correct price value
//     };
//     state.items.push(newItem);
//   }
//   state.totalPrice += item.price;
// },




// import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
// import { Order } from "../../../server/db/models/Order";

// export const createOrder = createAsyncThunk(
//   "cart/createOrder",
//   async (_, { getState }) => {
//     const { items, totalPrice } = getState().cart;
//     // Use items and totalPrice to create the order data
//     const orderData = {
//       items: items,
//       totalPrice: totalPrice,
//       // other relevant fields
//     };

//     // Call the Sequelize methods to create a new order entry in the database
//     const createdOrder = await Order.create(orderData);

//     return createdOrder;
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     totalPrice: 0,
//   },
//   reducers: {
//         addToCart: (state, action) => {
//           const item = action.payload;
//           const existingItem = state.items.find((i) => i.id === item.id);
//           if (existingItem) {
//             existingItem.amount += 1;
//           } else {
//             const newItem = {
//               ...item,
//               amount: 1,
//               price: item.price, // Set the correct price value
//             };
//             state.items.push(newItem);
//           }
//           state.totalPrice += item.price;
//         },
//         removeFromCart: (state, action) => {
//           const itemId = action.payload;
//           const existingItem = state.items.find((i) => i.id === itemId);
//           if (existingItem) {
//             if (existingItem.amount === 1) {
//               state.items = state.items.filter((i) => i.id !== itemId);
//             } else {
//               existingItem.amount -= 1;
//             }
//             state.totalPrice -= existingItem.price;
//           }
//         },
//         extraReducers: (builder) => {
//               builder.addCase(createOrder.fulfilled, (state, action) => {
//                 // Handle the fulfilled state of createOrder action
//                 // Reset the cart state or perform any necessary updates
//                 state.items = [];
//                 state.totalPrice = 0;
//               });
//                 },
//               }
//             });

// export const { addToCart, removeFromCart } = cartSlice.actions;

// // Select cart items
// export const selectCartItems = createSelector(
//   (state) => state.cart,
//   (cart) => cart
// );

// export default cartSlice.reducer;
