'use client'
import { useAuth } from '@/context/AuthContext';
import { useCard } from '@/context/CardContext';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const CardDetailtPage = () => {
  const { cards, getCards ,deleteCard } = useCard();
  const { user, loading, isAuthenticated } = useAuth();
  const params = useParams()


  useEffect(() => {
    getCards(user?.id)
  },[user])

  console.log(cards)
  const cardId = params.id
  const card = cards?.find(card => card._id === cardId);
  return (
    <div>
        <h5> Tarjeta con serial</h5>
        <h5> {card?.serial} </h5>
    </div>
  )
}

export default CardDetailtPage