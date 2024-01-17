import React, {createContext, useContext, useState} from "react";

type UserContextType = {
    user: number | null
    setUser: (user: number) => void
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
})

export const useUser = () => {
    const context = useContext(UserContext)

    if (context === null) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}

export const UserProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserContextType['user'] | null>(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}