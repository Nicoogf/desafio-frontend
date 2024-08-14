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
  const { depositMoney, setErrorsTransaction, errorsTransaction } = useTransaction()
  const router = useRouter()


  const onSubmit = handleSubmit(async (data) => {
    if (!data.amount || !data.card) {
      console.error("Amount and card are required.")
      return
    }

    const depositData = {
      ...data,
      email: user?.email
    }
    depositMoney(user.id, depositData)
  })

  useEffect(() => {
    getCards(user?.id)
  }, [user])

  useEffect(() => {
    if (errorsTransaction.length > 0) {
      const timer = setTimeout(() => {
        setErrorsTransaction([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorsTransaction, setErrorsTransaction])


  return (
    <section className='h-[100%] flex items-center flex-col bg-gray-900 text-white'>

      {(errorsTransaction.length > 0) ? (
        <div className={`w-[100%] max-w-[450px] shadow-xl absolute top-0 bg-slate-950 text-center transition-all duration-500 translate-y-0 py-4 border-2 border-red-800 rounded-t-md text-white`}>

          <h4 className='font-semibold border-b-2 border-slate-700 pb-2 w-[80%] mx-auto'> No pudiste ingresar a la aplicacion por los siguientes motivos </h4>


          <ul className='list-disc list-inside text-sm pt-2'>
            {errorsTransaction.map((error, i) => (
              <li key={i} className='text-red-400'>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={`w-[100%] max-w-[450px] shadow-xl absolute top-0 bg-red-700 text-center transition-all duration-500 -translate-y-48 text-white`}>
          <ul className='list-disc list-inside'>
            {errorsTransaction.map((error, i) => (
              <li key={i} className='text-white'>{error}</li>
            ))}
          </ul>
        </div>
      )}
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
                  <div className='flex flex-row gap-x-2'>
                    <span className='text-white'> $ {formatCurrency(card.mount)} </span>
                    <input type="radio" id={`rol-${card.name}`} name="rol" value={card._id} classname="hidden-input" {...register("card", { required: true })} />
                  </div>

                </label>
              ))
            )
            }
          </div>
        </div>

        {cards.length < 1 ? (
          <Link className='text-lime-950 p-2 bg-greenlime rounded-md text-center font-semibold' href="/dashboard">
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