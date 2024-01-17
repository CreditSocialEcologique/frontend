import {useState} from "react";
import data from '../../mock-data.json'
import {useUser} from "@/contexts/UserContext";

export default function Aside() {
    const {setUser} = useUser()
    const [input, setInput] = useState('')

    const filteredData = data.filter((user) => {
        return user.firstname.toLowerCase().includes(input.toLowerCase()) || user.lastname.toLowerCase().includes(input.toLowerCase())
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
                <div className={"flex flex-col items-center justify-center mt-10 gap-2 w-full"}>
                    {filteredData.map((user, index) => (
                        <button
                            className="flex items-start justify-start w-full p-2 rounded-md w-full"
                            key={index}
                            onClick={() => setUser(user.id)}
                            style={{
                                background: index % 2 === 0 ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.05)'
                            }}>
                            <p className="text-lg">{user.lastname}</p>
                            <p className="text-md ml-2 text-light">{user.firstname}</p>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}
