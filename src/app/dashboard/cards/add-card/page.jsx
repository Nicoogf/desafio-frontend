'use client'

import { useAuth } from '@/context/AuthContext'
import { useCard } from '@/context/CardContext'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const AddCardPage = () => {

    const { user, loading, isAuthenticated } = useAuth()
    const router = useRouter()
    console.log("El usuario es: ", user, "¿Está cargando? :", loading)
    const { register , handleSubmit } = useForm()
    const { card , createCard , errors , setError} = useCard()
    const [ cardComponent , setCardComponent ] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      })
    console.log("El listado actual de Tarjetas :" , card)

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
        router.push("/dashboard/cards")

    });

    const onChange = (e) => {
        setCardComponent({
            ...cardComponent,
            [e.target.name] : e.target.value
        })
    }
 

    const handleInputFocus = (e) => {
        console.log(e.target.name)
        setCardComponent((prev) => ({ ...prev, focus: e.target.name }));
      }

      console.log(errors)

   

    return (
        <section className=''>


        <div className='mt-24'>
        <Cards 
        number={cardComponent.serial} 
        name={cardComponent.titular}  
        expiry={ cardComponent.vto == undefined ?  "" : cardComponent.vto} 
        cvc={cardComponent.codeSegurity}
        focused={cardComponent.focus}/>
    
        </div>
            <h1> Agregar una tarjeta nueva </h1>
            <form onSubmit={onSubmit}
                className='flex flex-col gap-y-2 text-black'>


                <input className='bg-blue-100 p-2' 
                       name="titular"
                       type='text' 
                       placeholder='Ingresar nombre de la tarjeta'
                       autoFocus
                       {...register("titular")}
                       onChange={onChange}
                       onFocus={handleInputFocus}
                      
                />


                <input className='bg-blue-100 p-2' 
                       name="name"
                       type='text' 
                       placeholder='Ingresar Descripcion de la tarjeta '
                       autoFocus
                       {...register("desc")}
                       onChange={onChange}
                       onFocus={handleInputFocus}
                     
                />


                <input className='bg-blue-100 p-2' 
                       maxlength="16"
                       name="serial" 
                       type='text' 
                       placeholder='Ingresa el numero de tarjeta'
                       {...register("serial")}
                       onChange={onChange}
                       onFocus={handleInputFocus}
                    
                />

                <input className='bg-blue-100 p-2' 
                name="cvc" 
                maxlength="3"
                type='text' 
                placeholder='Codigo de seguridad'  
                {...register("cvc")}
                onChange={onChange}
                onFocus={handleInputFocus}
             
                />

                <input className='bg-blue-100 p-2' 
                name="vto"
                maxlength="4"
                type='text' 
                placeholder='Vencimiento'
                {...register("vto")}
                onChange={onChange}
                onFocus={handleInputFocus}
 
                />



                <button className='bg-red-500 text-white p-2' type='submit'> Agregar </button>

            </form>
                {errors && (
                    <p> {errors} </p>
                )}
        </section>
    )
}

export default AddCardPage