import { createContext, ReactNode } from "react";
import { doctors } from "../assets/assets";

interface AppContextValue {
  doctors: typeof doctors;
  currencySymbol: string;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = (props) => {
  const currencySymbol = '$';

  const value: AppContextValue = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider