import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postUser = createAsyncThunk("postUser", async ({userData}) => {
    try {
      const response = await axios.post(`http://localhost:4444/user`, userData);
      console.log(response.data);
      localStorage.setItem("userId", response.data.data._id)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });



export const user = createSlice({
  name: "users",
  initialState: {
    isError: false,
    all: [],
  },
  reducers: {},
//   extraReducers: (builder) => {

//   },
});

export default user.reducer;
