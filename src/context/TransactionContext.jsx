'use client'
import React, { useEffect } from 'react';
import { getMovesRequest } from "@/axios/Moves"
import { depositMoneyRequest, getBusinessRequest, payServicesRequest, sendMoneyRequest, transferenceMoneyRequest } from "../axios/transferences"
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
    const [errorAlias, setErrorAlias] = useState([]);
    const [ destinatary , setDestinatary] = useState({name:"",lastname:"",email:"",alias:""})



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

    const getMoves = async (userid) => {
        try {
            const res = await getMovesRequest(userid)
            setMoves(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const depositMoney = async (idUser, trans) => {
        try {
            console.log(idUser)
            const res = await depositMoneyRequest(idUser, trans)
            setTransactionDetails(res.data);
            console.log("El res del transition es : ", res)
        } catch (error) {
            console.log(error)
        }
    }

    const VerifyUser = async (info_pago) => {
        try {
            const res = await verifyUserRequest(info_pago)
        } catch (error) {
            console.log(error)
        }
    }

    const getBusiness = async () => {
        try {
            const res = await getBusinessRequest()
            setBussines(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    const payServices = async (service_id, data) => {
        console.log(service_id)
        try {
            const res = await payServicesRequest(service_id, data)
            console.log("El valor del pago de servicio :", res)
        } catch (error) {
            console.log(error)
        }
    }

    const transferenceMoney = async(alias) => {
        console.log(alias)
        try {
            const res = await transferenceMoneyRequest(alias)
            setDestinatary(res.data)
            console.log("valor de res" , res)
        } catch (error) {
            console.log(error)
            setErrorAlias(error.response.data)
        }
    }

 

    return (
        <TransactionContext.Provider value={{ getMoves, depositMoney, moves, business, sendMoney, errorsTransaction, transactionDetails, VerifyUser, getBusiness, payServices ,transferenceMoney, destinatary ,errorAlias ,setDestinatary,setErrorAlias}}>
            {children}
        </TransactionContext.Provider>
    )
}