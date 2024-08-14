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
            <form className='w-full mt-2 text-white max-w-[864px] mx-auto h-[100%] overflow-hidden' onSubmit={onSubmit}>
                <section className='w-[80%] mx-auto  rounded-md p-4 mt-1 flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold'>Tus datos</h2>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Email</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-greenlime bg-slate-800 rounded-lg text-center p-1' {...register("email")} />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Nombre</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-greenlime bg-slate-800 rounded-lg text-center p-1' {...register("name")} />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Apellido</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-greenlime bg-slate-800 rounded-lg text-center p-1' {...register("lastname")} />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>CUIT</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-greenlime bg-slate-800 rounded-lg text-center p-1' {...register("dni")}/>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Telefono</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-greenlime bg-slate-800 rounded-lg text-center p-1' {...register("phone")}/>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <h6 className='text-sm w-[35%]'>Contraseña</h6>
                        <input className='flex flex-row justify-between items-center gap-x-2 w-[65%] text-greenlime bg-slate-800 rounded-lg text-center p-1' placeholder={maskInput(user?.cbu || '')} readOnly {...register("newPassword")} value="******"/>
                    </div>
                </section>

    
                <section className='w-[80%] mx-auto rounded-md p-2 mt-2 '>
                    <h3 className='font-semibold text-sm'>Desde aquí podrás editar los datos correspondientes a la transferencia de dinero</h3>

                    <article className='flex flex-row justify-between items-center my-4 cursor-pointer' onClick={() => toast.success("CBU copiado en el Portapapeles")}>
                        <div className='flex flex-col'>
                            <h5 className='font-bold text-greenlime'>CVU</h5>
                            <input placeholder= {user?.cbu || ''} className='flex flex-row justify-between items-center gap-x-2 text-greenlime bg-slate-800 rounded-lg text-center p-2'  {...register("cbu")} />
                        </div>
                        <div>
                            <FaRegEdit className='text-greenlime' />
                        </div>
                        
                    </article>

                   
                    <article className='flex flex-row justify-between items-center my-4'>
                        <div className='flex flex-col'>
                            <h5 className='font-bold text-greenlime'>Alias</h5>
                            <div className='flex flex-col xl:flex-row gap-1 w-full'>
                                <input placeholder={aliasUno} onChange={onChangeAlias} className='flex flex-row justify-between items-center gap-x-2 text-greenlime bg-slate-800 rounded-lg text-center p-2' name="aliasuno" maxLength={10} />
                                <input placeholder={aliasDos} onChange={onChangeAlias} className='flex flex-row justify-between items-center gap-x-2 text-greenlime bg-slate-800 rounded-lg text-center p-2' name="aliasdos" maxLength={10} />
                                <input placeholder={aliasTres} onChange={onChangeAlias} className='flex flex-row justify-between items-center gap-x-2 text-greenlime bg-slate-800 rounded-lg text-center p-2' name="aliastres" maxLength={10} />
                            </div>
                        </div>


                        <div>
                            <FaRegEdit className='text-greenlime ml-4' />
                        </div>
                    </article>

                    <article className='flex flex-col justify-center items-center'>
                        <h3>Su CVU pasaran a ser ser</h3>
                        <h6>{`${aliasUno}.${aliasDos}.${aliasTres}`}</h6>
                    </article>
                </section>

                <button type="submit" className='block w-[80%] max-w-[350px] mx-auto bg-greenlime text-lime-950 font-semibold rounded-md p-3 mt-2'>Guardar Cambios</button>
            </form>

        </>
    )
}

export default LoguinPage
