'use client'
import { getCardsRequest } from "@/axios/Cards"
import { createContext, useContext, useState } from "react"

const CardContext = createContext()

export const useCard = () => {
    const context = useContext(CardContext)
    if (!context) {
        throw new Error("useCard debe estar dentro de un CardProvider")
    }
    return context
}

export function CardProvider({ children }) {

    const [cards, setCard] = useState([])
    const [ errors , setError ] = useState([])

    const createCard = async (card) => {
        try {
            const res = await createCardRequest(card)
            console.log("el res data del context : ", res)
        } catch (error) {
            setError(error.response.data)
            console.log(error.response.data)
        }
    }

    const getCards = async (id) => {
        try {
            const res = await getCardsRequest(id)
            setCard(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <CardContext.Provider value={{ createCard , getCards }}>
            {children}
        </CardContext.Provider>
    )
}