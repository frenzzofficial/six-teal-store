"use client";
import { Provider } from "react-redux";
import React, { ReactNode, useRef } from "react";
import { AppStore, persistor, store } from "@/libs/store/store";
import { PersistGate } from "redux-persist/integration/react";
interface StoreProviderProps {
  children: ReactNode;
}
const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
