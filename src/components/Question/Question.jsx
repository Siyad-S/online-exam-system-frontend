import React, { useEffect, useState } from "react";
import "./Question.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../redux/Slices/question";
import { checkUserMark } from "../../redux/Slices/user";
import { current } from "@reduxjs/toolkit";

const Question = () => {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.questions.all.data);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitButton, setSubmitButton] = useState(false);

  useEffect(() => {
    dispatch(getQuestion({ page: currentPage, pageSize }));
  }, []);

  const pageSize = allQuestions?.length;

  const totalPages = allQuestions ? allQuestions.length : 0;

  const formik = useFormik({
    initialValues: {
      [`answer${currentPage}`]: "",
    },
    onSubmit: (values) => {
      const questionId = allQuestions[currentPage]._id;
      // dispatch(checkUserMark({questionId, answers: values}))
      window.alert({ questionId, answers: values });
    },
  });

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setSelectedAnswers([
        ...selectedAnswers,
        formik.values[`answer${currentPage}`],
      ]);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSubmitButton(false);
    }
  };

  return (
    <div>
      {allQuestions && allQuestions.length > 0 && currentPage < totalPages && (
        <form id="questionForm" onSubmit={formik.handleSubmit}>
          <div key={currentPage}>
            <h2>Question {currentPage + 1}</h2>
            <h4>{allQuestions[currentPage].question}</h4>
            <p>Please select your answer:</p>
            <div className="options">
              {allQuestions[currentPage]?.answers?.map(
                (answer, answerIndex) => (
                  <label key={answerIndex}>
                    <input
                      type="radio"
                      name={`answer${currentPage}`}
                      value={answer.answer}
                      onChange={formik.handleChange}
                      checked={
                        formik.values[`answer${currentPage}`] === answer.answer
                      }
                    />
                    {answer.answer}
                  </label>
                )
              )}
            </div>
          </div>
          <div className="buttons">
            <button
              type="button"
              id="prevBtn"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            {currentPage + 1 !== allQuestions?.length ? (
              <button
                type="button"
                id="nextBtn"
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            ) : (
              <button type="submit" id="nextBtn" onClick={handleNext}>
                Submit Exam
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Question;
