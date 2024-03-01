import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  deleteOrder,
  getOrder,
  // getOrders,
  // getUserOrders,
  updateOrder,
} from "./orderActions";

const initialState = {
  loading: false,
  ordersData: localStorage.getItem("ordersData")
    ? JSON.parse(localStorage.getItem("ordersData"))
    : [
        {
          status: "",
          totalAmount: "",
          createdAt: "",
        },
      ],
  userOrdersData: localStorage.getItem("userOrdersData")
    ? JSON.parse(localStorage.getItem("userOrdersData"))
    : [
        {
          status: "",
          totalAmount: "",
          createdAt: "",
        },
      ],
  error: null,
  success: false,
  selectedOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUpdatedOrderData: (state, { payload }) => {
      state.ordersData = payload.orders;
      if (!payload.orders) localStorage.removeItem("ordersData");
      else {
        localStorage.setItem("ordersData", JSON.stringify(payload.orders));
      }
    },
    setUpdatedUsersOrderData: (state, { payload }) => {
      state.userOrdersData = payload.orders;
      if (!payload.orders) localStorage.removeItem("userOrdersData");
      else {
        localStorage.setItem("userOrdersData", JSON.stringify(payload.orders));
      }
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userOrdersData = [...state.userOrdersData, payload.order];
      localStorage.setItem(
        "userOrdersData",
        JSON.stringify(state.userOrdersData)
      );
      window.location.reload();
    });
    builder.addCase(createOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Delete Order
    builder.addCase(deleteOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.ordersData = state.ordersData.filter(
        (order) => order._id !== payload.order._id
      );
      localStorage.setItem("ordersData", JSON.stringify(state.ordersData));
    });
    builder.addCase(deleteOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Order
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.selectedOrder = payload.order;
    });
    builder.addCase(getOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Update Order
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.ordersData = state.ordersData.map((order) =>
        order._id === payload.order._id ? payload.order : order
      );
      localStorage.setItem("ordersData", JSON.stringify(state.ordersData));
    });
    builder.addCase(updateOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setUpdatedOrderData, setUpdatedUsersOrderData } =
  orderSlice.actions;

export default orderSlice.reducer;
