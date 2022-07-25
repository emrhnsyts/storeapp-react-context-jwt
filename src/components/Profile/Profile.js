/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { extractCredentials } from '../../helpers/jwtHelper';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { changeEmail, getUser } from '../../services/services';


const Profile = () => {

    const [credentials, setCredentials] = useState(null);
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: values => {
            changeEmail(user.userId, values.email).then((res) => {
                fetchUser()
                values.email = ""
            });
        },
        validationSchema:
            Yup.object({
                email: Yup.string().email().required(),
            })

    })

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        if (extractCredentials(setUser)) {
            getUser(user.userId).then((res) => {
                setCredentials(res.data)
                setLoading(false);
            })
        }
    }

    return (
        <>
            {!user ? <Navigate to="/login" /> :
                <div className='container mt-2 d-flex justify-content-center'>
                    {loading ? <h1>Loading</h1> :
                        <div className="card mb-3" style={{ maxWidth: "1080px" }} >
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={credentials.imageUrl} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{credentials.name} {credentials.surname}</h5>
                                        <form onSubmit={formik.handleSubmit}>
                                            <label htmlFor="email" className="form-label">{credentials.email}</label>
                                            <input type="text" className="form-control" id="email" value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div>{formik.errors.email}</div>
                                            ) : null}
                                            <button className='btn btn-primary' type='submit'>Change email</button>
                                        </form>

                                        <p className="card-text">{credentials.username}</p>
                                        <p className="card-text">{credentials.address}</p>
                                        <p className="card-text"><small className="text-muted">Created at: <SimpleDateTime dateSeparator="-"
                                            timeSeparator=".">{credentials.createdAt}</SimpleDateTime></small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    } </div>

            }
        </>


    )
}

export default Profile