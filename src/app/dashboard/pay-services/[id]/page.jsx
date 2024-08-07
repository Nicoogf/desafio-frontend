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
    <section className='h-[100%] flex justify-center items-center bg-gray-900'>
        <form className='w-[80%] mx-auto rounded-md p-4' onSubmit={onSubmit}>
          <h3 className='text-2xl text-white text-center mb-2'> Datos del Cliente </h3>
            <h6 className=' text-center text-white my-4 '> Ingresa el ID de Usuario </h6>
            <input value={user?.id} className='outline-none w-full md:w-[80%] max-w-[300px] text-center block mx-auto p-2 rounded-md bg-slate-800 text-greenlime' name="user_id"
            {...register("user_id")}/>

            <p className='text-xs text-center  py-2 text-gray-400 my-4'> Es el ID del usuario notificado al momento de crear la cuenta , puedes controlarlo desde Tu Perfil</p>
            <button className='bg-greenlime font-semibold text-lime-950 border border-transparent hover:bg-slate-300 hover:border-gray-950 hover:text-gray-950 transition-all duration-150 p-2 rounded-md block mx-auto w-[70%] max-w-[300px]'  type='submit' > Continar </button>
        </form>
    </section>
  )
}

export default ServicesDetailPage