'use client'
import { useAuth } from '@/context/AuthContext'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTransaction } from '@/context/TransactionContext'
import Link from 'next/link'


const SendPage = () => {
    const { user, loading, isAuthenticated } = useAuth()
    const { handleSubmit, register } = useForm()
    const { sendMoney, errorsTransaction } = useTransaction()
    const router = useRouter()

    console.log(user)

    const onSubmit = handleSubmit((data) => {
        console.log({ ...data, email: user?.email })
        sendMoney({ ...data, email: user?.email })
        // router.push("/dashboard/transferences/success")
    })


    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login")
        }
    }, [loading, isAuthenticated, router])


    return (
        <section className='relative  h-[calc(100vh-40px)] flex items-center justify-center'>

            {(errorsTransaction.length > 0) ? (
                <div className={`w-[100%] max-w-[450px] mx-auto shadow-xl absolute top-0 bg-slate-950 text-center transition-all duration-500 translate-y-0 py-4 border-2 border-red-800 rounded-t-md`}>

                    <h4 className='font-semibold border-b-2 border-slate-700 pb-2 w-[80%] mx-auto'>No pudiste realizar la Operacion </h4>


                    <ul className='list-disc list-inside text-sm pt-2'>
                        {errorsTransaction.map((error, i) => (
                            <>
                            <li key={i} className='text-red-400'>{error}</li>
                            <Link href="/dashboard">Ir a inicio </Link>
                            </>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={`w-[100%] max-w-[450px]  mx-auto shadow-xl absolute top-0 bg-red-700 text-center transition-all duration-500 -translate-y-48`}>
                    <ul className='list-disc list-inside'>
                        {errorsTransaction.map((error, i) => (
                            <li key={i} className='text-white'>{error}</li>
                        ))}
                    </ul>
                </div>
            )}


            <form onSubmit={onSubmit} className='bg-gray-700 flex flex-col w-[80%] max-w-[720px] mx-auto p-2 gap-y-2 text-black '>
                <input name="alias" type="text" placeholder='Ingresar destinatario' className='p-2'
                    {...register("alias", { required: true })} />

                <input name="amount" type="number" className='p-2' placeholder="Ingresar Monto"
                    {...register("amount", { required: true })} />

                <button className='bg-lime-500 text-lime-950 p-2'> Enviar </button>
            </form>
        </section>
    )
}

export default SendPage