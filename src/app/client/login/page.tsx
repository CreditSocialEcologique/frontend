"use client"

import Image from 'next/image'
import React from "react";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {UserType} from "@/app/page";

export default function Login() {
    const {push} = useRouter()

    const [lastname, setLastname] = React.useState("")
    const [firstname, setFirstname] = React.useState("")

    const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(event.target.value)
    }

    const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(event.target.value)
    }

    const users = useQuery({
        queryKey: ["users"],
        queryFn: () => fetch('http://localhost:8080/api/users').then(res => res.json())
    })

    if (users.isLoading) return <p>Loading...</p>

    if (users.isError) return <p>Error</p>

    const usersData = users.data as UserType[]

    const login = () => {
        const user = usersData.find(user => user.nom === lastname && user.prenom === firstname)
        if (user) {
            push(`/client/app/${user.id}`)
        } else {
            alert("Utilisateur non trouvé")
        }
    }

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-mobile">
            <Image src="/logo_with_bg.png" width={400} height={400} alt="logo"/>

            <h1 className={"font-bold text-black text-4xl"}>Bonjour,</h1>
            <p className={"w-1/2 text-light text-center text-lg"}>Connectez-vous à votre compte !</p>

            <div className={"w-full flex items-center justify-between px-10 mt-20"}>
                <label htmlFor="lastname" className={"font-bold text-lg uppercase"}>Nom</label>
                <input type="text" id="lastname" name="lastname" className={"rounded-full py-1 px-2"}
                       onChange={handleLastnameChange} value={lastname}
                />
            </div>
            <div className={"w-full flex items-center justify-between px-10 mt-2"}>
                <label htmlFor="firstname" className={"font-bold text-lg uppercase"}>Prénom</label>
                <input type="text" id="password" name="password" className={"rounded-full py-1 px-2"}
                       onChange={handleFirstnameChange} value={firstname}
                />
            </div>


            <button
                onClick={login}
                className="text-white font-bold py-2 px-4 rounded-full mt-20 bg-[#0B1E2D] uppercase">
                Se connecter
            </button>
        </main>
    )
}