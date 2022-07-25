/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCategory } from '../../services/services';

const Category = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        getCategory(categoryId).then((res) => {
            setProducts(res.data.products);
            setLoading(false);
        }).catch((err) => {
            navigate("/*")
        })
    }, [categoryId])

    const navigate = useNavigate();


    return (


        <div className='container'>
            {loading ? <h1>Loading</h1> : <div className='row d-flex align-items-center justify-content-between'>
                {products.map((p) => {
                    return <div key={p.id} className="card mt-2 col-md-4 align-items-center" style={{ width: "18rem" }}>
                        <img src={p.imageUrl} className="card-img-top img-fluid" alt="..." style={{ height: "15rem" }} />
                        <div className="card-body">
                            <Link to={`/products/${p.id}`} className="card-title">{p.name}</Link>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            {p.categories.map((c) => {
                                return <li key={c.id} className="list-group-item">{c.name}</li>
                            })}


                        </ul>
                        <div className="card-body">
                            <p className="card-link">{p.price} TL</p>
                        </div>
                    </div>
                })}
            </div>}

        </div>
    )
}

export default Category