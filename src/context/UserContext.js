import React, { createContext, useEffect, useState } from 'react'
import { extractCredentials } from "../helpers/jwtHelper";

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const values = {
        user, setUser
    }

    useEffect(() => {
        extractCredentials(setUser)
    }, [])

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    )
}

export default UserContext;