"use client"

import Aside from "@/components/Aside";
import DetailedProfile from "@/components/DetailedProfile";
import {UserProvider} from "@/contexts/UserContext";
import {useQuery} from "@tanstack/react-query";

export type UserType = {
    id: number;
    adresse: string;
    age: number;
    compteBancaire: string;
    dateNaissance: string;
    mobile: string;
    nom: string;
    nuisanceSonore: number;
    pollutionLumineuse: number;
    positionActuelle: string;
    prenom: string;
    scoreAlimentation: number;
    scoreEnergie: number;
    scoreTransport: number;
    biodiversityProtectionScore: number;
}

export default function Home() {
    const users = useQuery({
        queryKey: ["users"],
        queryFn: () => fetch('http://localhost:8080/api/users').then(res => res.json())
    })

    if (users.isLoading) return <p>Loading...</p>

    if (users.isError) return <p>Error</p>

    const usersData = users.data as UserType[]


    return (
        <main className="min-h-screen">
            <UserProvider>
                <div className="flex">
                    <Aside usersData={usersData}/>
                    <DetailedProfile usersData={usersData}/>
                </div>
            </UserProvider>
        </main>
    )
}
