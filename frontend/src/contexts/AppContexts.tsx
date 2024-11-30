import React from "react";


type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
};
type AppContext={
    showToast:(toastMessage:ToastMessage)=>void;
};

const AppContexts=React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
    // const showToast=(toastMessage:ToastMessage)=>{
    //     alert(toastMessage.message);
    // };
    return (
        <AppContexts.Provider value={
            {showToast:(toastMessage)=>{
                console.log(toastMessage);
            }}
            }>
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