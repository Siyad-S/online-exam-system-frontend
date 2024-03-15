import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postUser = createAsyncThunk("postUser", async ({ userData }) => {
  try {
    const response = await axios.post(`http://localhost:4444/user`, userData);
    localStorage.setItem("userId", response.data.data._id);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const checkUserMark = createAsyncThunk(
  "checkUserMark",
  async ({ questionId, answers }) => {
    try {
      const id = localStorage.getItem("userId");
      const response = await axios.put(`http://localhost:4444/user/${id}`, {
        answers,
        questionId,
      });
      localStorage.setItem("userId", response.data.data._id);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
  }
});

export const user = createSlice({
  name: "users",
  initialState: {
    isError: false,
    all: [],
  },
  reducers: {},
});

export default user.reducer;
