import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    isLoading: true
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload
      state.userData = user
      state.isLoading = false
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer