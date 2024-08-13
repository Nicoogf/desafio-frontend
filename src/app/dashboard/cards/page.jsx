// 'use client';

// import { useAuth } from '@/context/AuthContext';
// import { useCard } from '@/context/CardContext';
// import { lastFourNumbers } from '@/utils/funcionalidades';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import Visa from "../../../../public/visa.png"
// import Master from "../../../../public/mastercard.jpg"
// import American from "../../../../public/american.png"
// import Default from "../../../../public/default.jpg"

// const Cards = () => {
//     const router = useRouter();
//     const { user, loading, isAuthenticated } = useAuth();
//     const { cards, getCards, deleteCard } = useCard();
//     const [cardList , setCardList] = useState(cards)

//     useEffect(() => {
//         if (!loading && isAuthenticated && user?.id) {
//             getCards(user.id); // Asegúrate de pasar el ID del usuario
//         }
//     }, [loading, isAuthenticated, user]);

//     if (loading || !user) {
//         return <p>Loading...</p>;
//     }

//     if (!isAuthenticated) {
//         router.push('/login');
//         return null;
//     }

//     const getCardImage = (desc) => {
//         const descLower = desc.toLowerCase();
//         if (descLower.includes('visa')) return Visa;
//         if (descLower.includes('american') || descLower.includes('amex')) return American;
//         if (descLower.includes('master')) return Master;
//         return Default;
//     };

  
//     return (
//         <section className='text-white bg-gray-900'>
//             <h3 className='text-center text-2xl py-4'>Tarjetas Registradas</h3>
//             <Link href="/dashboard/cards/add-card" className='bg-greenlime rounded-md text-lime-950 block w-[80%] mx-auto text-center font-semibold py-3 mb-4'>Agregar Tarjetas</Link>
//             <section>

//                 <ul className='flex flex-col gap-2'>

//                     {cards.length < 1 && (
//                         <h3 className='text-center py-4'> No tienes tarjetas registradas </h3>
//                     )}
//                     {cards.map(card => (
//                         <div key={card._id} className='bg-slate-800 w-[80%] mx-auto rouded-md mb-1 rounded-md flex flex-row justify-between items-center py-6'>
//                             <div className='flex flex-row items-center justify-start gap-4'>
//                                 <Image alt="Empresa de Tarjeta" src={getCardImage(card?.desc)} className='w-10 h-10 rounded-full ml-4' />
//                                 <h6 className='text-xs'>  {card?.desc}  terminada en {lastFourNumbers(card?.serial)} </h6>
//                             </div>

//                             <div className='flex flex-row gap-x-2 mx-4'>
//                                 <button onClick={() => { deleteCard(card._id, user.id) }}> Eliminar </button>
//                             </div>

//                         </div>
//                     ))}
//                 </ul>
//             </section>
//         </section>
//     );
// }

// export default Cards;


'use client';

import { useAuth } from '@/context/AuthContext';
import { useCard } from '@/context/CardContext';
import { lastFourNumbers } from '@/utils/funcionalidades';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Visa from "../../../../public/visa.png"
import Master from "../../../../public/mastercard.jpg"
import American from "../../../../public/american.png"
import Default from "../../../../public/default.jpg"

const Cards = () => {
    const router = useRouter();
    const { user, loading, isAuthenticated } = useAuth();
    const { cards, getCards, deleteCard } = useCard();
    const [cardList, setCardList] = useState(cards);

    useEffect(() => {
        if (!loading && isAuthenticated && user?.id) {
            getCards(user.id); // Asegúrate de pasar el ID del usuario
        }
    }, [loading, isAuthenticated, user]);

    useEffect(() => {
        setCardList(cards);
    }, [cards]);

    if (loading || !user) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    const getCardImage = (desc) => {
        const descLower = desc.toLowerCase();
        if (descLower.includes('visa')) return Visa;
        if (descLower.includes('american') || descLower.includes('amex')) return American;
        if (descLower.includes('master')) return Master;
        return Default;
    };

    const handleDelete = async (cardId) => {
        try {
            await deleteCard(cardId, user.id);
            setCardList(prevCards => prevCards.filter(card => card._id !== cardId));
        } catch (error) {
            console.error('Error al eliminar la tarjeta:', error);
        }
    };

    return (
        <section className='text-white bg-gray-900 relative overflow-hidden'>
            <h3 className='text-center text-2xl py-4'>Tarjetas Registradas</h3>
            <Link href="/dashboard/cards/add-card" className='bg-greenlime rounded-md text-lime-950 block w-[80%] mx-auto text-center font-semibold py-3 mb-4'>Agregar Tarjetas</Link>
            <section className=''>

                <ul className='flex flex-col gap-2 overflow-hidden h-[450px] overflow-y-auto'>

                    {cardList.length < 1 && (
                        <h3 className='text-center py-4'> No tienes tarjetas asociadas. </h3>
                    )}
                    {cardList.map(card => (
                        <div key={card._id} className='bg-slate-800 w-[80%] mx-auto rounded-md mb-1 flex flex-row justify-between items-center py-6'>
                            <div className='flex flex-row items-center justify-start gap-4'>
                                <Image alt="Empresa de Tarjeta" src={getCardImage(card?.desc)} className='w-10 h-10 rounded-full ml-4' />
                                <h6 className='text-xs'>  {card?.desc}  terminada en {lastFourNumbers(card?.serial)} </h6>
                            </div>

                            <div className='flex flex-row gap-x-2 mx-4'>
                                <button onClick={() => handleDelete(card._id)}> Eliminar </button>
                            </div>

                        </div>
                    ))}
                </ul>
            </section>
        </section>
    );
}

export default Cards;
