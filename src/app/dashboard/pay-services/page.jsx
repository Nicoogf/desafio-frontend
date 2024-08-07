
"use client"


import CompanyImage from '@/components/ImageBussines/ImageBussines'
import { useTransaction } from '@/context/TransactionContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ServicesPage = () => {
  const { business, getBusiness } = useTransaction()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBusiness, setFilteredBusiness] = useState([])

  useEffect(() => {
    getBusiness()
  }, [])

  useEffect(() => {
    setFilteredBusiness(
      business?.filter(busin =>
        busin?.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    )
  }, [searchTerm, business])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
console.log(business)

  return (
    <section className='mt-8 bg-gray-900'>
      <input
        placeholder='Buscar entre todas las empresas registradas en nuestra Plataforma'
        className='placeholder:font-normal w-[80%] mx-auto block bg-slate-800 p-2 rounded-md text-greenlime font-semibold mb-4'
        value={searchTerm}
        onChange={handleSearchChange}
      /> 

      <section className='w-[80%] mx-auto grid grid-cols-12 gap-2 justify-start'>
        { filteredBusiness.length == 0 ? (
          <h6 className='w-full col-span-12 text-white text-center'> No hay empresas registradas en Digital Money App</h6>
        ) :""
        }
        
        {filteredBusiness.map((busin, i) => (
          <Link key={i} className='relative col-span-6 lg:col-span-4 bg-slate-800 flex flex-row items-center border border-slate-700 rounded-md overflow-hidden hover:border-greenlime transition-all duration-150' href={`/dashboard/pay-services/${busin?._id}`}> 
            <CompanyImage companyName={busin?.companyName}/>
            <div> 
            <p className='text-lg text-white ml-4'>{busin?.companyName}</p> 
            <p  className='text-slate-300 text-sm ml-4'>{busin?.businessField}</p>
            </div>
           
           
          </Link>
        ))} 
      </section>
    </section>
  )
}

export default ServicesPage