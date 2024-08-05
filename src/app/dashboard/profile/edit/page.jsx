'use client'
import { useAuth } from '@/context/AuthContext'
import React, { useState, useEffect } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { maskInput, splitAlias } from "../../../../utils/funcionalidades"
import toast from 'react-hot-toast'
import { FaRegEdit } from "react-icons/fa";

const LoguinPage = () => {
    const { user, logout, editUser} = useAuth()
    const router = useRouter()
    const { handleSubmit, register, setValue } = useForm()
   

    const aliasSplit = splitAlias(user?.alias || 'alias.default.value') // Proveer un valor por defecto en caso de que `user?.alias` sea undefined

    useEffect(() => {
        if (user) {
            setValue('email', user.email)
            setValue('name', user.name)
            setValue('lastname', user.lastname)
            setValue('dni', user.dni)
            setValue('phone', user.phone)
            setValue('aliasuno', aliasSplit[0])
            setValue('aliasdos', aliasSplit[1])
            setValue('aliastres', aliasSplit[2])
            setValue('cbu', user.cbu)
        }
    }, [user, setValue])

    const [aliasUno, setAliasUno] = useState(aliasSplit[0])
    const [aliasDos, setAliasDos] = useState(aliasSplit[1])
    const [aliasTres, setAliasTres] = useState(aliasSplit[2])

    const onChangeAlias = (e) => {
        const { name, value } = e.target
        if (name === 'aliasuno') {
            setAliasUno(value)
        } else if (name === 'aliasdos') {
            setAliasDos(value)
        } else if (name === 'aliastres') {
            setAliasTres(value)
        }
    }

    const newAlias = `${aliasUno}.${aliasDos}.${aliasTres}` 


    const onSubmit = handleSubmit((data) => {        
        console.log(newAlias)
        const newDataUser = {
            email: data.email,
            name: data.name,
            lastname: data.lastname,
            dni: data.dni,
            phone: data.phone,
            alias: newAlias,
            cbu: data.cbu,
        }
        console.log(newDataUser)
        editUser(newDataUser)
        router.push("/dashboard")
    })

    return (
        <>
            <form className='w-full mt-10' onSubmit={onSubmit}>
                <section className='w-[80%] mx-auto bg-gray-800 rounded-md p-4 mt-2 flex flex-col gap-2'>
                    <h2>Tus datos</h2>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Email</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-black text-center' {...register("email")} />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Nombre</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-black text-center' {...register("name")} />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Apellido</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-black text-center' {...register("lastname")} />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>CUIT</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-black text-center' {...register("dni")}/>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Telefono</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-black text-center' {...register("phone")}/>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Contraseña</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-black text-center' placeholder={maskInput(user?.cbu || '')} readOnly {...register("newPassword")} />
                    </div>
                </section>

                <h6 className='block w-[80%] mx-auto bg-lime-500 text-lime-950 font-semibold rounded-md p-4 mt-2 text-center'>
                    Edita tu alias o cbu
                </h6>

                <section className='w-[80%] mx-auto bg-gray-800 rounded-md p-4 mt-2'>
                    <h3 className='font-semibold'>Desde aquí podrás editar los datos correspondientes a la transferencia de dinero</h3>

                    <article className='flex flex-row justify-between items-center my-4 cursor-pointer' onClick={() => toast.success("CBU copiado en el Portapapeles")}>
                        <div className='flex flex-col'>
                            <h5 className='font-bold text-lime-500'>CVU</h5>
                            <input placeholder= {user?.cbu || ''} className='text-center text-gray-400'  {...register("cbu")}/>
                        </div>
                        <div>
                            <FaRegEdit className='text-lime-500' />
                        </div>
                        
                    </article>

                   
                    <article className='flex flex-row justify-between items-center my-4'>
                        <div className='flex flex-col'>
                            <h5 className='font-bold text-lime-500'>Alias</h5>
                            <div className='flex flex-col gap-2'>
                                <input placeholder={aliasUno} onChange={onChangeAlias} className='text-black text-center' name="aliasuno" maxLength={10} />
                                <input placeholder={aliasDos} onChange={onChangeAlias} className='text-black text-center' name="aliasdos" maxLength={10} />
                                <input placeholder={aliasTres} onChange={onChangeAlias} className='text-black text-center' name="aliastres" maxLength={10} />
                            </div>
                        </div>


                        <div>
                            <FaRegEdit className='text-lime-500' />
                        </div>
                    </article>

                    <article className='flex flex-col justify-center items-center'>
                        <h3>Su identificaciones pasaran a ser ser</h3>
                        <h6> { user?.cbu } </h6>
                        <h6>{`${aliasUno}.${aliasDos}.${aliasTres}`}</h6>
                    </article>
                </section>

                <button type="submit" className='block w-[80%] mx-auto bg-greenlime text-lime-950 font-semibold rounded-md p-4 mt-2'>Guardar Cambios</button>
            </form>

        </>
    )
}

export default LoguinPage
