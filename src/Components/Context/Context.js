import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [apiSearch, setApiSearchData] = useState([]);

  return (
    <AuthContext.Provider value={{setApiSearchData,apiSearch }}>
      {children}
    </AuthContext.Provider>
  );
}