'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const LoguinPage = () => {
  const [mailValidate, setMailValidate] = useState(false) 
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const setPassword = (e) => {
    e.preventDefault()
    console.log(mailValidate)
    setMailValidate(!mailValidate)
  }

  return (
    <main className='relative z-50 w-full bg-slate-900 h-[calc(100vh-40px)] max-w-[1920px] rounded-md flex items-center justify-center'>
      <form onSubmit={()=>{}} 
      className='border border-gray-700 h-[250px] rounded-md flex flex-col gap-4 bg-slate-800  overflow-hidden relative w-[95%] max-w-[400px] mx-auto set-scrollbar'>


        <div className={`flex flex-col pt-8 transition-all duration-500 mt-5
        ${mailValidate ? "-translate-y-56 opacity-0"
            : "translate-y-0 opacity-100 flex"
          }`}>

          <label className='py-2 w-[60%] mx-auto font-semibold text-center'> Ingresar Email </label>

          <input type="email" className='py-2 w-[60%] mx-auto text-lime-500 text-center bg-gray-700 rounded-lg' 
          {...register("email", { required: true })} />

          <button className='mt-4 bg-lime-400 w-[60%] p-2 rounded-md text-lime-950 mx-auto font-semibold' onClick={setPassword}> Siguiente </button>
        </div>

        <div className={`flex flex-col mt-12 py-2 transition-all duration-500 
        ${mailValidate ? "-translate-y-56 opacity-100"
            : "translate-y-0 opacity-0 "
          }`}>
          <label className='py-2 w-[60%] mx-auto font-semibold text-center'>Ingresar Contaseña </label>

          <input className='py-2 w-[60%] mx-auto text-lime-500 text-center bg-gray-700 rounded-lg' type='password' 
           {...register("password", { required: true })}/>

          <div className='flex flex-row gap-x-2 w-[95%] mx-auto  justify-center mt-2'>
            <button className='text-sm my-4 bg-gray-800 border border-lime-500 p-2 rounded-md text-lime-500 font-semibold' onClick={setPassword}> Modificar Email </button>
            <button className='my-4 bg-lime-400 p-2 rounded-md text-lime-950 font-semibold' type='submit'> Siguiente </button>
          </div>

        </div>

        <div className='absolute bottom-1 right-1 flex flex-row w-[97%] mx-auto justify-between '>
        <p className=' text-white text-xs'>¿ No tienes cuenta ? 
          <Link href="/register" className='text-blue-400'> Ingresa aca </Link> 
        </p>
        <Link className='text-blue-400 text-xs' href="/forget-password"> ¿Olvidaste tu Contraseña ? </Link>
        </div>
        

      </form>

    </main>
  )
}

export default LoguinPage