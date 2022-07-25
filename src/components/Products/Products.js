import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { getProducts } from '../../services/services';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res.data)
            setLoading(false)
        });
    }, [])

    return (
        <div className='container'>
            {loading ? <h1>Loading</h1> : <div className='row d-flex align-items-center justify-content-between'>
                {products.map((p) => {
                    return <div key={p.id} className="card mt-2 col-md-4 align-items-center" style={{ width: "18rem" }}>
                        <img src={p.imageUrl} className="card-img-top img-fluid" alt="..." style={{ height: "15rem" }} />
                        <div className="card-body">
                            <Link to={`${p.id}`} className="card-title">{p.name}</Link>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul className="list-group list-group-flush">

                            <li className="list-group-item">{p.categories.length === 1 ? p.categories.map((category) => {
                                return category.name
                            })
                                : p.categories.map((category, index) => {
                                    if (index !== p.categories.length - 1) {
                                        return <span>{category.name},</span>
                                    }
                                    else {
                                        return <span> {category.name}</span>
                                    }

                                })}</li>

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

export default Products