import React, { useEffect, useState } from "react";
import "./Question.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../redux/Slices/question";
import { checkUserMark } from "../../redux/Slices/user";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.questions.all.data);
  const [currentPage, setCurrentPage] = useState(0);
  const [answerData, setAnswerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestion({ page: currentPage, pageSize }));
  }, []);

  const pageSize = allQuestions?.length;
  const totalPages = allQuestions ? allQuestions.length : 0;
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      dispatch(checkUserMark({ answers: answerData }));
      navigate("/result")
    },
  });

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      const answerKey = `answer${currentPage}`;
      const questionId = allQuestions[currentPage]._id;

      setAnswerData((prevData) => [
        ...prevData,
        {
          answer: formik.values[answerKey],
          questionId: questionId,
        },
      ]);

      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    const answerKey = `answer${currentPage}`;
    const questionId = allQuestions[currentPage]._id;

    setAnswerData((prevData) => [
      ...prevData,
      {
        answer: formik.values[answerKey],
        questionId: questionId,
      },
    ]);

      formik.handleSubmit();
  };

  console.log(currentPage);
  console.log(totalPages);

  return (
    <div>
      {allQuestions && allQuestions.length > 0 && (
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

            {currentPage === totalPages - 1 && (
              <button type="submit" id="nextBtn">
                Submit Exam
              </button>
            )}

            {currentPage !== totalPages - 1 && (
              <button type="button" id="nextBtn" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Question;
