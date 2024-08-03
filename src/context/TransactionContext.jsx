'use client'
import { getMovesRequest } from "@/axios/Moves"
import { depositMoneyRequest, sendMoneyRequest } from "../axios/transferences"
import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"

const TransactionContext = createContext()

export const useTransaction = () => {
    const context = useContext(TransactionContext)
    if (!context) {
        throw new Error("useTransaction debe estar dentro de un provider")
    }
    return context
}

export function TransactionProvider({ children }) {

    const router = useRouter()
    const [moves, setMoves] = useState([])
    const [business, setBussines] = useState([])
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [errorsTransaction, setErrorsTransaction] = useState([]);


    const sendMoney = async (trans) => {
        try {
            const res = await sendMoneyRequest(trans)
            setTransactionDetails(res.data);
            console.log("El res del transition es : ", res.data)
            router.push("/dashboard/transferences/success")
        } catch (error) {
            console.log(error)         
            console.log(error.response.data)
            setErrorsTransaction(error.response.data)
        }
    }

    const getMoves = async () => {
        try {
            const res = await getMovesRequest()       
            setMoves(res.data)
        } catch (error) {

        }
    }
    
    const depositMoney = async (idUser , trans) => {
        try {
            console.log(idUser)
            const res = await depositMoneyRequest(idUser ,trans)
            setTransactionDetails(res.data);
            console.log("El res del transition es : ", res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TransactionContext.Provider value={{ getMoves, depositMoney, moves, business ,sendMoney,errorsTransaction ,transactionDetails }}>
            {children}
        </TransactionContext.Provider>
    )
}