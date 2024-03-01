import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:8082/api/v1/'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.post(
        `${backendURL}user/login`,
        { email, password },
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

export const signupUser = createAsyncThunk(
  'user/signup',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }

      const { data } = await axios.post(
        `${backendURL}user/signup`,
        { email, password },
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
