'use client'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const RegisterPage = () => {

  const [role, setRole] = useState('Usuario')
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { signUp, errors: RegisterErrors , setError} = useAuth()
  const router = useRouter()
  
  const onChangeRol = (e) => {
    setRole(e.target.value)
  }

  const OnSubmit = handleSubmit(async (values) => {
    console.log(values)
    signUp(values)
    // router.push("/login")
  });

  const  validationErrors = [
    ...RegisterErrors,
    errors.name && "El nombre es requerido",
    errors.lastname && "El apellido es requerido",
    errors.dni && "El DNI es requerido",
    errors.email && "El email es requerido",
    errors.phone && "El teléfono es requerido",
    errors.password && "La contraseña es requerida",
    errors.confirmPassword && "La confirmación de la contraseña es requerida",
    errors.companyName && "El nombre de la empresa es requerido",
    errors.businessField && "El área de negocio es requerida",
    errors.cuit && "El CUIT es requerido"
  ].filter(Boolean);

  return (
    <main className='relative z-50  text-white w-full bg-gray-900 h-[calc(100vh-40px)] max-w-[1920px] rounded-md flex flex-col items-center justify-center overflow-hidden'>      
    

      {(validationErrors.length > 0 ) ? (
       <div className={`w-full absolute top-0 bg-slate-950 text-center transition-all duration-500 translate-y-0 py-4 border-2 border-red-800 rounded-t-md`}>
        
        <h4 className='font-semibold border-b-2 border-slate-700 pb-2 w-[80%] mx-auto'> No pudiste crear el usuario por los siguientes motivos </h4>
       
       
        <ul className='list-disc list-inside text-sm pt-2'>
          {validationErrors.map((error, i) => (
            <li key={i} className='text-red-400'>{error}</li>
          ))}
        </ul>
      </div>
      ) : (
        <div className={`w-full absolute top-0 bg-red-700 text-center transition-all duration-500 -translate-y-48`}>
        <ul className='list-disc list-inside'>
          {validationErrors.map((error, i) => (
            <li key={i} className='text-white'>{error}</li>
          ))}
        </ul>
      </div>
      ) }

      <h1 className='text-lg font-semibold text-center my-2'> Crea una nueva cuenta </h1>


      <form onSubmit={OnSubmit} className='flex flex-col gap-y-2 text-gray-400 '>

        <select name="rol" placeholder='Rol' className='bg-slate-800 p-2 rounded-md outline-none border border-greenlime text-greenlime font-semibold'
          {...register("rol", { required: true })} onChange={onChangeRol}>
          <option className='bg-slate-800 text-greenlime font-semibold '>Usuario</option>
          <option className='bg-slate-800 text-greenlime font-semibold ' >Empresa</option>
        </select>

        <div className='border-b border-greenlime w-[80%] mx-auto my-4' />

        {role === "Usuario" && (
          <>

            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="name" type='text' placeholder='Nombre'
              {...register("name", { required: true })} id="nameUserRegister"
            />
          

            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="lastname" type='text' placeholder='Apellido'
              {...register("lastname", { required: true })} id="lastNameUserRegister"/>
         


            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="dni" type='number' placeholder='Documento'
              {...register("dni", { required: true })} id="dniUserRegister"
            />

           

            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="email" type='email' placeholder='Email'
              {...register("email", { required: true })} id="emailUserRegister"/>

           

            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="phone" type='number' placeholder='Telefono'
              {...register("phone", { required: true })}  id="phoneUserRegister"
            />

         


            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="password" type='password' placeholder='Contraseña'
              {...register("password", { required: true })} id="passwordUserRegister"/>

          


            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="confirmPassword" type='password' placeholder='Confirmar Contraseña'
              {...register("confirmPassword", { required: true })} id="confirmPasswordUserRegister" />

           
          </>
        )}

        {role === "Empresa" && (
          <>
            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="companyName" type='text' placeholder='Nombre de la Empresa'
              {...register("companyName", { required: true })}
            />


            <select name="businessField" placeholder='Area' className='bg-slate-800 p-2 rounded-md outline-none  text-greenlime font-semibold'
              {...register("businessField", { required: true })} >
              <option className='bg-slate-800 text-greenlime font-semibold'>Internet </option>
              <option className='bg-slate-800 text-greenlime font-semibold' >Telefonia </option>
              <option className='bg-slate-800 text-greenlime font-semibold' >Televicion </option>
              <option className='bg-slate-800 text-greenlime font-semibold' >Streaming </option>
              <option className='bg-slate-800 text-greenlime font-semibold' >Servicios </option>
            </select>

            


            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="cuit" type='number' placeholder='CUIT'
              {...register("cuit", { required: true })}
            />

         

            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="email" type='email' placeholder='Email'
              {...register("email", { required: true })} />

       

            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="phone" type='number' placeholder='Telefono'
              {...register("phone", { required: true })}
            />

      


            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="password" type='password' placeholder='Contraseña'
              {...register("password", { required: true })} />

            


            <input className='bg-slate-800 p-2 rounded-md outline-none text-greenlime font-semibold' name="confirmPassword" type='password' placeholder='Confirmar Contraseña'
              {...register("confirmPassword", { required: true })} />

          
          </>
        )}

        <button id="registerUserButton" className='bg-greenlime text-lime-950 p-2 rounded-md font-semibold border border-transparent transition-all duration-100 hover:border-gray-950 hover:bg-slate-300 hover:text-gray-900' type='submit'>
          Registrar
        </button>
        <p className='text-white text-sm'> ¿Ya tienes una cuenta?
          <Link href="/login" className='text-blue-400 text-sm'> Inicia Sesion </Link>
        </p>

      </form>
    </main>
  );
}

export default RegisterPage;