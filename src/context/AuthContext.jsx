'use client'

import { loginRequest, registerRequest, verifyToken } from "@/axios/Auth"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react"


const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("El useAuth debe ser utilizado dentro del AuthProvider")
    }
    return context
}


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setError] = useState([])
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    //Peticion Registrar
    const signUp = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res)
            setUser(res.data)
            setIsAuthenticated(true)
            setError([])
            return res.data
        } catch (error) {
            console.log(error.response)
            setIsAuthenticated(false)
            setError(error.response.data)
        }
    }

    //Peticion Loguear
    const signIn = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log("El valor de data fue :" , res)
            setUser(res.data)
            setIsAuthenticated(true)
            setError([])
        } catch (error) {            
            console.log(error.response)
            setIsAuthenticated(false)
            setError(error.response.data)
        }
    }

    useEffect(() => {               
        async function CheckLogin() {
            const cookies = Cookies.get();

            if(!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyToken(cookies.token)
                console.log(res)
                if(!res.data){
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }       
        CheckLogin()
    }, []);

    return (
        <AuthContext.Provider value={{ signUp, errors, setError, signIn, user ,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}