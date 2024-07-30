import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo-off.png"

export default function Home() {
  return (
    <main className="bg-gradient-lime flex flex-col items-center relative z-50 w-full mx-auto h-[calc(100vh-40px)] rounded-xl border border-gray-800 overflow-hidden bg-slate-800">
    <nav className="absolute top-0 bg-greenlime text-gray-900 w-full p-2 flex flex-row items-center justify-between">
     <Image src={Logo} alt= "Logo Digital Money App" className="w-14 ml-4"/> 
      <div className="flex flex-row gap-x-2">
        <Link className="bg-gray-900 text-greenlime px-3 py-2 rounded-md text-sm font-semibold w-[120px] text-center" href="/login  "> Ingresar </Link>
        <Link className="bg-gray-900 text-greenlime px-3 py-2 rounded-md text-sm font-semibold" href="/register"> Crear Cuenta  </Link>
      </div>
    </nav>

     <section className="flex flex-col w-full mt-24 mb-6 max-w-[1440px] mx-auto">
      <h3 className="text-2xl mb-2 font-extralight text-center
                     md:text-4xl md:text-start"> De ahora en adelante  </h3>
      <h3 className="text-3xl mb-2 font-extralight text-center
                     md:text-5xl md:text-start">  hace mas con tu dinero </h3>
      <h4 className="text-3xl text-greenlime text-center
                     md:text-4xl md:text-start"> Tu nueva  <span className="font-semibold"> billetera virtual</span> </h4>
     </section>

      <section className="w-[95%] flex flex-col md:flex-row gap-2 max-w-[1440px] mx-auto">

        <Link href="/login" className="bg-gray-900 flex flex-col gap-2 p-4 rounded-md md:w-[50%] shadow-lg h-[200px]">
        <article>
          <h4 className="border-b-2 border-greenlime mb-2 pb-2 text-xl">
            Transferi Dinero
          </h4>
          <p className="text-sm"> Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como tambien recibir transferencias y nuclear tu capital en nuestra billetera virtual </p>
        </article>
        </Link>
        <Link href="/login" className="bg-gray-900 flex flex-col gap-2 p-4 rounded-md md:w-[50%] shadow-lg h-[200px]">
        <article>
        <h4 className="border-b-2 border-greenlime mb-2 pb-2 text-xl">
            Pago de Servicios
          </h4>
          <p className="text-sm">  Paga mensualmente los servicios en 3 simples clicks, Facil, rapido y conveniente.Olvidate de las facturas en papel </p>
        </article>
        </Link>
      </section>

      <footer className="absolute bottom-0 bg-gray-900 text-greenlime w-full p-3 ">
        <p className="text-sm"> 2024 Digital Money App </p>
      </footer>
    
    </main>
  );
}

