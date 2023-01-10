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
    },
    setNewUsername(state, action) {
      const username = action.payload
      state.userData.username = username
    },
    clearUserdata(state) {
      state.userData = {}
    },
    setUserLoading(state, action) {
      const isLoading = action.payload
      state.isLoading = isLoading
    }
  }
})

export const { setUser, setNewUsername, clearUserdata, setUserLoading } = userSlice.actions

export default userSlice.reducer