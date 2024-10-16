"use client";
import React, {createContext} from "react";
import { HIT } from "./types";


interface AppContextType {
    results: HIT[];
}

const defaultContext: AppContextType = {
    results: []
};

export const AppContextProvider = createContext<AppContextType>(defaultContext);

export default function AppContext({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <AppContextProvider.Provider value={defaultContext}>
        {children}
      </AppContextProvider.Provider>
    );
  }