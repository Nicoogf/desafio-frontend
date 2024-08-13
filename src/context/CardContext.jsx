'use client'

import React from 'react';
import { createContext, useContext, useState } from 'react';
import { createCardRequest, getCardsRequest ,deleteCardRequest} from '@/axios/Cards';
import { useRouter } from 'next/navigation';

const CardContext = createContext();

export const useCard = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error("useCard debe estar dentro de un CardProvider");
    }
    return context;
}

export function CardProvider({ children }) {
    const [cards, setCard] = useState([]);
    const [errors, setError] = useState([]);
    const router= useRouter()
    
    const createCard = async (id, card) => {
        try {
            const res = await createCardRequest(id, card);
            console.log("el res data del context : ", res);
            router.push("/dashboard/cards")
        } catch (error) {
            console.log(error.message);
            setError(error.response.data);
            console.log(error.response.data);
        }
    }

    const getCards = async (id) => {
        try {
            console.log(id)
            const res = await getCardsRequest(id);
            setCard(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCard = async (idCard , idUser) => {
        try {
            const res = await deleteCardRequest(idCard,idUser)
            console.log(res)
            if (res.status === 200) setCard(cards.filter(task => task._id !== id))
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <CardContext.Provider value={{ createCard, getCards, cards, errors ,deleteCard}}>
            {children}
        </CardContext.Provider>
    );
}
