import React from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
};
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContexts=React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
    const[toastMessage,setToastMessage]=React.useState<ToastMessage | undefined>(undefined);

    //remove after logout invalidateQueries
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
      retry: false,
    });
   
    return (
      <AppContexts.Provider
        value={{
          showToast: (toastMessage) => {
            setToastMessage(toastMessage);
          },
          isLoggedIn: !isError,
        }}
      >
        {toastMessage && (
          <Toast
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={() => setToastMessage(undefined)}
          />
        )}
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