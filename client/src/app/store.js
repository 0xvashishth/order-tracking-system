import { configureStore } from '@reduxjs/toolkit'
import authReducer from './api/features/authSlice'
import productReducer from './api/features/productSlice'
import orderReucer from './api/features/orderSlice'
import { authApi } from './api/apiSclice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReucer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
