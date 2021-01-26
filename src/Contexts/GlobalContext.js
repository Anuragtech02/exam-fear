import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext([]);

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <GlobalContext.Provider value={{ data }}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
