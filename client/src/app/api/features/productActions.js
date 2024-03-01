import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'https://order-tracking-system-server.vercel.app/api/v1/product/'

export const createProduct = createAsyncThunk(
  '/create',
  async ({ name, description, price }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.post(
        `${backendURL}`,
        { name, description, price },
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

export const updateProduct = createAsyncThunk(
  '/update',
  async ({ _id, name, description, price, isAvailable }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.put(
        `${backendURL}${_id}`,
        { name, description, price, isAvailable },
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

export const deleteProduct = createAsyncThunk(
  '/delete',
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

export const getProduct = createAsyncThunk(
  '/get',
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