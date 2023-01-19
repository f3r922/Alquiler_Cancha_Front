import { createContext, useCallback, useContext, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const AuthContext = createContext();

export function AuthContextProvider( {children} ){
    
    const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem('MY_AUTH_APP'));
    
    const login = useCallback( async function(usuario, password){
    
        const response = await axios.post("http://localhost:4000/auth/login", {
        usuario,
        password
        });
        console.log(response)
        if (response.data.token) {
            window.localStorage.setItem('MY_AUTH_APP', response.data.usuario);
            console.log(response.data);
            setIsAuthenticated(response.data);
        }

    }, [])

    const logout = useCallback(function(){
        window.localStorage.removeItem('MY_AUTH_APP');
    
        setIsAuthenticated(null);
    }, [])

    const value = useMemo(
            () => ({
            login,
            logout,
            isAuthenticated
            }), 
            [login, logout, isAuthenticated]
        );
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};

export function useAuthContext(){
    return useContext(AuthContext);
}