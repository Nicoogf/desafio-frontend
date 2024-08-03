'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast';
import { useTransaction } from '@/context/TransactionContext'
import { TransactionType } from '@/utils/enum'
import { formatCurrency, formatDate } from '@/utils/funcionalidades'

const DashboarPage = () => {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  const [ showcbu , setShowCbu ] = useState(false)
  const { moves, getMoves } = useTransaction()
 

const handleMenu = () => {
  setShowCbu(!showcbu)
}

  // useEffect(() => {
  //   if (!loading && !isAuthenticated && !user) {
  //     router.push("/login")
  //   }
  // }, [loading, isAuthenticated, router])




  const onChangeInput = (e) => {
    setSearchTerm(e.target.value)
  }


  const [ dinero , setDinero ] = useState(user?.dinero)
 

  useEffect( () => {
    setDinero(user?.dinero)
    getMoves(user?.id)
  } , [user])


  console.log(moves)
  const [searchTerm, setSearchTerm] = useState('');
  const elementsWithDate = moves.filter(element => element.date);
  elementsWithDate.sort((a, b) => new Date(b.date) - new Date(a.date));
  const filteredElements = elementsWithDate.filter(element =>
    element.details.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const top10RecentElements = filteredElements.slice(0, 10);

  return (
    <>
      <h3 className='w-[80%] max-w-[595px] mx-auto my-6 font-semibold text-lg'> Bienvenido , {user?.name} a Digital Money </h3>

      <section className=' w-[80%] max-w-[595px] mx-auto bg-gray-800 rounded-md p-4 mt-2 relative overflow-hidden'>

        <div className=' flex flex-row justify-end gap-x-4 mr-4 p-2 '>
          <Link href="/dashboard/cards"> Ver tarjetas </Link>
          <button onClick={handleMenu}> Ver CVU </button>
        </div>

        <div className="ml-4 -mt-3">
          <h3 className='text-sm'> Dinero disponible </h3>
          <p className='text-4xl font-bold'> $ {user?.dinero} </p>
        </div>

        <CopyToClipboard text={user?.cbu}>
        <div className={`absolute text-lime-950 bottom-0 right-0 px-4 py-2 flex flex-row gap-x-2 items-center bg-greenlime rounded-tl-lg rounded-br-lg  transition-all duration-300 cursor-pointer ${showcbu ? "translate-x-0" : "translate-x-48"}`}
         onClick={()=> {
          toast.success("CBU copiado en el Portapapeles")
          handleMenu()
          }}>
          <div> <FaRegCopy  className='text-lime-950'/> </div>
          <div className='text-lime-950'>  {user?.cbu} </div>          
        </div>
        </CopyToClipboard>

      </section>


      <section className='flex flex-col gap-y-2 mt-4 w-[80%] max-w-[595px]  mx-auto py-4'>
        <Link href="/dashboard/transferences" className='bg-lime-500 py-3 text-lime-950 font-semibold rounded-md text-center'> Transferir dinero </Link>
        <Link href="/dashboard/pay-services" className='bg-lime-500 py-3 text-lime-950 font-semibold rounded-md text-center'> Pagar Servicios  </Link>
        <Link href="/dashboard/get-money" className='bg-lime-500 py-3 text-lime-950 font-semibold rounded-md text-center'> Ingresar Dinero  </Link>
      </section>

      <section className='w-[80%] max-w-[595px] mx-auto'>


        <section>
          {/* <input onChange={onChangeInput} value={searchTerm} placeholder="Buscar por actividad " className='bg-gray-700 block w-full mx-auto mt-4 text-lime-500 p-2 outline-none rounded-md' /> */}

          <div >
            <h4 className='font-bold my-2'> Tu actividad </h4>

            <section className='w-full h-[260px] rounded-md p-2 flex flex-col gap-4 overflow-hidden overflow-y-scroll'>


              {top10RecentElements.length > 0 ? (
              top10RecentElements.map(movimiento => (

                <article key={movimiento._id} className='flex flex-row justify-between items-center bg-gray-700 p-2 rounded-md mb-2'>
                  <div className='flex flex-row items-center gap-x-2'>
                    <div className={
                      `${movimiento.type === TransactionType.DEPOSIT_COMPLETED  || movimiento.type === TransactionType.PAYMENT_RECEIVED ||  movimiento.type === TransactionType.TRANSFER_RECEIVED ? "bg-lime-500" : "bg-red-500"} rounded-full h-2 w-2`} />
                    <h4>{movimiento.details}</h4>
                  </div>
                  <div className='flex flex-col'>
                  <h4>{movimiento?.type === TransactionType.PAYMENT_SENT || movimiento?.type === TransactionType.TRANSFER_SENT ? `-$ ${ formatCurrency(movimiento?.amount)}` : `+$ ${formatCurrency(movimiento?.amount)}`}</h4>
                  <p> {formatDate( movimiento.date )} </p>
                  </div>
                  
                </article>
              ))):(
                <article> No hay movimientos realizados</article>
              )}



            </section>


          </div>
          <Link href="/dashboard/movements" className='text-sm block w-[80%] mx-auto mt-4 text-end text-blue-400'> Ver toda la actividad </Link>
        </section>

      </section>
      <Toaster />
    </>
  )
}

export default DashboarPage