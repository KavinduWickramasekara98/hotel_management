import React from "react";
import Toast from "../components/Toast";


type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
};
type AppContext={
    showToast:(toastMessage:ToastMessage)=>void;
};

const AppContexts=React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
const[toastMessage,setToastMessage]=React.useState<ToastMessage | undefined>(undefined);
    return (
        <AppContexts.Provider value={
            {showToast:(toastMessage)=>{
                setToastMessage(toastMessage);
            }}
            }>
                {toastMessage && (<Toast message={toastMessage.message} type={toastMessage.type} onClose={()=>setToastMessage(undefined)}/>)}
            {children}
        </AppContexts.Provider>
    );
}
export const useAppContext=()=>{
    const context=React.useContext(AppContexts);
    // if(!context){
    //     throw new Error("useAppContext must be used within AppContextProvider");
    // }
    return context as AppContext;
}