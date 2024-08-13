'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { formatCurrency, generateRandomPrice } from '@/utils/funcionalidades'
import { useCard } from '@/context/CardContext'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useTransaction } from '@/context/TransactionContext'

const ConfirmPago = () => {
  
    const { business, getBusiness, payServices } = useTransaction()
    const parametros = useParams()
    const { cards, getCards } = useCard()
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const [precioRandom, setPrecioRandom] = useState(null)
 
    const router = useRouter()
   
    console.log(user.id)

    useEffect(() => {
        getBusiness()
        getCards(user.id)       
        setPrecioRandom(generateRandomPrice())
    }, [])

    const empresaDetail = business.find(empresa => empresa._id === parametros.id)


 

    if (!precioRandom) {
        return null // o un loading spinner
    }

    const onSubmit = handleSubmit(async (data) => {
        const infoDelPago = {
            ...data,
            amount: precioRandom,
            empresa_id: empresaDetail._id,
            username: user.name,
            userlastname: user.lastname,
            user_id: user.id
        }

    
        await payServices(empresaDetail._id , infoDelPago)
        router.push("/dashboard")
    })

    return (
        <section className='text-white'>
            <section>
                <h4 className='text-center text-2xl my-4'>Confirmación de Pago</h4>
                <h5  className='text-center text-xl my-2'>{empresaDetail?.companyName}</h5>
                <div className='flex flex-col items-center'>
                    <h4 className='text-lg'>Total a Pagar</h4>
                    <h5 className='text-3xl'>$ {formatCurrency(precioRandom)}</h5>
                </div>
            </section>
            <form onSubmit={onSubmit} className=' mt-10 rounded-xl bg-slate-800 flex flex-col w-[80%] max-w-[720px] mx-auto p-4 gap-y-2 text-black'>
                <div className="flex flex-col space-y-2">
                    <label className="text-greenlime font-semibold">Tarjeta</label>
                    <div className="space-y-1">
                        {cards.map((card, i) => (
                            <label key={i} className="flex items-center justify-between">
                                <span className="ml-2 text-white">{card?.name}</span>
                                <div className='flex flex-row gap-x-4'>
                                <span className="ml-2 text-greenlime">$ {formatCurrency(card?.mount)}</span>
                                <input type="radio" id={`rol-${card?.name}`} name="paymentMethod" value={`card-${card._id}`}  {...register("paymentMethod", { required: true })} />
                                </div>
                               
                            </label>
                        ))}
                        <label className="flex items-center justify-between py-6">
                            <span className="ml-2 text-greenlime font-semibold">Dinero en cuenta</span>
                            <div className='flex flex-row gap-x-4'>
                            <span className="ml-2 text-greenlime">$ {formatCurrency(user?.dinero)}</span>
                            <input type="radio" id={`rol-${user?.name}`} name="paymentMethod" value={`cash-${user?.id}`}  {...register("paymentMethod", { required: true })} />
                            </div>
                            
                        </label>
                    </div>
                </div>
                <Link href="/dashboard/cards/add-card" className='bg-greenlime text-lime-950 p-2 text-center rounded-lg font-semibold'> Agregar nuevo medio de Pago </Link>
                <button className='bg-greenlime text-lime-950 p-2 rounded-lg font-semibold'>Enviar</button>
            </form>
        </section>
    )
}

export default ConfirmPago