'use client'
import { useAuth } from '@/context/AuthContext'
import { useCard } from '@/context/CardContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Cards = () => {

  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  const { cards , getCards } = useCard()

  
  console.log(cards)
  console.log(user)

  useEffect(() => {
    if (isAuthenticated && user) {
        getCards(user.id);
    } 
}, [isAuthenticated, user, loading]);



  return (
    <div>Cards
      <section>
        { loading ? (
          <p> Loading ... </p>
        ): (
          <h5> Cargo </h5>
        )}
      </section>
    </div>
  )
}

export default Cards