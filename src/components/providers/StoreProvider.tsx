"use client";
import { Provider } from "react-redux";
import React, { ReactNode, useRef } from "react";
import { AppStore, makeStore } from "@/libs/store/store";

interface StoreProviderProps {
  children: ReactNode;
}
const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
