import React from "react";

export enum ToastType {
    ERROR = 'error',
}

type Toast = {
    id: string
    message: string
    description: string
    type: ToastType
    duration?: number
}

type ToastContextType = {
    addToast: (message: string, type: ToastType, description?: string, duration?: number) => void
}

const ToastContext = React.createContext<ToastContextType>({
    addToast: () => {
    }
})

export const useToast = () => {
    const context = React.useContext(ToastContext)

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }

    return React.useContext(ToastContext)
}

export const ToastProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [toasts, setToasts] = React.useState<Toast[]>([])

    const addToast = (message: string, type: ToastType, description = "", duration = 5000) => {
        const id = Math.random().toString(36).substring(2, 9)

        setToasts((toasts) => [...toasts, {id, message, description, type, duration}])

        setTimeout(() => {
            setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
        }, duration)
    }

    return (
        <ToastContext.Provider value={{addToast}}>
            {children}

            <div className="fixed top-0 right-0 z-50 p-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`relative p-4 pr-10 w-full rounded-md bg-white text-black shadow shadow-xl mb-4 flex gap-4 items-center`}
                    >
                        <svg width="35px" height="35px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z"
                                fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="32px"
                            />
                            <path
                                d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z"
                                fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="32px"
                            />
                            <path d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z"/>
                        </svg>
                        <p className={"font-bold text-lg"}>{toast.message}</p>
                        <button className={"absolute top-0 right-0 p-2"} onClick={() => {
                            setToasts((toasts) => toasts.filter((toastToFilter) => toastToFilter.id !== toast.id))
                        }}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                stroke="black"
                                strokeWidth="2"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}