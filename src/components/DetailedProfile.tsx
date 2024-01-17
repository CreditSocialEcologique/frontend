import {useUser} from "@/contexts/UserContext";
import data from '../../mock-data.json'
import Image from "next/image";
import moment from "moment";
import CicularScore from "@/components/CircularScore";
import DetailedScore from "@/components/DetailedScore";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"

type InfoDetailRowType = {
    label: string
    value: string
}

function InfoDetailRow({label, value}: InfoDetailRowType) {
    return (
        <div className={"flex items-start justify-start w-full pl-4 min-h-[35px]"}>
            <p className={"text-md font-bold text-light uppercase min-w-[200px]"}>{label}</p>
            <p className={"text-md text-dark uppercase"}>{value}</p>
        </div>
    )
}

type CardType = {
    icon: string,
    prefix?: string,
    title: string,
    description?: string,
}

function Card({icon, prefix, title, description}: CardType) {
    return (
        <div className={"flex items-center gap-8 py-2 px-4 bg-white rounded-2xl shadow shadow-xl h-[70px]"}>
            <Image src={icon} alt={"icon"} className={"ml-4 aspect-square w-[20px] h-[20px] object-contain"} width={30}
                   height={30}/>
            <div className={"flex flex-col"}>
                <div className={"flex items-center justify-start gap-2"}>
                    {prefix && <span className={"text-lg text-dark uppercase font-bold"}>{prefix}</span>}
                    <span className={"text-lg text-dark"}>{title}</span>
                </div>
                {description && <span className={"text-md text-light"}>{description}</span>}
            </div>
        </div>
    )
}

export default function DetailedProfile() {
    const {user: userId} = useUser()

    const user = data.find((user) => user.id === userId)

    if (!user) return (
        <div className={"p-8 w-full h-full flex items-center justify-center"}>
            <p className={"text-2xl text-dark"}>No user selected</p>
        </div>
    )

    const randomXY = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const globalScore = Math.round(Object.values(user?.score).reduce((a, b) => a + b, 0) / Object.values(user?.score).length)

    return (
        <div className={"grid grid-rows-[2fr_1fr_2fr] grid-cols-[1fr_2fr] gap-8 p-8 h-screen w-full"}>
            <div
                className={"bg-white rounded-2xl shadow shadow-2xl row-start-1 row-end-3 col-start-1 flex flex-col p-4 justify-between items-center"}>
                <Image src={"/profile_picture.png"} alt={"profile_picture"}
                       width={600}
                       height={600}
                       className={"rounded-full aspect-square w-[150px] h-[150px] object-cover shadow shadow-xl"}/>
                <h3 className={"text-4xl font-bold my-2 text-dark truncate"}>{user?.firstname} <span
                    className={"uppercase"}>{user?.lastname}</span></h3>
                <InfoDetailRow label={"Age"}
                               value={moment().diff(moment(user?.birthdate, "DD-MM-YYYY"), 'years') + "  (" + user?.birthdate + ")"}/>
                <InfoDetailRow label={"Mobile"} value={user?.mobile}/>
                <InfoDetailRow label={"Address"} value={user?.address}/>
                <InfoDetailRow label={"Bank Account"} value={user?.bank}/>
                <InfoDetailRow label={"Current Position"} value={"Caen"}/>
            </div>

            <div className={"bg-white rounded-2xl shadow shadow-2xl col-start-2 row-span-1 flex p-4"}>
                <div className={"flex items-center justify-center w-1/3 h-full"}>
                    <CicularScore score={globalScore}/>
                </div>
                <div className={"flex flex-col items-center justify-center w-2/3 h-full"}>
                    <DetailedScore score={user?.score}/>
                </div>
            </div>

            <div className={"row-start-3 relative"}>
                <Image src={"/map.png"} alt={"profile_picture"}
                       width={600}
                       height={600}
                       className={"w-full h-full rounded-2xl"}/>
                <div className={"absolute w-[10px] h-[10px] bg-red-500 rounded-full"} style={{
                    top: `${randomXY(20, 80)}%`,
                    left: `${randomXY(20, 80)}%`
                }}/>
            </div>

            <div className={"row-start-2 row-end-4 col-start-2"}>
                <Tabs defaultValue="historique" className="flex flex-col w-full h-full">
                    <TabsList
                        className="grid w-full h-full grid-cols-4 gap-4 shadow shadow-3xl h-[80px] bg-transparent">
                        <TabsTrigger value="historique"
                                     className={"rounded-xl text-black text-xl h-full font-bold shadow shadow-2xl"}>Historique</TabsTrigger>
                        <TabsTrigger value="bank"
                                     className={"rounded-xl text-black text-xl h-full font-bold shadow shadow-2xl"}>Bank</TabsTrigger>
                        <TabsTrigger value="contacts"
                                     className={"rounded-xl text-black text-xl h-full font-bold shadow shadow-2xl"}>Contacts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="historique">
                        <div
                            className={"p-8 pt-0 grow-0 overflow-y-scroll max-h-[420px] flex flex-col gap-4 no-scrollbar"}>
                            <Card icon={"/block.png"} title={"Augmentation de 32% de sa consommation d’électricité"}
                                  description={"Augmentation de 36g de CO2"}/>
                            <Card icon={"/warning.png"} prefix={"Avertissement"}
                                  title={"Vous avez moins de 700 points"}/>
                            <Card icon={"/block.png"} title={"Augmentation de 85% de sa consommation d’électricité"}
                                  description={"Augmentation de 98g de CO2"}/>
                            <Card icon={"/eco.png"} title={"Recyclage de vêtements"}
                                  description={"..."}/>
                        </div>
                    </TabsContent>
                    <TabsContent value="bank">
                        <div
                            className={"p-8 pt-0 grow-0 overflow-y-scroll max-h-[420px] flex flex-col gap-4 no-scrollbar"}>
                            <Card icon={"/increase.png"}
                                  title={"Salaire de 1800€"}
                                  description={"Source : Bar French Café"}/>
                            <Card icon={"/decrease.png"}
                                  title={"Dépense de 300€"}
                                  description={"Achat de cartes Pokémon"}/>
                            <Card icon={"/bank.png"}
                                  prefix={"Taxe 36€"}
                                  title={"Mauvais Comportement"}/>
                        </div>
                    </TabsContent>
                    <TabsContent value="contacts">
                        <div className={"p-8 pt-0 grow-0 overflow-y-scroll max-h-[420px] flex flex-col gap-4 no-scrollbar"}>
                            <Card icon={"/user.png"} prefix={"Mr"} title={"John Doe"} description={"(555) 123-4567"} />
                            <Card icon={"/user.png"} prefix={"Ms"} title={"Alice Johnson"} description={"(555) 234-5678"} />
                            <Card icon={"/user.png"} prefix={"Dr"} title={"Robert Smith"} description={"(555) 345-6789"} />
                            <Card icon={"/user.png"} prefix={"Mrs"} title={"Emily White"} description={"(555) 456-7890"} />
                            <Card icon={"/user.png"} prefix={"Rev"} title={"David Black"} description={"(555) 567-8901"} />
                            <Card icon={"/user.png"} prefix={"Prof"} title={"Anna Green"} description={"(555) 678-9012"} />
                            <Card icon={"/user.png"} prefix={"Mr"} title={"Chris Brown"} description={"(555) 789-0123"} />
                            <Card icon={"/user.png"} prefix={"Dr"} title={"Olivia Taylor"} description={"(555) 890-1234"} />
                            <Card icon={"/user.png"} prefix={"Ms"} title={"Daniel Lee"} description={"(555) 901-2345"} />
                            <Card icon={"/user.png"} prefix={"Mrs"} title={"Samuel Wilson"} description={"(555) 012-3456"} />
                            <Card icon={"/user.png"} prefix={"Prof"} title={"Grace Miller"} description={"(555) 123-4567"} />
                            <Card icon={"/user.png"} prefix={"Rev"} title={"Sophia Johnson"} description={"(555) 234-5678"} />
                            <Card icon={"/user.png"} prefix={"Mr"} title={"Andrew Davis"} description={"(555) 345-6789"} />
                            <Card icon={"/user.png"} prefix={"Ms"} title={"Eva Robinson"} description={"(555) 456-7890"} />
                            <Card icon={"/user.png"} prefix={"Dr"} title={"Brian Moore"} description={"(555) 567-8901"} />
                            <Card icon={"/user.png"} prefix={"Mrs"} title={"Kevin Harris"} description={"(555) 678-9012"} />
                            <Card icon={"/user.png"} prefix={"Prof"} title={"Emma King"} description={"(555) 789-0123"} />
                            <Card icon={"/user.png"} prefix={"Rev"} title={"Tyler Clark"} description={"(555) 890-1234"} />
                            <Card icon={"/user.png"} prefix={"Mr"} title={"Zoe Wright"} description={"(555) 901-2345"} />
                            <Card icon={"/user.png"} prefix={"Ms"} title={"Jason Turner"} description={"(555) 012-3456"} />
                            <Card icon={"/user.png"} prefix={"Dr"} title={"Sophie Walker"} description={"(555) 123-4567"} />
                            <Card icon={"/user.png"} prefix={"Mrs"} title={"Alexandra White"} description={"(555) 234-5678"} />
                            <Card icon={"/user.png"} prefix={"Prof"} title={"Mason Hall"} description={"(555) 345-6789"} />
                            <Card icon={"/user.png"} prefix={"Rev"} title={"Victoria Allen"} description={"(555) 456-7890"} />
                            <Card icon={"/user.png"} prefix={"Mr"} title={"Lily Davis"} description={"(555) 567-8901"} />
                            <Card icon={"/user.png"} prefix={"Ms"} title={"Justin Martin"} description={"(555) 678-9012"} />
                            <Card icon={"/user.png"} prefix={"Dr"} title={"Natalie Carter"} description={"(555) 789-0123"} />
                            <Card icon={"/user.png"} prefix={"Mrs"} title={"Ethan Hill"} description={"(555) 890-1234"} />
                            <Card icon={"/user.png"} prefix={"Prof"} title={"Isabel Scott"} description={"(555) 901-2345"} />
                            <Card icon={"/user.png"} prefix={"Rev"} title={"Noah Garcia"} description={"(555) 012-3456"} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}