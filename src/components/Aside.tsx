import {useState} from "react";
import {useUser} from "@/contexts/UserContext";
import {UserType} from "@/app/page";

type AsideProps = {
    usersData: UserType[]
}

export default function Aside({usersData}: AsideProps) {
    const {setUser} = useUser()
    const [input, setInput] = useState('')

    console.log(usersData)

    const filteredData = usersData.filter((user) => {
        return user.nom.toLowerCase().includes(input.toLowerCase()) || user.prenom.toLowerCase().includes(input.toLowerCase())
    })

    return (
        <aside className={`p-4 w-1/4 bg-dark text-white h-screen min-w-[350px]`}>
            <div className="flex flex-col items-center justify-center">
                <input
                    className="border border-gray-300 rounded-full p-2 pl-4 bg-transparent min-w-[250px]"
                    placeholder="Search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className={"flex flex-col items-center justify-center mt-10 gap-2 w-full max-h-[800px] overflow-y-scroll no-scrollbar"}>
                    {filteredData.map((user, index) => (
                        <button
                            className="flex items-start justify-start w-full p-2 rounded-md w-full"
                            key={index}
                            onClick={() => setUser(user.id)}
                            style={{
                                background: index % 2 === 0 ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.05)'
                            }}>
                            <p className="text-lg">{user.nom}</p>
                            <p className="text-md ml-2 text-light">{user.prenom}</p>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}
