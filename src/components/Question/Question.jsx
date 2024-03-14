import React, { useEffect } from "react";
import "./Question.css";
import { useFormik } from "formik";
import question, {
  getQuestion,
  updateQuestion,
} from "../../redux/Slices/question";
import { useDispatch, useSelector } from "react-redux";

const Question = () => {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.questions.all.data);

  useEffect(() => {
    dispatch(getQuestion());
  }, []);

  console.log(allQuestions);
  const formik = useFormik({
    initialValues: {
        answer: []
    },
    onSubmit: (values) => {

    },
  });
  return (
    <div>
      <form id="questionForm">
        {allQuestions?.map((question, index) => (
          <>
            <div key={index}>
              <h2>Question{index + 1}</h2>
              <h4>{question.question}</h4>
              <p>Please select your answer:</p>
              <div className="options">
                {question?.answers?.map((answer, answerIndex) => (
                  <label key={answerIndex}>
                    <input type="radio" name="answer" value={formik.values.answer} onChange={formik.handleChange} />
                    {answer.answer}
                  </label>
                ))}
              </div>
            </div>
            <div className="buttons">
              <button
                type="button"
                id="prevBtn"
                // onClick="goToPreviousQuestion()"
              >
                Previous
              </button>
              <button type="submit" id="nextBtn" disabled>
                Next
              </button>
            </div>
          </>
        ))}
      </form>
    </div>
  );
};

export default Question;
