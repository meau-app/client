import React, { useState } from 'react'

const AuthContext = React.createContext();

export const AuthProvider: React.FC = ({children}) => {
    const [signed, setSigned] = useState(false);

    return (
        <AuthContext.Provider value={{signed, setSigned}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext)