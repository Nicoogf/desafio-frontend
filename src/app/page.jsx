import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo-off.png"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-around relative z-50 w-full max-w-[1920px] mx-auto h-[calc(100vh-40px)] rounded-xl border border-slate-900 overflow-hidden bg-gray-900 text-white">

    <nav className="absolute top-0 bg-greenlime text-slate-800 w-full p-2 flex flex-row items-center justify-between">
     <Image src={Logo} alt= "Logo Digital Money App" className="w-14 ml-4"/> 
      <div className="flex flex-row gap-x-2">
        <Link className="bg-gray-950 text-greenlime px-3 py-2 rounded-md font-semibold w-[120px] text-center text-xs md:text-sm border border-transparent hover:text-gray-950 hover:bg-slate-300 hover:border-slate-900 transition-all duration-100" href="/login" id="loginButton"> Ingresar </Link>
        <Link className="bg-gray-950 text-greenlime px-3 py-2 rounded-md font-semibold w-[120px] text-center text-xs md:text-sm border border-transparent hover:text-gray-950 hover:bg-slate-300 hover:border-slate-900 transition-all duration-100" href="/register" id="registerButton"> Crear Cuenta  </Link>
      </div>
    </nav>

     <section className="flex flex-col w-[95%] xl:w-[60%] xl:mx-auto mt-14 mb-6 max-w-[1440px] md:ml-10">
      <h3 className="text-xl mb-1 font-extralight text-center
                     md:text-5xl md:text-start"> De ahora en adelante  </h3>
      <h3 className="text-2xl mb-1 font-extralight text-center
                     md:text-6xl md:text-start">  hace mas con tu dinero </h3>
      <h4 className="text-2xl text-greenlime text-center
                     md:text-5xl md:text-start"> Tu nueva  <span className="font-semibold"> billetera virtual</span> </h4>
     </section>

      <section className="w-[95%] xl:w-[60%] flex flex-col md:flex-row gap-2 max-w-[1440px] mx-auto -mt-20">

        <Link href="/login" className="bg-slate-800 flex flex-col gap-2 p-3 xl:p-6 md:p-4 rounded-xl md:w-[50%] shadow-lg h-[150px] md:h-[200px] hover:bg-slate-300 hover:text-black transition-all duration-100 group">
        <article>
          <h4 className="border-b-2 border-greenlime mb-2 pb-2 text-xl md:text-2xl  group-hover:border-lime-600">
            Transferi Dinero
          </h4>
          <p className="text-sm md:text-base"> Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como tambien recibir transferencias y nuclear tu capital en nuestra billetera virtual </p>
        </article>
        </Link>
        <Link href="/login" className="bg-slate-800 flex flex-col gap-2 p-3 xl:p-6 md:p-4 rounded-xl md:w-[50%] shadow-lg h-[150px] md:h-[200px] hover:bg-slate-300 hover:text-black transition-all duration-200 group ">
        <article>
        <h4 className="border-b-2 border-greenlime mb-2 pb-2 text-xl md:text-2xl  group-hover:border-lime-600">
            Pago de Servicios
          </h4>
          <p className="text-sm md:text-base">  Paga mensualmente los servicios en 3 simples clicks, Facil, rapido y conveniente.Olvidate de las facturas en papel </p>
        </article>
        </Link>
      </section>

      <footer className="absolute bottom-0 bg-gray-950 text-greenlime w-full p-3 ">
        <p className="text-sm animate-pulse"> 2024 Digital Money App </p>
      </footer>
    
    </main>
  );
}

