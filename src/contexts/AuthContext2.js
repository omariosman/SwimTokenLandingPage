import React, { createContext, useState } from 'react'



//inital values for the context object
const AuthContext = createContext({
  isLoggedIn: false,
  metamaskAccount: null,
  setIsLoggedIn: () => {},
  setMetamaskAccount: () => {},

})

const AuthProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState('');

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    metamaskAccount,
    setMetamaskAccount: setMetamaskAccount,
  }

  return <AuthContext.Provider value={contextValue} {...props} />
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
