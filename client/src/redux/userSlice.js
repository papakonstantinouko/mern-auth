import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadingOn: (state) => {
      state.loading = true
      state.error = null
    },
    operationSuccess: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    operationFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
      state.user = null
    },
  },
})

export const { loadingOn, operationSuccess, operationFailure } =
  userSlice.actions

export default userSlice.reducer
