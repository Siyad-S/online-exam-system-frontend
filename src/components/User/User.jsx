import React from 'react';
import "./User.css"
import { useFormik } from 'formik';
import { postUser } from "../../redux/Slices/user"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: ""
        }, 
        onSubmit: (values) => {
            dispatch(postUser({userData: values}))
            const userId = localStorage.getItem("userId") 
            if(userId !== "") {
                navigate("/question")
            }
        }
    })
  return (
    <div>
      <form id="registrationForm" onSubmit={formik.handleSubmit}>
        <h2>Exam Registration</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={formik.handleChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={formik.handleChange} required />
        <button type="submit">Start Exam</button>
      </form>
    </div>
  );
};

export default User;
