'use client'
import { useAuth } from '@/context/AuthContext'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { useTransaction } from '@/context/TransactionContext'


const SendSuccesPage = () => {
const { user, loading, isAuthenticated } = useAuth()
const { handleSubmit , register} = useForm()
const { sendMoney , transactionDetails } = useTransaction()
const router = useRouter()

const onSubmit = handleSubmit((data) => {
  console.log({...data, email : user?.email})
  sendMoney({...data, email : user?.email})
  router.push("/dashboard")
})


// useEffect(() => {
//   if (!loading && !isAuthenticated) {
//       router.push("/login")
//   }
// }, [loading, isAuthenticated, router])

console.log(transactionDetails)

  return (
    <section className='flex flex-col items-center justify-center h-[100%]'>
      {transactionDetails ? (
        <>
          <h2>Transferencia exitosa</h2>
          <FaRegCheckCircle />
          <p>De: {transactionDetails?.sender} </p>
          <p>A: {transactionDetails?.reciber} </p>
          <p>Monto: $ {transactionDetails?.amount}</p>
          <p>Fecha: {new Date().toLocaleString()}</p>
          <div>
            <a href={transactionDetails?.pdfUrl} download="transaction.pdf" className='bg-blue-500 p-2 rounded-md'>Descargar comprobante</a>
            <a href="/dashboard">Ir a inicio</a>
          </div>
         
        </>
      ) : (
        <section className='flex flex-col items-center justify-center'>
        <MdOutlineError className='text-greenlime text-9xl'/>
        <h2 className='text-2xl'> Algo salio mal </h2>
        <a href="/dashboard" className='p-2 bg-greenlime rounded-md text-lime-950 mt-10'>Ir a inicio</a>
        </section>
      )}

    </section>
  )
}

export default SendSuccesPage