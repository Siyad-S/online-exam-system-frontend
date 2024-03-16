import React from 'react';
import "./User.css"
import { useFormik } from 'formik';
import { postUser } from "../../redux/Slices/user"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const User = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: ""
        }, 
        validationSchema: validationSchema,
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
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    onChange={formik.handleChange} 
                    value={formik.values.name} 
                    required 
                />
                {formik.errors.name && formik.touched.name ? (
                    <div className="error">{formik.errors.name}</div>
                ) : null}
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    onChange={formik.handleChange} 
                    value={formik.values.email} 
                    required 
                />
                {formik.errors.email && formik.touched.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
                <button type="submit">Start Exam</button>
            </form>
        </div>
    );
};

export default User;
