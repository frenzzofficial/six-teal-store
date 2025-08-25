"use client";

import { configureStore, Middleware } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import productReducer from "./features/productsSlice";

// Optional: Add custom middleware here
const customMiddleware: Middleware[] = [];

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      products: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: true,
      }).concat(customMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });

// Types for global usage
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
