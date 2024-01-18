"use client"

import {ToastProvider} from "@/contexts/ToastContext";
import usersData from "../../../../mock-data.json";
import React from "react";
import Image from "next/image";
import CicularScore, {SCORE_COLORS} from "@/components/CircularScore";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import DetailedScore from "@/components/DetailedScore";
import {Card, InfoDetailRow} from "@/components/DetailedProfile";
import moment from "moment/moment";
import {useRouter} from "next/navigation";

export default function AppWrapper() {
    return <ToastProvider>
        <App/>
    </ToastProvider>
}

function App() {
    const router = useRouter()

    const userData = usersData[0]
    const globalScore = Math.round(Object.values(userData.score).reduce((a, b) => a + b, 0) / Object.keys(userData.score).length)

    const nickname = globalScore < 800 ? 'Mauvaise Herbe' : globalScore < 900 ? 'Ananas sur une pizza' : 'Eco-Friend'
    const colorNickname = globalScore < 800 ? SCORE_COLORS.red : globalScore < 900 ? SCORE_COLORS.yellow : SCORE_COLORS.green

    const [activeTab, setActiveTab] = React.useState<"score" | "historique" | "profile">("score")

    return <main className={"min-h-screen p-4 w-screen flex flex-col gap-8"}>
        <div className={"flex justify-between items-start h-[150px]"}>
            <div className={""}>
                <h1 className={"font-bold text-black text-2xl"}>Hi, {userData.firstname} <span
                    className={"text-4xl"}>👋🏼</span>
                </h1>
                <h3 className={"text-lg font-bold"} style={{color: colorNickname}}>{nickname}</h3>
            </div>
            <div className={"w-[150px] h-full"}>
                <CicularScore score={globalScore} version={"little"}/>
            </div>
        </div>

        <Tabs defaultValue="score" className="flex flex-col w-full h-full justify-between grow">
            <TabsContent value={"score"}>
                <div
                    className={"shadow shadow-xl rounded-3xl p-4 w-full h-[520px] mb-8 flex flex-col items-start justify-center"}>
                    <DetailedScore score={userData.score} version={"mobile"}/>
                </div>
            </TabsContent>
            <TabsContent value={"historique"}>
                <div
                    className={"shadow shadow-xl rounded-3xl p-4 h-[520px] w-full grow mb-8"}>
                    <div
                        className={"overflow-y-scroll h-full flex flex-col gap-8 no-scrollbar"}>
                        <Card icon={"/block.png"} title={"Augmentation de 32% de sa consommation d’électricité"}
                              version={"mobile"}
                              description={"Augmentation de 36g de CO2"}/>
                        <Card icon={"/warning.png"} prefix={"Avertissement"}
                              version={"mobile"}
                              title={"Vous avez moins de 700 points"}/>
                        <Card icon={"/block.png"} title={"Augmentation de 85% de sa consommation d’électricité"}
                              version={"mobile"}
                              description={"Augmentation de 98g de CO2"}/>
                        <Card icon={"/eco.png"} title={"Recyclage de vêtements"}
                              version={"mobile"}
                              description={"..."}/>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value={"profile"}>
                <div
                    className={"shadow shadow-xl h-[520px] rounded-3xl p-4 w-full grow mb-8 flex flex-col justify-items-start items-center"}>
                    <Image src={"/logo.png"} width={450} height={450} alt={"logo"}/>
                    <h3 className={"text-4xl font-bold my-2 text-dark truncate mb-4"}>{userData?.firstname} <span
                        className={"uppercase"}>{userData?.lastname}</span></h3>
                    <InfoDetailRow label={"Age"}
                                   value={moment().diff(moment(userData?.birthdate, "DD-MM-YYYY"), 'years') + "  (" + userData?.birthdate + ")"}/>
                    <InfoDetailRow label={"Mobile"} value={userData?.mobile}/>
                    <InfoDetailRow label={"Address"} value={userData?.address}/>
                    <button
                        onClick={() => router.push("/client/login")}
                        className={"mt-auto max-w-[450px] bg-gray-200 font-bold text-xl text-black uppercase rounded-full w-full self-end justify-self-end"}>
                        Deconnexion
                    </button>
                </div>
            </TabsContent>

            <TabsList
                className="w-full h-[75px] flex items-center justify-center gap-4 bg-white">
                <TabsTrigger value="score"
                             onClick={() => setActiveTab("score")}
                             className={"flex-col text-black text-md h-full font-bold data-[state=active]:text-black data-[state=active]:bg-transparent text-opacity-0"}>
                    {
                        activeTab === "score" ?
                            <Image src={"/score_active.png"} width={32} height={32} alt={"icon"}/>
                            : <Image src={"/score.png"} width={32} height={32} alt={"icon"}/>
                    }

                    <p>Score</p>
                </TabsTrigger>
                <TabsTrigger value="historique"
                             onClick={() => setActiveTab("historique")}
                             className={"flex-col text-black text-md h-full font-bold data-[state=active]:text-black data-[state=active]:bg-transparent text-opacity-0"}>
                    {
                        activeTab === "historique" ?
                            <Image src={"/historique_active.png"} width={32} height={32} alt={"icon"}/>
                            : <Image src={"/historique.png"} width={32} height={32} alt={"icon"}/>
                    }
                    <p>Historique</p>
                </TabsTrigger>
                <TabsTrigger value="profile"
                             onClick={() => setActiveTab("profile")}
                             className={"flex-col text-black text-md h-full font-bold data-[state=active]:text-black data-[state=active]:bg-transparent text-opacity-0"}>
                    {
                        activeTab === "profile" ?
                            <Image src={"/profile_active.png"} width={32} height={32} alt={"icon"}/>
                            : <Image src={"/profile.png"} width={32} height={32} alt={"icon"}/>
                    }
                    <p>Profil</p>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    </main>
}