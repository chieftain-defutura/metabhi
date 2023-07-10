import React, { useState } from "react"
import PropTypes from "prop-types"

export const UserContext = React.createContext()

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  console.log("user", user)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
