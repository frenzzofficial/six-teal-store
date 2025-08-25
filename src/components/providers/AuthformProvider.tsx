import React from "react";
import { SchemaKey } from "../context/auth/auth.main";

interface authContextType {
  formType: SchemaKey;
  setFormType: React.Dispatch<React.SetStateAction<SchemaKey>>;
}

interface AuthformProviderProps {
  children: React.ReactNode;
}

const authContext = React.createContext<null | authContextType>(null);
const AuthformProvider = ({ children }: AuthformProviderProps) => {
  const [formType, setFormType] = React.useState<SchemaKey>("login");

  const value = {
    formType: formType,
    setFormType: setFormType,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuthformContext = () => {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error("useAuthformContext must be used within AuthformProvider");
  }
  return context;
};

export default AuthformProvider;
