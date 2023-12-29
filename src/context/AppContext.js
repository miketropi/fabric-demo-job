import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppContext_Provider = ({ children }) => {

  const value = {
    version: '1.0.0'
  }

  return <AppContext.Provider value={ value }>
    {children}
  </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext);
}

export { AppContext_Provider, useAppContext }