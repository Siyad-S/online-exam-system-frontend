import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getQuestion = createAsyncThunk("getQuestion", async ({ page, pageSize}) => {
  try {
    const response = await axios.get(`http://localhost:4444/question?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; 
  }
});


// export const Question = createAsyncThunk("updateQuestion", async ({id, questionData}) => {
//     try {
//       const response = await axios.put(`http://localhost:4444/question/${id}`, questionData);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   });



export const question = createSlice({
  name: "questions",
  initialState: {
    isError: false,
    all: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.all = { ...action.payload };
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of questions");
      });
  },
});

export default question.reducer;
