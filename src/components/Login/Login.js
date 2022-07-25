import React, { useContext } from 'react'
import jwt_decode from "jwt-decode"
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/services';

const Login = () => {

    const { user, setUser } = useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: values => {
            login(values.username, values.password).then((res) => {
                localStorage.setItem("jwt", res.data)
                setUser(jwt_decode(res.data))
                navigate("/products")
            });
        },
        validationSchema: Yup.object({
            username: Yup.string().min(5).max(20).required(),
            password: Yup.string().min(5).max(20).required()
        })

    })


    const navigate = useNavigate();


    return (<>
        {user ? <Navigate to="/products" /> : <div>
            <form className='container' onSubmit={formik.handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" value={formik.values.username}
                        onChange={formik.handleChange} id="username" />
                    {formik.touched.username && formik.errors.username ? (
                        <div>{formik.errors.username}</div>
                    ) : null}
                </div >
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={formik.values.password}
                        onChange={formik.handleChange} id="password" />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form >
        </div>

        }
    </>




    )
}

export default Login