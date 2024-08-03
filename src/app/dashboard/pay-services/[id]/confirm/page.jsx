'use client'
import { useTransaction } from '@/context/TransContext'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { generateRandomPrice } from '@/utils/randomcbu'
import { useCard } from '@/context/CardContext'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { formatCurrency } from '@/utils/VerPrecio'
import Link from 'next/link'

const ConfirmPago = () => {
  
    const { business, getBusiness, payServices } = useTransaction()
    const parametros = useParams()
    const { cards, getCards } = useCard()
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    console.log(parametros.id)
    const router = useRouter()
   

    useEffect(() => {
        getBusiness()
        getCards()
    }, [])

    const empresaDetail = business.find(empresa => empresa._id === parametros.id)
    console.log(empresaDetail)
    console.log(cards)
    console.log(user)

    const precioRandom = generateRandomPrice()

    const onSubmit = handleSubmit(async (data) => {
        const infoDelPago = {
            ...data,
            amount: precioRandom,
            empresa_id: empresaDetail._id,
            username: user.name,
            userlastname: user.lastname,
            user_id: user.id
        }

        console.log(infoDelPago)
        await payServices(infoDelPago)
        router.push("/dashboard")
    })

    return (
        <section>
            <section>
                <h4>Confirmación de Pago</h4>
                <h5>{empresaDetail?.companyName}</h5>
                <div className='flex flex-row'>
                    <h4>Total a Pagar</h4>
                    <h5>$ {formatCurrency(precioRandom)}</h5>
                </div>
            </section>
            <form onSubmit={onSubmit} className='bg-gray-950 flex flex-col w-[80%] max-w-[720px] mx-auto p-4 gap-y-2 text-black'>
                <div className="flex flex-col space-y-2">
                    <label className="text-lime-500 font-semibold">Tarjeta</label>
                    <div className="space-y-1">
                        {cards.map((card, i) => (
                            <label key={i} className="flex items-center justify-between">
                                <span className="ml-2 text-gray-700">{card?.name}</span>
                                <span className="ml-2 text-lime-400">$ {formatCurrency(card?.mount)}</span>
                                <input type="radio" id={`rol-${card?.name}`} name="paymentMethod" value={`card-${card._id}`} className="hidden-input" {...register("paymentMethod", { required: true })} />
                            </label>
                        ))}
                        <label className="flex items-center justify-between">
                            <span className="ml-2 text-gray-700">Dinero en cuenta</span>
                            <span className="ml-2 text-lime-400">$ {formatCurrency(user?.dinero)}</span>
                            <input type="radio" id={`rol-${user?.name}`} name="paymentMethod" value={`cash-${user.id}`} className="hidden-input" {...register("paymentMethod", { required: true })} />
                        </label>
                    </div>
                </div>
                <Link href="/dashboard/add-card" className='bg-lime-500 text-lime-950 p-2 text-center'> Agregar nuevo medio de Pago </Link>
                <button className='bg-lime-500 text-lime-950 p-2'>Enviar</button>
            </form>
        </section>
    )
}

export default ConfirmPago
