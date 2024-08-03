"use client"
import { useAuth } from '@/context/AuthContext'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'

import { useRouter } from 'next/navigation'
import { useTransaction } from '@/context/TransactionContext'


const ServicesDetailPage  = () => {
    const { user } = useAuth()
    const { handleSubmit ,register} = useForm()
    const {id} = useParams()
    const { VerifyUser } = useTransaction()
    const router = useRouter()

    console.log(user)

    const onSubmit = handleSubmit((data) => {
        const {user_id} = data
        const info_pago = {user_id, servicio_id : id}
        VerifyUser(info_pago)
        console.log(info_pago)
        router.push(`/dashboard/pay-services/${id}/confirm`)
    })

  return (
    <section>
        <form className='w-[80%] mx-auto bg-slate-700 rounded-md' onSubmit={onSubmit}>
            <h6> Numero de cuenta sin el primer 2 </h6>
            <input value={user?.id} className='text-black w-[60%]' name="user_id"
            {...register("user_id")}/>

            <p> Es el ID del usuario notificado al momento de crear la cuenta , puedes controlarlo desde Tu Perfil</p>
            <button className='bg-greenlime text-lime-950 p-2 rounded-md'  type='submit' > Continar </button>
        </form>
    </section>
  )
}

export default ServicesDetailPage