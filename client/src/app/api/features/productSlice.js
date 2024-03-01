import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./productActions";

const initialState = {
  loading: false,
  productData: localStorage.getItem("productData")
    ? JSON.parse(localStorage.getItem("productData"))
    : [
      {
        name: "",
        price: "",
        description: "",
      },
    ],
  error: null,
  success: false,
  selectedProduct: null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setUpdatedProductData: (state, { payload }) => {
      state.productData = payload.products;
      if (!payload.products) localStorage.removeItem("productData");
      else {
        localStorage.setItem("productData", JSON.stringify(payload.products));
      }
    },
  },
  extraReducers: (builder) => {
    // Create Product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.productData = [...state.productData, payload.product];
      localStorage.setItem("productData", JSON.stringify(state.productData));
      window.location.reload();
    });
    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.productData = state.productData.filter(
        (product) => product._id !== payload.product._id
      );
      localStorage.setItem("productData", JSON.stringify(state.productData));
    });
    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Product
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.selectedProduct = payload.product;
    });
    builder.addCase(getProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Update Product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.productData = state.productData.map((product) =>
        product._id === payload.product._id ? payload.product : product
      );
      localStorage.setItem("productData", JSON.stringify(state.productData));
    });
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setUpdatedProductData } = productSlice.actions;

export default productSlice.reducer;
