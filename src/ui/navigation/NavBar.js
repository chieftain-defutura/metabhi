import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Logo from "../../assets/metabhi-logo.png"
import Profile from "../../assets/profile.png"
import { BsBell } from "react-icons/bs"
import MoonIcon from "../../assets/moon.svg"
import { BsSun } from "react-icons/bs"
import { ThemeContext } from "../contexts/ThemeContext"
import SearchFilter from "../../components/SearchFilter"
import ConnectWalletBtn from "../../components/ConnectWalletBtn"
import { networks } from "../../components/ChainList"
import { useChainId, useSwitchNetwork } from "wagmi"

const StyledNavBar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4em;
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
  background: ${props => props.theme.darkClr};
  height: 77px;

  a {
    color: ${props => props.theme.text};
    text-decoration: none;
  }
`

const BorderRight = styled.div`
  height: 60px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  border-right: 1px solid ${props => props.theme.borderStyleClr};
  padding: 6px 20px;
  width: 260px;
  a {
    display: block;
  }

  img {
    width: 65px;
    display: block;
    object-fit: contain;
  }
  h1 {
    font-size: 20px;
  }
`

const ToggleContent = styled.div`
  display: flex;
  align-item: center;
  cursor: pointer;
`

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  padding-right: 24px;

  @media (max-width: 600px) {
    flex: 1;
  }

  img {
    width: 24px;
    height: 24px;
  }
`

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;

  @media (max-width: 600px) {
    flex: 1;
  }
`

const WalletChainDropDown = styled.div``

const ChainDrop = styled.div`
  cursor: pointer;
`

const SelectDropDown = styled.div`
  width: 200px;
  height: auto;
  background: ${props => props.theme.dropdown};
  border-radius: 5px;
  position: absolute;
  top: 88%;
  right: 4%;
  box-shadow: ${props => props.theme.boxShadow};
  z-index: 10000;
`

const DropDownOption = styled.div`
  font-size: 14px;
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 146, 255, 0.4);
  }
`

const NavBar = () => {
  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext)
  const [walletOpen, setWalletOpen] = useState(false)
  const { switchNetwork } = useSwitchNetwork()
  const chainId = useChainId()

  const handleNetworkSwitch = async chainId => {
    switchNetwork(chainId)
  }

  const WalletToggle = () => {
    setWalletOpen(!walletOpen)
  }

  const toggle = theme => {
    localStorage.setItem("theme", JSON.stringify(theme))
    setIsDarkMode(theme === "light" ? false : true)
  }

  const curentChain = networks.find(f => f.chain === chainId)

  return (
    <StyledNavBar>
      <LeftContainer>
        <IconContainer>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <h1>What &rsquo;s New</h1>
          <BorderRight></BorderRight>
        </IconContainer>

        <SearchFilter />
      </LeftContainer>

      <RightContainer>
        {isDarkMode ? (
          <ToggleContent onClick={() => toggle("light")}>
            <img src={MoonIcon} alt="moon" />
          </ToggleContent>
        ) : (
          <ToggleContent onClick={() => toggle("dark")}>
            <BsSun size={24} />
          </ToggleContent>
        )}
        <BsBell size={22} />
        <img alt="" src={Profile} />

        <WalletChainDropDown>
          <ChainDrop onClick={WalletToggle}>{curentChain ? curentChain.chainName : "Wrong Network"}</ChainDrop>
          {walletOpen && (
            <SelectDropDown>
              {networks.map((key, index) => {
                return (
                  <DropDownOption key={index} onClick={() => handleNetworkSwitch(key.chain)}>
                    {key.chainName}
                  </DropDownOption>
                )
              })}
            </SelectDropDown>
          )}
        </WalletChainDropDown>

        <div style={{ marginTop: "10px" }}>
          <ConnectWalletBtn />
        </div>
      </RightContainer>
    </StyledNavBar>
  )
}

export default NavBar
