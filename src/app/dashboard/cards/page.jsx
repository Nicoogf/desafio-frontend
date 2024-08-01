'use client';

import { useAuth } from '@/context/AuthContext';
import { useCard } from '@/context/CardContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Cards = () => {
    const router = useRouter();
    const { user, loading, isAuthenticated } = useAuth();
    const { cards, getCards } = useCard();

    useEffect(() => {
        if (!loading && isAuthenticated && user?.id) {
            getCards(user.id); // Asegúrate de pasar el ID del usuario
        } 
    }, [loading, isAuthenticated, user]);

    if (loading || !user) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    console.log(cards)
    return (
        <div>
            <h1>Cards</h1>
            <section>
                <h5>Listado de Tarjetas</h5>
                <Link href="/dashboard/cards/add-card">Agregar Tarjetas</Link>
                <ul className='flex flex-col gap-2'>
                {cards.map(card => (
                        <li key={card._id} className='bg-red-700 '>{card.name}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Cards;
