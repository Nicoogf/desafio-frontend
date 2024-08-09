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




    depositMoney(user.id, depositData)
    router.push("/dashboard/get-money/success")
  })

  useEffect(() => {
    getCards(user?.id)
  }, [user])


  console.log(cards)
  return (
    <section className='h-[100%] flex items-center flex-col bg-gray-900 text-white'>
      <h3 className='my-6 text-white font-semibold text-2xl'> Ingresa dinero a tu cuenta  </h3>
      <form onSubmit={onSubmit} className='bg-gray-900 flex flex-col w-full sm:w-[80%] max-w-[720px] mx-auto p-4 gap-y-2 text-black h-[80%]'>

        <div className='flex flex-row items-center justify-center'>
          <p className='text-greenlime mr-4 '> $ </p>
          <input name="amount" type="number" className='p-2 bg-gray-950 rounded-md text-greenlime text-center text-xl font-semibold placeholder:text-sm my-4' placeholder="Ingresar Monto"
            {...register("amount", { required: true })} />
        </div>



        <div class="flex flex-col space-y-2">
          <label for="card" class="text-greenlime font-semibold">Tarjetas Registradas</label>
          <div class="space-y-1">
            {cards.length < 1 ? (
              <h6 className='text-white'>No tienes tarjetas Registradas</h6>
            ) : (
              cards.map((card, i) => (
                <label key={i} class="flex items-center justify-between bg-slate-800 p-3 rounded-md">
                  <span class="ml-2 text-gray-200">{card?.desc}</span>
                  <span className='text-white'> $ {formatCurrency(card.mount)} </span>
                  <input type="radio" id={`rol-${card.name}`} name="rol" value={card._id} classname="hidden-input" {...register("card", { required: true })} />
                </label>
              ))
            )
            }
          </div>
        </div>

        {cards.length < 1 ? (
          <Link className='text-lime-950 p-2 bg-greenlime rounded-md' href="/dashboard">
            Volver al Dashboard
          </Link>
        ) : (
          <button className='bg-greenlime text-lime-950 p-2 rounded-md font-semibold'> Depositar </button>
        )}

      </form>
    </section>
  )
}

export default DepositPage