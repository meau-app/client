import React, { useEffect, useState } from 'react';
import Authentication from './src/service/authentication/authenticate';

const AuthContext = React.createContext();

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState(false);

  async function initialize() {
    try {
      let result = await Authentication.check();
      if (result) {
        setSigned(true);
      }
    } catch (e) {
      // ignore
    }
  }

  useEffect(initialize, []);

  return (
    <AuthContext.Provider value={{ signed, setSigned }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
