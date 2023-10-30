import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [apiSearch, setApiSearchData] = useState([]);
  const [postUserId, setPostuserId] = useState("");

  return (
    <AuthContext.Provider value={{setApiSearchData,apiSearch,postUserId, setPostuserId }}>
      {children}
    </AuthContext.Provider>
  );
}