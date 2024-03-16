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

  export const checkUserMark = createAsyncThunk("checkUserMark", async ({answers}) => {
    try {
      const id = localStorage.getItem("userId")
      const response = await axios.put(`http://localhost:4444/user/${id}`, {answers});
      localStorage.setItem("mark", response.data.mark);
      localStorage.setItem("corrected", response.data.corrected);
      localStorage.setItem("incorrect", response.data.incorrect);
      console.log(response.data.mark);
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
    result: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserMark.fulfilled, (state, action) => {
        state.result = action.payload
      })
  },
});

export default user.reducer;
