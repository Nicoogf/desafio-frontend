'use client'

import { useAuth } from '@/context/AuthContext'
import { useCard } from '@/context/CardContext'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Link from 'next/link'


const AddCardPage = () => {

    const { user, loading, isAuthenticated } = useAuth()
    const router = useRouter()
    console.log("El usuario es: ", user, "¿Está cargando? :", loading)
    const { register, handleSubmit } = useForm()
    const { card, createCard, errors, setError } = useCard()
    const [cardComponent, setCardComponent] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    })
    console.log("El listado actual de Tarjetas :", card)

    // const onSubmit = handleSubmit((data) => {
    //     if (user && user.id) {
    //         createCard(user.id, {
    //             name: data.titular,
    //             codeSegurity: data.codeSegurity,
    //             serial: data.serial,
    //             vto: data.vto,
    //             desc: data.desc,
    //         });
    //     } else {
    //         console.log("User ID is missing");
    //         return
    //     }
    //     router.push("/dashboard/cards")

    // });

    
    const onSubmit = handleSubmit((data) => {
        if (user && user.id) {
            createCard(user.id, {
                name: data.titular,
                codeSegurity: data.codeSegurity,
                serial: data.serial,
                vto: data.vto,
                desc: data.desc,
            });
        } else {
            console.log("User ID is missing");
            return
        }
    });

    const onChange = (e) => {
        setCardComponent({
            ...cardComponent,
            [e.target.name]: e.target.value
        })
    }


    const handleInputFocus = (e) => {
        console.log(e.target.name)
        setCardComponent((prev) => ({ ...prev, focus: e.target.name }));
    }

    console.log(errors)



    return (
        <section className='bg-gray-900'>


            {(errors.length > 0) ? (
                <div className={`w-[100%] max-w-[450px] flex flex-col text-white left-1/2 -translate-x-1/2 mx-auto shadow-xl absolute bg-slate-950 text-center transition-all duration-500 translate-y-0 py-4 border-2 border-red-800 rounded-t-md z-50 top-2 xl:top-4 `}>

                    <h4 className='font-semibold border-b-2 border-slate-700 pb-2 w-[80%] mx-auto'>No pudiste realizar la Operacion </h4>


                    <ul className='list-disc list-inside text-sm pt-2'>
                        {errors?.map((error, i) => (
                            <>
                                <li key={i} className='text-red-400'>{error}</li>
                                <Link href="/dashboard">Ir a inicio </Link>
                            </>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={`w-[100%] max-w-[450px]  mx-auto shadow-xl absolute top-0 bg-red-700 text-center transition-all duration-500 -translate-y-36`}>
                    <ul className='list-disc list-inside'>
                        {errors.map((error, i) => (
                            <li key={i} className='text-white'>{error}</li>
                        ))}
                    </ul>
                </div>
            )}


            <div className='mt-24'>
                <Cards
                    number={cardComponent?.serial}
                    name={cardComponent?.titular}
                    expiry={cardComponent?.vto == undefined ? "" : cardComponent?.vto}
                    cvc={cardComponent?.codeSegurity}
                    focused={cardComponent?.focus} />

            </div>
            <h1 className='text-white text-center my-5'> Agregar una tarjeta nueva </h1>
            <form onSubmit={onSubmit}
                className='flex flex-col gap-y-2 text-black w-[90%] mx-auto max-w-[550px]'>


                <input className='bg-slate-800 p-2 text-greenlime outline-none rounded-lg font-semibold'
                    name="titular"
                    type='text'
                    placeholder='Ingresar nombre de la tarjeta'
                    autoFocus
                    {...register("titular")}
                    onChange={onChange}
                    onFocus={handleInputFocus}

                />


                <input className='bg-slate-800 p-2 text-greenlime outline-none rounded-lg font-semibold'
                    name="name"
                    type='text'
                    placeholder='Ingresar Descripcion de la tarjeta '
                    autoFocus
                    {...register("desc")}
                    onChange={onChange}
                    onFocus={handleInputFocus}

                />


                <input className='bg-slate-800 p-2 text-greenlime outline-none rounded-lg font-semibold'
                    maxlength="16"
                    name="serial"
                    type='text'
                    placeholder='Ingresa el numero de tarjeta'
                    {...register("serial")}
                    onChange={onChange}
                    onFocus={handleInputFocus}

                />

                <input className='bg-slate-800 p-2 text-greenlime outline-none rounded-lg font-semibold'
                    name="cvc"
                    maxlength="3"
                    type='text'
                    placeholder='Codigo de seguridad'
                    {...register("cvc")}
                    onChange={onChange}
                    onFocus={handleInputFocus}

                />

                <input className='bg-slate-800 p-2 text-greenlime outline-none rounded-lg font-semibold'
                    name="vto"
                    maxlength="4"
                    type='text'
                    placeholder='Vencimiento'
                    {...register("vto")}
                    onChange={onChange}
                    onFocus={handleInputFocus}

                />



                <button className='bg-greenlime text-lime-950 rounded-lg font-semibold p-2' type='submit'> Agregar </button>

            </form>
           
        </section>
    )
}

export default AddCardPage