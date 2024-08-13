'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { useAuth } from '@/context/AuthContext'
import { useTransaction } from '@/context/TransactionContext';
import { lastFourNumbers } from '@/utils/funcionalidades';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const DepositSuccesPage = () => {
const { user, loading, isAuthenticated } = useAuth()
const { handleSubmit , register} = useForm()
const { sendMoney , transactionDetails } = useTransaction()
const router = useRouter()

const onSubmit = handleSubmit((data) => {
  console.log({...data, email : user?.email})
  sendMoney({...data, email : user?.email})
  router.push("/dashboard")
})


useEffect(() => {
  if (!loading && !isAuthenticated) {
      router.push("/login")
  }
}, [loading, isAuthenticated, router])

console.log(transactionDetails)

  return (
    <section className='flex flex-col items-center justify-center h-[100%] text-white'>
      {transactionDetails ? (
        <>
          <h2 className='text-3xl font-semibold'>Deposito exitoso</h2>
          <FaRegCheckCircle className='text-greenlime text-8xl my-4'/>
          <p className='text-sm'>Desde la tarjeta  { lastFourNumbers( transactionDetails?.card ) } </p>
          <p className='text-sm'>Se deposito </p>
          <p className='text-sm my-2'>de $ {transactionDetails?.amount}</p>
          <p className='text-xs'>Fecha: {new Date().toLocaleString()}</p>
          <div className='my-6 flex flex-col'>
            <a href={transactionDetails?.pdfUrl} download="transaction.pdf" className='bg-greenlime text-lime-950 p-2 rounded-md font-semibold'>Descargar comprobante</a>
            <a href="/dashboard" className='text-blue-400  my-4 text-sm text-center'>Ir a inicio</a>
          </div>
         
        </>
      ) : (
        <section className='flex flex-col items-center justify-center'>
        <AiOutlineLoading3Quarters className='text-greenlime text-9xl'/>
        <h2 className='text-2xl'> Procesando depósito  </h2>
        <a href="/dashboard" className='p-2 bg-greenlime rounded-md text-lime-950 mt-10'>Ir a inicio</a>
        </section>
      )}

    </section>
  )
}

export default DepositSuccesPage