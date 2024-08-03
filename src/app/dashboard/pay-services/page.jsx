
"use client"


import { useTransaction } from '@/context/TransactionContext'
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


  return (
    <section className='mt-8'>
      <input
        placeholder='Buscar entre todas las empresas registradas en nuestra Plataforma'
        className='w-[80%] mx-auto block'
        value={searchTerm}
        onChange={handleSearchChange}
      /> 

      <section className='bg-slate-700 w-[80%] mx-auto grid grid-cols-12 gap-2 justify-start'>
        {filteredBusiness.map((busin, i) => (
          <Link key={i} className='col-span-6 bg-red-500' href={`/dashboard/pay-services/${busin?._id}`}> 
            <p className='text-center'>{busin?.companyName}</p> 
            <p>{busin?.businessField}</p>
          </Link>
        ))}
      </section>
    </section>
  )
}

export default ServicesPage