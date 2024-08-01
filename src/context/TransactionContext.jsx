'use client'
import { verifyUserRequest } from "@/peticiones/auth"
import { getBusinessRequest } from "@/peticiones/business"
import { getMovesRequest } from "@/peticiones/moves"
import { payServicesRequest } from "@/peticiones/pay"
import { depositMoneyRequest, sendMoneyRequest } from "@/peticiones/trans"
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

    

  




    return (
        <TransactionContext.Provider value={{ getMoves, sendMoney, depositMoney, moves, getBusiness, business , VerifyUser , payServices , transactionDetails}}>
            {children}
        </TransactionContext.Provider>
    )
}