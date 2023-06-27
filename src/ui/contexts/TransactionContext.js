import React, { useState } from "react"

export const TransactionContext = React.createContext()

export function TransactionContextProvider({ children }) {
  const [loading, setLoading] = useState(false)
  console.log("loading", loading)

  return <TransactionContext.Provider value={{ loading, setLoading }}>{children}</TransactionContext.Provider>
}
