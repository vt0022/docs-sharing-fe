import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: {
      accessToken: null,
      refreshToken: null,
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      ;(state.authData.accessToken = action.payload.accessToken),
        (state.authData.refreshToken = action.payload.refreshToken)
    },

    removeAuth: (state, action) => {
      state.authData = initialState
    },
  },
})

export const { loginSuccess, removeAuth } = authSlice.actions

export const authReducer = authSlice.reducer

export const authSelector = (state) => state.authReducer.authData
