'use client'

import { registerRequest } from "@/axios/Auth"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"


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

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res)
        } catch (error) {
            console.log(error.response)
            setIsAuthenticated(false)
            setError(error.response.data)
        }
    }

    return (
        <AuthContext.Provider value={{ signUp , errors ,setError }}>
            {children}
        </AuthContext.Provider>
    )
}