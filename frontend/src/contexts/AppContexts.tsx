import React from "react";
import { useQuery } from "react-query";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";
import { UserType } from "../../../backend/src/shared/types";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

interface AppContext {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  user: UserType | null;
}

const AppContexts = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastMessage, setToastMessage] = React.useState<
    ToastMessage | undefined
  >(undefined);

  // Fetch user data
  const { data: userData, isError } = useQuery<UserType | null>(
    "fetchUser",
    apiClient.fetchUser,
    {
      retry: false,
      onError: () =>
        setToastMessage({ message: "Failed to fetch user", type: "ERROR" }),
    }
  );

  // Default to null if userData is undefined
  const user = userData ?? null;

  return (
    <AppContexts.Provider
      value={{
        showToast: (toastMessage) => {
          setToastMessage(toastMessage);
        },
        isLoggedIn: !isError && !!user,
        user,
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
};

export const useAppContext = () => {
  const context = React.useContext(AppContexts);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
