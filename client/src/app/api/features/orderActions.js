import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:8082/api/v1/order/'

export const createOrder = createAsyncThunk(
  '/create101',
  async ({ product, totalAmount, status="pending" }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.post(
        `${backendURL}`,
        { product, totalAmount, status },
        config
      )
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const updateOrder = createAsyncThunk(
  '/update101',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.put(
        `${backendURL}${id}`,
        { status },
        config
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const deleteOrder = createAsyncThunk(
  '/delete101',
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.delete(
        `${backendURL}${id}`,
        config
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getOrder = createAsyncThunk(
  '/get101',
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.get(
        `${backendURL}${id}`,
        config
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getOrders = createAsyncThunk(
  '/get101',
  async ({ rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.get(
        `${backendURL}`,
        config
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getUserOrders = createAsyncThunk(
  '/getmyorders',
  async ({ rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.get(
        `${backendURL}getmyorders`,
        config
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)