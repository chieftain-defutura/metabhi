import React, { useContext } from "react"
import MoonIcon from "../assets/moon.svg"
import { BsSun } from "react-icons/bs"
import styled from "styled-components"
import { ThemeContext } from "../ui/contexts/ThemeContext"

const ToggleContent = styled.div``

const DarkModeLightMode = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

  const toggle = theme => {
    localStorage.setItem("theme", JSON.stringify(theme))
    setIsDarkMode(theme === "light" ? false : true)
  }

  return (
    <>
      {isDarkMode ? (
        <ToggleContent onClick={() => toggle("light")}>
          <img src={MoonIcon} alt="moon" />
        </ToggleContent>
      ) : (
        <ToggleContent onClick={() => toggle("dark")}>
          <BsSun size={24} />
        </ToggleContent>
      )}
    </>
  )
}

export default DarkModeLightMode
