import React, { useState } from "react"
import PropTypes from "prop-types"

export const UserContext = React.createContext()

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage?.getItem("token") || null)

  return <UserContext.Provider value={{ user, setUser, token, setToken }}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
