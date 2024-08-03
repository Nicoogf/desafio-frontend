'use client'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useCard } from '@/context/CardContext'
import { formatCurrency } from '@/utils/funcionalidades'
import { useTransaction } from '@/context/TransactionContext'
import Link from 'next/link'



const DepositPage = () => {
  const { user } = useAuth()
  const { handleSubmit, register } = useForm()
  const { cards, getCards } = useCard()
  const { depositMoney } = useTransaction()
  const router = useRouter()


  const onSubmit = handleSubmit(async (data) => {
    if (!data.amount || !data.card) {
      console.error("Amount and card are required.")
      return
    }

    console.log(data)
    const depositData = {
      ...data,
      email: user?.email
    }

    console.log(depositData)

    depositMoney(user.id , depositData)
    router.push("/dashboard/get-money/success")
  })

  useEffect(() => {
    getCards()
  }, [])

  console.log(user)
  return (
    <section>
      <form onSubmit={onSubmit} className='mt-10 bg-gray-950 flex flex-col w-[80%] max-w-[720px] mx-auto p-4 gap-y-2 text-black'>

        <input name="amount" type="number" className='p-2' placeholder="Ingresar Monto"
          {...register("amount", { required: true })}  />


        <div class="flex flex-col space-y-2">
          <label for="card" class="text-lime-500 font-semibold">Tarjeta</label>
          <div class="space-y-1">
            {cards.map((card, i) => (
              <label key={i} class="flex items-center justify-between">
                <span class="ml-2 text-gray-700">{card.name}</span>
                <span className='text-white'> $ {formatCurrency(card.mount)} </span>
                <input type="radio" id={`rol-${card.name}`} name="rol" value={card._id} class="hidden-input" {...register("card", { required: true })} />
              </label>
            ))}
            {cards.length < 1 ? (
              <h6> No puedes ingresar dinero porque no tienes ninguna tarjeta asociada</h6>
            ) : (
              cards.map((card, i) => (
                <label key={i} class="flex items-center justify-between">
                  <span class="ml-2 text-gray-700">{card.name}</span>
                  <span className='text-white'> $ {formatCurrency(card.mount)} </span>
                  <input type="radio" id={`rol-${card.name}`} name="rol" value={card._id} class="hidden-input" {...register("card", { required: true })} />
                </label>
              ))
            )
            }
          </div>
        </div>

        {cards.length < 1 ? (
          <Link className='bg-lime-500 text-lime-950 p-2' href="/dashboard">
          Volver al Dashboard
          </Link>
        ) : (
          <button className='bg-lime-500 text-lime-950 p-2'> Depositar </button>
          )}

      </form>
    </section>
  )
}

export default DepositPage