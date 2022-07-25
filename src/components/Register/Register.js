import React, { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/services';


const Register = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            address: "",
            imageUrl: "",
        },
        onSubmit: values => {
            register(values.name,
                values.surname,
                values.email,
                values.username,
                values.password,
                values.address,
                values.imageUrl).then((res) => {
                    navigate("/login")
                })
        },
        validationSchema: Yup.object({
            username: Yup.string().min(5).max(20).required(),
            password: Yup.string().min(5).max(20).required(),
            name: Yup.string().max(30).required(),
            surname: Yup.string().max(30).required(),
            email: Yup.string().email().required(),
            address: Yup.string().min(5).max(150).required(),
            imageUrl: Yup.string()
        })
    })



    return (
        <>
            {user ? <Navigate to="/products" /> :
                <div className='container'>
                    <form className="row g-3" onSubmit={formik.handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={formik.values.name}
                                onChange={formik.handleChange} />
                            {formik.touched.name && formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input type="text" className="form-control" id="surname" value={formik.values.surname} onChange={formik.handleChange} />
                            {formik.touched.surname && formik.errors.surname ? (
                                <div>{formik.errors.surname}</div>
                            ) : null}
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" value={formik.values.email}
                                onChange={formik.handleChange} />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" value={formik.values.username}
                                onChange={formik.handleChange} />
                            {formik.touched.username && formik.errors.username ? (
                                <div>{formik.errors.username}</div>
                            ) : null}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={formik.values.password}
                                onChange={formik.handleChange} />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea className="form-control" id="address" placeholder="1234 Main St" value={formik.values.address}
                                onChange={formik.handleChange} />
                            {formik.touched.address && formik.errors.address ? (
                                <div>{formik.errors.address}</div>
                            ) : null}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="imageUrl" className="form-label">Image Url</label>
                            <input type="text" className="form-control" id="imageUrl" value={formik.values.imageUrl}
                                onChange={formik.handleChange} />
                            {formik.touched.imageUrl && formik.errors.imageUrl ? (
                                <div>{formik.errors.imageUrl}</div>
                            ) : null}
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" >Sign Up</button>
                        </div>
                    </form>
                </div>}
        </>
    )
}

export default Register