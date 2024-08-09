// 'use client'
// import Navbar from '@/components/NavbarMovile/Navbar'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import Logo from "../../../public/logoverde.png"
// import imageProfile from "../../../public/profile.png"
// import { useAuth } from '@/context/AuthContext';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { format, parseISO } from 'date-fns';
// import { es } from 'date-fns/locale';
// import { CopyToClipboard } from 'react-copy-to-clipboard'
// import toast, { Toaster } from 'react-hot-toast';


// const Layout = ({ children }) => {
//   const { user, loading, isAuthenticated, logout } = useAuth()

//   const closeSesion = () => {
//     logout()
//     router.push("/")
//   }

//   const formatDateProfile = (dateString) => {
//     if (!dateString) {
//       return 'Fecha no disponible'; // O cualquier mensaje predeterminado que desees
//     }

//     const date = parseISO(dateString);
//     return format(date, "EEEE dd 'de' MMMM 'del' yyyy", { locale: es });
//   };




//   return (
//     <main className='grid grid-cols-12 w-[100%] max-w-[1920px] mx-auto h-[calc(100vh-40px)] rounded-xl border border-gray-800 overflow-hidden bg-slate-800 relative z-50'>
//       <nav className='bg-gray-950 w-full px-2 py-3 flex flex-row items-center justify-between mb-2 absolute top-0'>
//         <Image src={Logo} className='w-14' alt="Logo de digital money app" />


//         <Link className='flex  flex-row items-center gap-x-2' href="/dashboard">

//           {loading ? <Skeleton variant="rect" width={238} height={36} animation="wave" baseColor="#111827" highlightColor="#374151" /> : (
//             <>
//               <div>
//                 <Image src={imageProfile} alt="Image Profile" className='h-9 w-9 rounded-full border-2 border-greenlime' />
//               </div>
//               <h2 className='text-sm text-greenlime font-semibold'> Hola ,</h2>
//               <h3 className='text-sm text-greenlime font-semibold'>{user?.name}  {user?.lastname}</h3>
//             </>
//           )}


//         </Link>

//       </nav>



//       <nav className='hidden col-span-0 md:flex md:flex-col md:col-span-4 lg:col-span-3 xl:col-span-2 bg-greenlime  gap-y-2 p-10 mt-14 text-lime-950'>
//         <Link href="/dashboard" className='hover:font-semibold transition-all duration-300'> Inicio </Link>
//         <Link href="/dashboard/activity" className='hover:font-semibold transition-all duration-300'> Actividad </Link>
//         <Link href="/dashboard/get-money" className='hover:font-semibold transition-all duration-300'> Cargar Dinero </Link>
//         <Link href="/dashboard/pay-services" className='hover:font-semibold transition-all duration-300'> Pagar Servicio </Link>
//         <Link href="/dashboard/cards" className='hover:font-semibold transition-all duration-300'> Tarjetas </Link>
//         <Link href="/dashboard/profile" className='mb-8 hover:font-semibold transition-all duration-300'> Perfil </Link>
//         <Link href="/" onClick={closeSesion} className='hover:font-semibold transition-all duration-300'> Cerrar Sesion </Link>
//       </nav>

//       <div className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-7 2xl:col-span-8 mt-14 bg-gray-900">
//         {children}
//       </div>

//       <aside className='bg-gray-900 hidden xl:flex xl:col-span-3 mt-14 2xl:col-span-2 border-l border-gray-700 text-white xl:flex-col xl:items-center xl:justify-start'>

//         <div className='relative flex items-center justify-center'>
//           <Image src={imageProfile} className='w-[40%] my-4 border border-gray-700 rounded-full' alt="Imagen de Perfil" />
//           <div className='w-3 h-3 bg-greenlime rounded-full absolute animate-pulse left-32 top-20' />
//         </div>

//         <h4 className='text-lg'> {user?.name ? user?.name : user?.companyName}  {user?.lastname ? user?.lastname : user?.businessField}</h4>
//         <h2 className='text-sm text-gray-300'> {user?.email} </h2>
//         <h4 className='text-sm text-gray-300'> Registrado el {formatDateProfile(user?.createdAt)} </h4>
//         <h4 className='my-4 cursor-pointer text-greenlime' > {user?.id} </h4>


//         <CopyToClipboard text={user?.alias} onCopy={() => toast.success("CBU copiado en el Portapapeles")}>
//           <h4 className='my-4 cursor-pointer text-greenlime'> {user?.alias} </h4>
//         </CopyToClipboard>


//       </aside>

//       <footer className='bg-gray-950 absolute bottom-0 w-full p-2 hidden md:block text-lime-500'>
//         Digital Money App 2024
//       </footer>
//       <Navbar />
//       <Toaster />
//     </main>
//   )
// }

// export default Layout


'use client'
import Navbar from '@/components/NavbarMovile/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../../public/logoverde.png"
import imageProfile from "../../../public/profile.png"
import { useAuth } from '@/context/AuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  const { user, loading, isAuthenticated, logout } = useAuth()

  const closeSesion = () => {
    logout()
  }

  const formatDateProfile = (dateString) => {
    if (!dateString) {
      return 'Fecha no disponible'; 
    }
  
    const date = parseISO(dateString);
    return format(date, "EEEE dd 'de' MMMM 'del' yyyy", { locale: es });
  };
  
  return (
    <main className='grid grid-cols-12 w-[100%] max-w-[1920px] mx-auto h-[calc(100vh-40px)] rounded-xl overflow-hidden bg-gray-900 relative z-50 overflow-y-auto pb-10' id="home-app">

      <nav className='bg-gray-950 w-full px-2 py-3 flex flex-row items-center justify-between mb-2 fixed lg:absolute z-[9999] top-0'>
        <Image src={Logo} className='w-14' alt="Logo de digital money app" />
          <Link className='flex flex-row items-center gap-x-2' href="/dashboard">
            { loading ? 
              <Skeleton variant="rect" width={238} height={36} animation="wave" baseColor="#111827" highlightColor="#374151"/> :(
              <> 
                <div>
                  <Image src={imageProfile} alt="Image Profile" className='h-9 w-9 rounded-full border-2 border-greenlime' />
                </div>
                <h2 className='text-sm text-greenlime font-semibold'> Hola ,</h2>
                <h3 className='text-sm text-greenlime font-semibold'>{user?.name}  {user?.lastname}</h3> 
              </>
            )}
          </Link>
      </nav>
      <nav className='hidden col-span-0 md:flex md:flex-col md:col-span-4 lg:col-span-3 xl:col-span-2 bg-greenlime gap-y-2 p-10 mt-14 text-lime-950'>
        <Link href="/dashboard" className='hover:font-semibold transition-all duration-300'> Inicio </Link>
        <Link href="/dashboard/activity" className='hover:font-semibold transition-all duration-300'> Actividad </Link>
        <Link href="/dashboard/get-money" className='hover:font-semibold transition-all duration-300'> Cargar Dinero </Link>
        <Link href="/dashboard/pay-services" className='hover:font-semibold transition-all duration-300'> Pagar Servicio </Link>
        <Link href="/dashboard/cards" className='hover:font-semibold transition-all duration-300'> Tarjetas </Link>
        <Link href="/dashboard/profile" className='mb-8 hover:font-semibold transition-all duration-300'> Perfil </Link>
        <Link href="/" onClick={closeSesion} className='hover:font-semibold transition-all duration-300' id="closeSeccionNav"> Cerrar Sesion </Link>
      </nav>
      <div className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-7 2xl:col-span-8 mt-10 bg-gray-900 xl:pt-10">
        {children}
      </div>
      <aside className='bg-gray-900 hidden xl:flex xl:col-span-3 mt-14 2xl:col-span-2 border-l border-gray-700 text-white xl:flex-col xl:items-center xl:justify-start'>
        <div className='relative flex items-center justify-center'> 
          <Image src={imageProfile} className='w-[40%] my-4 border border-gray-700 rounded-full' alt="Imagen de Perfil"/>
          <div className='w-3 h-3 bg-greenlime rounded-full absolute animate-pulse left-32 top-20'/>
        </div>
        <h4 className='text-lg'> { user?.name ? user?.name : user?.companyName}  {user?.lastname ? user?.lastname : user?.businessField }</h4>
        <h2 className='text-sm text-gray-300'> { user?.email } </h2>
        <h4 className='text-sm text-gray-300'> Registrado el { formatDateProfile(user?.createdAt) } </h4>
        <CopyToClipboard text={user?.id} onCopy={() => toast.success("ID copiado en el Portapapeles")}>
          <h4 className='my-2 cursor-pointer text-greenlime'> {user?.id } </h4>         
        </CopyToClipboard>
        <CopyToClipboard text={user?.alias} onCopy={() => toast.success("Alias copiado en el Portapapeles")}>
          <h4 className='my-2 cursor-pointer text-greenlime'> {user?.alias } </h4>         
        </CopyToClipboard>
      </aside>
      <footer className='bg-gray-950 fixed lg:absolute bottom-0 w-full p-2 hidden md:block text-lime-500'>
        Digital Money App 2024
      </footer>
      <Navbar />
      <Toaster />
    </main>
  )
}

export default Layout