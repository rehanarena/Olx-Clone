import React, { createContext, useState,useContext} from 'react';
import { auth,db,storage } from '../firebase/config'; 
export const AuthContext = createContext(null);
export const FirebaseContext  = createContext({ auth }); 

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FirebaseContext.Provider value={{ auth,db,storage }}>
        {children}
      </FirebaseContext.Provider>
    </AuthContext.Provider>
  );
}

// Custom hook for easier AuthContext consumption
export const useAuth = () => useContext(AuthContext);

// Custom hook for easier FirebaseContext consumption
export const useFirebase = () => useContext(FirebaseContext);
