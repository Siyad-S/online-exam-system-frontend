import { configureStore } from '@reduxjs/toolkit'
import QuestionSlice from "../redux/Slices/question"

export const store = configureStore({
  reducer: {
    questions: QuestionSlice
  },
})