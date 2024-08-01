'use client'
import { getMovesRequest } from "@/axios/Moves"
// import { depositMoneyRequest, sendMoneyRequest } from "@/peticiones/trans"
import { createContext, useContext, useState } from "react"

const TransactionContext = createContext()

export const useTransaction = () => {
    const context = useContext(TransactionContext)
    if (!context) {
        throw new Error("useTransaction debe estar dentro de un provider")
    }
    return context
}

export function TransactionProvider({ children }) {

    const [moves, setMoves] = useState([])
    const [business, setBussines] = useState([])
    const [transactionDetails, setTransactionDetails] = useState(null);


    const getMoves = async () => {
        try {
            const res = await getMovesRequest()       
            setMoves(res.data)
        } catch (error) {

        }
    }
    
    const depositMoney = async (trans) => {
        try {
            const res = await depositMoneyRequest(trans)
            setTransactionDetails(res.data);
            console.log("El res del transition es : ", res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TransactionContext.Provider value={{ getMoves, depositMoney, moves, business }}>
            {children}
        </TransactionContext.Provider>
    )
}