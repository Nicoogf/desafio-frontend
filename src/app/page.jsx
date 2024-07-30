import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24">
      <h1> Inicio de Proyecto </h1>
      <p> Digital Money House </p>
      <div className="flex flex-row gap-x-2 mt-4"> 
        <article className="flex flex-col items-center">
          <p> Ingresa tu dinero </p>
          <Link href="/"> Ver Mas  </Link>
        </article>

        <article className="flex flex-col  items-center">
          <p> Genera Rendimientos </p>
          <Link href="/"> Ver Mas  </Link>
        </article>
      </div>
    </main>
  );
}
