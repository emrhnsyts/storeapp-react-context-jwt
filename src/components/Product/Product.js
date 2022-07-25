/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import UserContext from '../../context/UserContext';
import { extractCredentials } from '../../helpers/jwtHelper';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import { deleteLike, getProduct, postComment, postLike } from '../../services/services';


const Product = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();


    const fetchProduct = () => {
        getProduct(productId).then((res) => {
            setProduct(res.data)
            setLoading(false);
        }).catch((err) => {
            navigate("/*")
        })
    }

    useEffect(() => {
        if (user !== null) {
            if (product !== null) {
                if (product.likes.length > 0) {
                    if (product.likes.some((like) =>
                        like.userId === user.userId
                    )) {
                        setIsLiked(true)
                    }
                    else {
                        setIsLiked(false);
                    }
                }
                else {
                    setIsLiked(false);
                }
            }
        }
    }, [product])


    useEffect(() => {
        fetchProduct()
    }, [])




    const onCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handleComment = () => {
        if (!extractCredentials(setUser)) {
            navigate("/login")
        }
        else {
            // axios.post("/api/v1/comments", {
            //     text: comment, userId: user.userId, productId: productId
            // },
            //     {
            //         headers: {
            //             Authorization: `Bearer ${localStorage.getItem("jwt")}`
            //         }
            //     })
            postComment(comment, user.userId, product.id).then((res) => {
                fetchProduct()
                setComment("");
            })
        }
    }

    const handleLike = () => {
        if (!extractCredentials(setUser)) {
            navigate("/login")
        }
        else {
            if (isLiked === true) {

                let toBeDeletedLikeId;

                product.likes.map((like) => {
                    if (like.userId === user.userId && like.productId === product.id) {
                        toBeDeletedLikeId = like.id
                    }
                })
                deleteLike(toBeDeletedLikeId).then((res) => {
                    fetchProduct()
                }).catch((err) => {
                    console.log("zaten beğendiniz");
                })
            }
            else if (isLiked === false) {
                postLike(user.userId, parseInt(productId))
                    .then((res) => {
                        fetchProduct()
                        setComment("");
                    }).catch((err) => {
                        console.log("zaten beğendiniz");
                    })
            }

        }
    }

    return (
        <div className='container mt-2 d-flex align-items-center justify-content-center'>
            {
                loading ? <h1>Loading</h1> : <div className="card mb-3" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={product.imageUrl} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">This is a wider card
                                    with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <button onClick={handleLike} className="btn btn-block btn-primary"><i className="fa fa-thumbs-up">
                                    {isLiked ? "unlike" : "like"}
                                </i> {product.likes.length}</button>
                                {product.comments.sort((x, y) => {
                                    return y.id - x.id
                                }).map((comment) => {
                                    return <div key={comment.id} className="card-text">
                                        <small className="text-muted"><h3>{comment.text}</h3> -{comment.username} at <SimpleDateTime dateSeparator="-"
                                            timeSeparator=".">{comment.createdAt}</SimpleDateTime>
                                        </small>
                                    </div>
                                })}
                                <input type="text" className="form-control" value={comment}
                                    onChange={onCommentChange} id="commentInput" />
                                <button onClick={handleComment} className="btn btn-primary">Comment</button>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default Product