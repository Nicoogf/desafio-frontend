'use client'
import { useAuth } from '@/context/AuthContext'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTransaction } from '@/context/TransactionContext'
import Link from 'next/link'


const SendPage = () => {
    const { user, loading, isAuthenticated } = useAuth()
    const { handleSubmit, register } = useForm()
    const { sendMoney, errorsTransaction ,transferenceMoney ,destinatary ,errorAlias ,setDestinatary , setErrorAlias ,setErrorsTransaction } = useTransaction()
    const router = useRouter()
    const [ alias, setAlias ] = useState("")
    const [ amountTransaction , setAmountTransaction ]= useState(errorsTransaction)


    const AliasOnChange = (e) => {
        setAlias(e.target.value)
        setDestinatary(alias)
    }

    const AmountOnChange = (e) => {
        setAmountTransaction(e.target.value)
    }

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




    useEffect( ()=> {
        transferenceMoney(alias)
    }, [alias])

    useEffect(() => {
        if (errorsTransaction.length > 0) {
          const timer = setTimeout(() => {
            setErrorsTransaction([])
          }, 3000)
          return () => clearTimeout(timer)
        }
      }, [errorsTransaction, setErrorsTransaction])


    return (
        <section className='relative  h-[calc(100vh-40px)] flex flex-col items-center  text-white'>

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

            <h3 className='text-2xl font-semibold mt-14 mb-6'> Transferir Dinero </h3>
            <form onSubmit={onSubmit} className='flex flex-col w-[80%] max-w-[450px] mx-auto p-2 gap-y-2 text-black '>
                <input name="alias" type="text" placeholder='Ingresar destinatario' className='p-2 bg-slate-800 text-greenlime font-semibold rounded-lg'
                    {...register("alias", { required: true })} onChange={AliasOnChange}/>

                <input name="amount" type="number" className='p-2 bg-slate-800 rounded-md text-greenlime font-semibold' placeholder="Ingresar Monto"
                    {...register("amount", { required: true })} onChange={AmountOnChange}/>

                <button className='bg-greenlime text-lime-950 p-2 rounded-lg font-semibold'> Enviar </button>
            </form>

            <section className='flex flex-col gap-y-2 mt-10 max-w-[450px] mx-auto'> 
                <h4 className='text-sm text-center'> Alias Ingresado </h4>
                <h4 className='text-lg font-semibold text-center'> {alias} </h4>
                <h4 className='text-sm text-center'> Cantidad de Dinero a Transferir </h4>
                <h4 className='text-lg font-semibold text-center bg-slate-800 h-10 w-full flex items-center justify-center border border-gray-600 rounded-lg'> $ {amountTransaction} </h4>
                <h4 className='text-sm text-center'>  Destinatario </h4>
                <h4 className='text-lg font-semibold text-center bg-slate-800 h-10 w-full flex items-center justify-center border border-gray-600 rounded-lg'> 
                    {destinatary?.name} {destinatary?.lastname}
                </h4>
            </section>
        </section>
    )
}

export default SendPage