"use client"
import { useAuth } from '@/context/AuthContext'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'

import { useRouter } from 'next/navigation'
import { useTransaction } from '@/context/TransactionContext'


const ServicesDetailPage = () => {
  const { user } = useAuth()
  const { handleSubmit, register } = useForm()
  const { id } = useParams()
  const { VerifyUser, errorsTransaction ,setErrorsTransaction} = useTransaction()
  const router = useRouter()

  console.log(user)

  // const onSubmit = handleSubmit((data) => {
  //     const {user_id} = data
  //     const info_pago = {user_id, servicio_id : id}
  //     VerifyUser(info_pago )
  //     console.log(info_pago)
  //     router.push(`/dashboard/pay-services/${id}/confirm`)
  // })

  const onSubmit = handleSubmit(async (data) => {
    const { user_id } = data;
    const info_pago = { user_id, servicio_id: id };
    console.log("info pago es :" , info_pago)
    VerifyUser(info_pago);
  });



  useEffect(() => {
    if (errorsTransaction.length > 0) {
      const timer = setTimeout(() => {
        setErrorsTransaction([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorsTransaction, setErrorsTransaction])

  return (
    <section className='h-[100%] flex justify-center items-center bg-gray-900'>

      {(errorsTransaction?.length > 0) ? (
        <div className={`w-[100%] max-w-[450px] shadow-xl absolute top-0 bg-slate-950 text-center transition-all duration-500 translate-y-0 py-4 border-2 border-red-800 rounded-t-md text-white`}>

          <h4 className='font-semibold border-b-2 border-slate-700 pb-2 w-[80%] mx-auto'> No pudiste ingresar a la aplicacion por los siguientes motivos </h4>


          <ul className='list-disc list-inside text-sm pt-2'>
            {errorsTransaction?.map((error, i) => (
              <li key={i} className='text-red-400'>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={`w-[100%] max-w-[450px] shadow-xl absolute top-0 bg-red-700 text-center transition-all duration-500 -translate-y-48 text-white`}>
          <ul className='list-disc list-inside'>
            {errorsTransaction?.map((error, i) => (
              <li key={i} className='text-white'>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form className='w-[80%] mx-auto rounded-md p-4' onSubmit={onSubmit}>
        <h3 className='text-2xl text-white text-center mb-2'> Datos del Cliente </h3>
        <h6 className=' text-center text-white my-4 '> Ingresa el ID de Usuario </h6>
        <input placeholder={user?.id} className='outline-none w-full md:w-[80%] max-w-[300px] text-center block mx-auto p-2 rounded-md bg-slate-800 text-greenlime' name="user_id"
          {...register("user_id")} />

        <p className='text-xs text-center  py-2 text-gray-400 my-4'> Es el ID del usuario notificado al momento de crear la cuenta , puedes controlarlo desde Tu Perfil</p>
        <button className='bg-greenlime font-semibold text-lime-950 border border-transparent hover:bg-slate-300 hover:border-gray-950 hover:text-gray-950 transition-all duration-150 p-2 rounded-md block mx-auto w-[70%] max-w-[300px]' type='submit' > Continar </button>
      </form>
    </section>
  )
}

export default ServicesDetailPage