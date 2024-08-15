import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface Props {
    children: React.ReactNode;
 }

interface pushContentProps {
    push: boolean;
    setPush: Dispatch<SetStateAction<boolean>>;
}


export const PushContext = createContext<pushContentProps>({
    push: false,
    setPush: () => {}
})

export const VerticalSidebarProvider = ({children} : Props) => {
    const [push, setPush] = useState(false)


    return (
        <PushContext.Provider value={{push, setPush}}>
            {children}
        </PushContext.Provider>
    )
}

export const usePushContent = () => useContext(PushContext);
