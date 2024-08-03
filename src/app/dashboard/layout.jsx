'use client'
import Navbar from '@/components/NavbarMovile/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../../public/logoverde.png"
import imageProfile from "../../../public/profile.png"
import { useAuth } from '@/context/AuthContext'
import { GrHomeRounded } from "react-icons/gr";;

const Layout = ({children}) => {
 const { user, loading, isAuthenticated , logout } = useAuth()
 
 const closeSesion = () => {
  logout()
  router.push("/")
}


  return (
    <main className='grid grid-cols-12 w-[100%] max-w-[1920px] mx-auto h-[calc(100vh-40px)] rounded-xl border border-gray-800 overflow-hidden bg-slate-800 relative z-50'>
     <nav className='bg-gray-950 w-full px-2 py-3 flex flex-row items-center justify-between mb-2 absolute top-0'>
        <Image src={Logo} className='w-14' alt="Logo de digital money app" />
        <Link className='flex  flex-row items-center gap-x-2' href="/dashboard">
          <div>
            <Image src={imageProfile} alt="Image Profile" className='h-9 w-9 rounded-full border-2 border-greenlime'/>
          </div>
          <h2 className='text-sm text-lime-400 font-semibold'> Hola ,</h2>
          <h3 className='text-sm text-lime-400 font-semibold'>{user?.name}  {user?.lastname}</h3>
        </Link>
      </nav>



      <nav className='hidden col-span-0 md:flex md:flex-col md:col-span-4 lg:col-span-3 xl:col-span-2 bg-lime-500  gap-y-2 p-10 mt-14 text-lime-950'>
        <Link href="/dashboard" className='hover:font-semibold transition-all duration-300'> Inicio </Link>              
        <Link href="/dashboard/activity" className='hover:font-semibold transition-all duration-300'> Actividad </Link>
        <Link href="/dashboard/get-money" className='hover:font-semibold transition-all duration-300'> Cargar Dinero </Link>
        <Link href="/dashboard/pay-services" className='hover:font-semibold transition-all duration-300'> Pagar Servicio </Link>      
        <Link href="/dashboard/cards" className='hover:font-semibold transition-all duration-300'> Tarjetas </Link>
        <Link href="/dashboard/profile" className='mb-8 hover:font-semibold transition-all duration-300'> Perfil </Link>
        <Link href="/" onClick={closeSesion} className='hover:font-semibold transition-all duration-300'> Cerrar Sesion </Link>
      </nav>

      <div className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-7 2xl:col-span-8 mt-14 bg-gray-900">
        {children}
      </div>

      <div className='bg-gray-900 hidden xl:grid xl:col-span-3 mt-14 2xl:col-span-2 border-l border-gray-700'>
        a
      </div>

      <footer className='bg-gray-950 absolute bottom-0 w-full p-2 hidden md:block text-lime-500'>
       Digital Money App 2024
      </footer>
    <Navbar />
    </main>
  )
}

export default Layout