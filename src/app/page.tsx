"use client"

import Aside from "@/components/Aside";
import DetailedProfile from "@/components/DetailedProfile";
import {UserProvider} from "@/contexts/UserContext";

export default function Home() {
    return (
        <main className="min-h-screen">
            <UserProvider>
                <div className="flex">
                    <Aside/>
                    <DetailedProfile/>
                </div>
            </UserProvider>
        </main>
    )
}
