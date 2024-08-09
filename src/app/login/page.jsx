'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const LoguinPage = () => {
  const [mailValidate, setMailValidate] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, errors: LoguinErrors, setError } = useAuth()
  const router = useRouter()


  const setPassword = (e) => {
    e.preventDefault()
    console.log(mailValidate)
    setMailValidate(!mailValidate)
  }

  const onSubmit = handleSubmit(async(data) => {
    const res = await signIn(data)
    router.push("/dashboard")
  })

  const validationErrors = [
    ...LoguinErrors,
    errors.email && "El email es requerido",  
    errors.password && "La contraseña es requerida"
  ].filter(Boolean);

  return (
    <main className='relative z-50 w-full bg-gray-900 h-[calc(100vh-40px)] max-w-[1920px] rounded-md flex items-center justify-center'>

      {(validationErrors.length > 0) ? (
        <div className={`w-[100%] max-w-[450px] shadow-xl absolute top-0 bg-slate-950 text-center transition-all duration-500 translate-y-0 py-4 border-2 border-red-800 rounded-t-md text-white`}>

          <h4 className='font-semibold border-b-2 border-slate-700 pb-2 w-[80%] mx-auto'> No pudiste ingresar a la aplicacion por los siguientes motivos </h4>


          <ul className='list-disc list-inside text-sm pt-2'>
            {validationErrors.map((error, i) => (
              <li key={i} className='text-red-400'>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={`w-[100%] max-w-[450px] shadow-xl absolute top-0 bg-red-700 text-center transition-all duration-500 -translate-y-48 text-white`}>
          <ul className='list-disc list-inside'>
            {validationErrors.map((error, i) => (
              <li key={i} className='text-white'>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit}
        className='border border-slate-700 h-[250px] rounded-md flex flex-col gap-4 bg-slate-800  text-white overflow-hidden relative w-[95%] max-w-[400px] mx-auto set-scrollbar'>


        <div className={`flex flex-col pt-8 transition-all duration-500 mt-5
        ${mailValidate ? "-translate-y-56 opacity-0"
            : "translate-y-0 opacity-100 flex"
          }`}>

          <label className='py-2 w-[60%] mx-auto font-semibold text-center'> Ingresar Email </label>

          <input type="email" className='py-2 w-[60%] mx-auto text-lime-500 text-center bg-gray-900 rounded-lg'
            {...register("email", { required: true })} id="emailInput"/>

          <button className='mt-4 bg-greenlime w-[60%] p-2 rounded-md text-lime-950 mx-auto font-semibold border border-transparent hover:border-gray-950 hover:bg-slate-300 hover:text-gray-900 transition-all duration-100' onClick={setPassword} id="nextButtonLogin"> Siguiente </button>
        </div>

        <div className={`flex flex-col mt-12 py-2 transition-all duration-500 
        ${mailValidate ? "-translate-y-56 opacity-100"
            : "translate-y-0 opacity-0 "
          }`}>
          <label className='py-2 w-[60%] mx-auto font-semibold text-center'>Ingresar Contaseña </label>

          <input className='py-2 w-[60%] mx-auto text-lime-500 text-center bg-gray-900 rounded-lg' type='password'
            {...register("password", { required: true })} id="inputPasswordLogin"/>

          <div className='flex flex-row gap-x-2 w-[95%] mx-auto  justify-center mt-2'>
            <button className='text-sm my-4 bg-gray-900 border border-lime-500 p-2 rounded-md text-lime-500 font-semibold  border-transparent hover:border-gray-950 hover:bg-slate-300 hover:text-gray-900 transition-all duration-100' onClick={setPassword} id="checkEmailButton"> Modificar Email </button>
            <button className='my-4 bg-lime-400 p-2 rounded-md text-lime-950 font-semibold border border-transparent hover:border-gray-950 hover:bg-slate-300 hover:text-gray-900 transition-all duration-100' type='submit' id="buttonLoginConfirm"> Siguiente </button>
          </div>

        </div>

        <div className='absolute bottom-1 right-1 flex flex-col md:flex-row w-[97%] gap-2 mx-auto justify-between '>
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