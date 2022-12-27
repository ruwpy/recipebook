import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: ''
  },
  reducers: {
    setSearch(state, action) {
      const search = action.payload
      state.query = search
    }
  }
})

export const { setSearch } = searchSlice.actions

export default searchSlice.reducer