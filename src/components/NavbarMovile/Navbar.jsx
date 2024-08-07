'use client'
import Link from 'next/link'
import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import Logo from "../../../public/logo-off.png"
import Image from 'next/image';

const Navbar = () => {


  return (
    <nav className="md:hidden flex flex-row fixed bottom-0 z-50 w-full bg-gray-950 items-center justify-around p-1">

        <Link href="/dashboard" className='text-white font-semibold   text-xs w-[100px] flex flex-col items-center justify-center text-center'>        
        <GoHomeFill className='text-2xl'/>      
        </Link>

        <Link href="/dashboard/movements" className=' text-white font-semibold  text-xs w-[100px] flex flex-col items-center justify-center text-center gap-y-1'> 
        <BsGraphDownArrow className='text-2xl'/> 

        
        </Link>

        <Link href="/dashboard/send" className='bg-transparent text-white font-semibold  text-xs w-[100px] flex items-center text-center justify-center'> 
        <Image src= {Logo} alt="Boton de transferencias" className='bg-greenlime rounded-full w-12 h-12 object-contain p-1'/>
         </Link>


        <Link href="/dashboard/cards" className='text-white font-semibold  text-xs w-[100px] flex flex-col items-center justify-center text-center gap-y-1'> 
        <FaCreditCard className='text-2xl'/>
  
         </Link>

        <Link href="/dashboard/profile" className='text-white font-semibold text-xs w-[100px] flex flex-col items-center justify-center text-center gap-y-1' >  
        <FaUserAlt className='text-2xl'/>
      
        </Link>
    </nav>
  )
}

export default Navbar