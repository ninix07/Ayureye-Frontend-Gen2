import { createContext, useState } from "react";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { cookieArray } from "../utils/cookies";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies(cookieArray);

    const [auth, setAuth] = useState(null);

    useEffect(() => {
        if (cookies['JWT-Access'] && cookies['JWT-Refresh'] && cookies['User-type'] && cookies['User'] && cookies['User-id']) {
            setAuth({
                'access': cookies['JWT-Access'],
                'refresh': cookies['JWT-Refresh'],
                'user-type': cookies['User-type'],
                'user': cookies['User'],
                'user-id': cookies['User-id'],
            });
        }

    }, [cookies]);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;