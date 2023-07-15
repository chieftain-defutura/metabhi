import React, { useState } from "react"
import PropTypes from "prop-types"

export const ThemeContext = React.createContext({ isDarkMode: false, setIsDarkMode: () => {} })

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme")
    if (!theme) return false
    if (JSON.parse(theme) === "light") return false
    return true
  })

  return <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
