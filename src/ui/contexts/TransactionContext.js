import React, { useState } from "react"
import PropTypes from "prop-types"

export const TransactionContext = React.createContext()

export function TransactionContextProvider({ children }) {
  const [loading, setLoading] = useState(false)

  return <TransactionContext.Provider value={{ loading, setLoading }}>{children}</TransactionContext.Provider>
}

TransactionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
