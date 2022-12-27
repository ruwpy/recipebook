import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import userSlice from "./slices/userSlice"

const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice
  }
})

export default store