import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://order-tracking-system-server.vercel.app/api/v1/',    
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'user/',
        method: 'GET',
        credentials: "include"
      }),
    }),
    productDetails: build.query({
      query: () => ({
        url: 'product/',
        method: 'GET',
        credentials: "include"
      }),
    }),
    orderDetails: build.query({
      query: () => ({
        url: 'order/',
        method: 'GET',
        credentials: "include"
      }),
    }),
    userOrderDetails: build.query({
      query: () => ({
        url: 'order/getmyorders/',
        method: 'GET',
        credentials: "include"
      }),
    }),
  }),
})

// export react hook
export const { useGetDetailsQuery, useProductDetailsQuery, useUserOrderDetailsQuery, useOrderDetailsQuery } = authApi
