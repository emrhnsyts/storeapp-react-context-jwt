import axios from "axios"

const apiUrl = "/api/v1"

export const getCategory = (categoryId) => {
    return axios(`${apiUrl}/categories/${categoryId}`);
}

export const login = (username, password) => {
    return axios.post(`${apiUrl}/users/login`, {
        username, password
    })
}

export const getCategories = () => {
    return axios(`${apiUrl}/categories`);
}

export const getProduct = (productId) => {
    return axios(`${apiUrl}/products/${productId}`)
}

export const postComment = (text, userId, productId) => {
    return axios.post(`${apiUrl}/comments`, {
        text, userId, productId
    },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
}

export const deleteLike = (likeId) => {
    return axios.delete(`${apiUrl}/likes/${likeId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
}

export const postLike = (userId, productId) => {
    return axios.post(`${apiUrl}/likes`, {
        userId, productId
    },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
}

export const getProducts = () => {
    return axios(`${apiUrl}/products`);
}

export const getUser = (userId) => {
    return axios(`${apiUrl}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
}

export const changeEmail = (userId, email) => {
    return axios.put(`${apiUrl}/users/email/${userId}`, {
        email
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
}

export const register = (name, surname, email, username, password, address, imageUrl) => {
    return axios.post(`${apiUrl}/users/register`, {
        name,
        surname,
        email,
        username,
        password,
        address,
        imageUrl
    })
}