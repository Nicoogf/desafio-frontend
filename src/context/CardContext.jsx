'use client'

import { createContext, useContext, useState } from 'react';
import { createCardRequest, getCardsRequest } from '@/axios/Cards';

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

    const createCard = async (id, card) => {
        try {
            const res = await createCardRequest(id, card);
            console.log("el res data del context : ", res);
        } catch (error) {
            console.log(error.message);
            setError(error.response.data);
            console.log(error.response.data);
        }
    }

    const getCards = async (id) => {
        try {
            const res = await getCardsRequest(id);
            setCard(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CardContext.Provider value={{ createCard, getCards, cards, errors }}>
            {children}
        </CardContext.Provider>
    );
}
