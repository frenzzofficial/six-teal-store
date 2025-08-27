"use client";

import { persistStore } from "redux-persist";
import { configureStore, Middleware } from "@reduxjs/toolkit";

import cartReducer from "./features/cartSlice";
import productReducer from "./features/productsSlice";
import { persistedAuthReducer } from "./session/session.auth";

// Optional: Add custom middleware (e.g. logging, analytics)
const customMiddleware: Middleware[] = [];

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuthReducer, // persisted with AES encryption
      cart: cartReducer, // volatile
      products: productReducer, // volatile
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: true,
      }).concat(customMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Create store and persistor instances
export const store = makeStore();
export const persistor = persistStore(store);

// Global types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
