import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom"
import UserContext from '../../context/UserContext';
import { getCategories } from '../../services/services';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data);
            setLoading(false);
        })
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        setUser(null)
        navigate("/login");
    }


    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/products" href="#">Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="products" className="nav-link">Products</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </a>
                            <ul className="dropdown-menu">
                                {loading ? <li>Loading</li> : categories.map((category) => {
                                    return <li key={category.id}>
                                        <NavLink className="dropdown-item" to={`/categories/${category.id}`}>{category.name}</NavLink>
                                    </li>
                                })}
                            </ul>
                        </li>

                        {
                            user ? <> <li className="nav-item">
                                <NavLink to="profile" className="nav-link">Profile</NavLink>
                            </li>
                                <button onClick={handleLogout} className='btn btn-danger me-auto'>Logout</button>
                            </> : <>
                                <li className="nav-item">
                                    <NavLink to="register" className="nav-link">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="login" className="nav-link">Login</NavLink>
                                </li>
                            </>
                        }

                    </ul>


                </div>
            </div>
        </nav >
    )
}

export default Navbar