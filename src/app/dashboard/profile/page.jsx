'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast';



const LoguinPage  = () => {
  const { user , logout } = useAuth()
  const router = useRouter()

  const closeSesion = () => {
    logout()
    router.push("/")
  }

  return (
    <>
    <section className=' w-[80%] mx-auto bg-gray-800 rounded-md p-4 mt-2 text-white'>

        <h2> Tus datos</h2>
        <div className='flex flex-row justify-between items-center'>
            <h6 className=' text-sm w-[35%]'> Email </h6>
            <div className='flex flex-row justify-between items-center gap-x-2  w-[65%]'>
                <h6 className='text-end  text-sm'> {user?.email} </h6>
                <Link href="/dashboard/profile/edit" className='text-sm ' > Editar </Link>
            </div>
        </div>

        <div className='flex flex-row justify-between items-center '>
            <h6 className=' text-sm w-[35%]'> Nombre y Apellido  </h6>
            <div className='flex flex-row justify-between items-center gap-x-2  w-[65%]'>
                <h6 className='text-end  text-sm'> {user?.name} {user?.lastname} </h6>
                <Link href="/dashboard/profile/edit" className='text-sm ' > Editar </Link>
            </div>
        </div>
        <div className='flex flex-row justify-between items-center'>
            <h6 className=' text-sm w-[35%] '> CUIT  </h6>
            <div className='flex flex-row justify-between items-center gap-x-2 w-[65%]'>
                <h6 className='text-end  text-sm'> 20 {user?.dni} 7</h6>
                <Link href="/dashboard/profile/edit" className='text-sm ' > Editar </Link>
            </div>
        </div>
        <div className='flex flex-row justify-between items-center'>
            <h6 className=' text-sm w-[35%]'> Telefono  </h6>
            <div className='flex flex-row justify-between items-center gap-x-2  w-[65%]'>
                <h6 className='text-end  text-sm'>  {user?.phone} </h6>
                <Link href="/dashboard/profile/edit" className='text-sm ' > Editar </Link>
            </div>
        </div>
        <div className='flex flex-row justify-between items-center'>
            <h6 className=' text-sm w-[35%]'> Contraseña  </h6>
            <div className='flex flex-row justify-between items-center gap-x-2  w-[65%]'>
                <h6 className='text-end text-sm'>  *********</h6>
                <Link href="/dashboard/profile/edit" className='text-sm ' > Editar </Link>
            </div>
        </div>




    </section>

    <Link href="/dashboard/cards" className='block w-[80%] mx-auto bg-greenlime text-lime-950 font-semibold rounded-md p-4 mt-2 text-center'>

        Gestiona los medios de Pago

    </Link>

    <section className=' w-[80%] mx-auto bg-gray-800 rounded-md p-4 mt-2 text-white'>
    <h3 className='font-semibold'> Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</h3>
   
    <CopyToClipboard text={user?.cbu}>
    <article className='flex flex-row justify-between items-center my-4 cursor-pointer' onClick={()=> toast.success("CBU copiado en el Portapapeles")}>
        <div className='flex flex-col'>
            <h5 className='font-bold text-lime-500'> CVU </h5>
            <h6> {user?.cbu} </h6>
        </div>
        <div>
            <FaRegCopy  className='text-lime-500'/>
        </div>
    </article>
    </CopyToClipboard>

    <CopyToClipboard text={user?.alias}>
    <article className='flex flex-row justify-between items-center my-4 cursor-pointer' onClick={()=> toast.success("Alias copiado en el Portapapeles")}>
        <div className='flex flex-col'>
            <h5 className='font-bold text-lime-500'> Alias </h5>
            <h6> {user?.alias} </h6>
        </div>
        <div>
            <FaRegCopy  className='text-lime-500'/>
        </div>
    </article>
    </CopyToClipboard>

    <CopyToClipboard text={user?.id}>
    <article className='flex flex-row justify-between items-center my-4 cursor-pointer' onClick={()=> toast.success("ID User copiado en el Portapapeles")}>
        <div className='flex flex-col'>
            <h5 className='font-bold text-lime-500'> ID User </h5>
            <h6> {user?.id} </h6>
        </div>
        <div>
            <FaRegCopy  className='text-lime-500'/>
        </div>
    </article>
    </CopyToClipboard>


    </section>

    <button className='block w-[80%] mx-auto bg-greenlime text-lime-950 font-semibold rounded-md p-4 mt-2' onClick={closeSesion}> Cerrar Sesion </button>

  

<Toaster />
</>
  )
}

export default LoguinPage