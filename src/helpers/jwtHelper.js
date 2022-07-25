import jwt_decode from "jwt-decode"

const decodeJwt = () => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
        return jwt_decode(jwt);
    }
    return jwt;
}



export const extractCredentials = (setUser) => {
    const jwt = decodeJwt();
    const date = new Date();
    if (!jwt) {
        setUser(null);
        return false;
    }
    else if (jwt.exp < date.getTime() / 1000) {
        setUser(null);
        localStorage.clear();
        return false;
    }
    else {
        setUser(jwt)
        return true;
    }
}