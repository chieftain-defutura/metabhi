import React, { useState, useEffect, useRef, useCallback, useContext } from "react"
import styled from "styled-components"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { Injected } from "../ui/connectors"
import autoAnimate from "@formkit/auto-animate"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { TiTick } from "react-icons/ti"
import { TbCopy } from "react-icons/tb"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../ui/contexts/UserContext"
import axios from "axios"

const WalletConnectContainer = styled.div`
  position: relative;
`
const WalletButtons = styled.div``

const WalletConnectAddr = styled.div`
  border: 1px solid #0092ff;
  border-radius: 2px;
  padding: 8px 32px;
  color: ${props => props.theme.text};
  // margin-right: 24px;
  cursor: pointer;
`

const WalletConnect = styled.div`
  display: flex;
  justify-content: flex-end;
  background: #002bff;
  padding: 8px 32px;
  border: 1px solid #002bff;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  // margin-right: 24px;
  color: white;
`
const WalletDropDown = styled.div`
  width: 280px;
  height: auto;
  background: ${props => props.theme.dropdown};
  border-radius: 5px;
  position: absolute;
  top: 115%;
  right: 10%;
  box-shadow: ${props => props.theme.boxShadow};
  z-index: 10000;
`
const Address = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 22px;
  border-bottom: 1px solid ${props => props.theme.walletborder};
`

const CopyText = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.theme.text};
  cursor: pointer;
`
const Content = styled.div`
  h3 {
    font-size: 16px;
    padding: 12px 22px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 146, 255, 0.4);
    }
  }
`
const DashboardPara = styled.div`
  margin-top: 10px;
  a {
    text-decoration: none;
  }
  h3 {
    font-size: 14px;
  }
`
const Logout = styled.div`
  margin-bottom: 14px;
  h4 {
    color: #ff6347;
    font-size: 14px;
    padding: 12px 22px;
    cursor: pointer;
    &:hover {
      background: rgba(255, 99, 65, 0.3);
    }
  }
`

const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
`
const WalletCircle = styled.div`
  width: 14px;
  height: 14px;
  background: linear-gradient(90deg, #9d630c 0%, #e818ec 100%);
  border-radius: 50%;
`

const WrongButton = styled.div`
  display: flex;
  justify-content: flex-end;
  background: #ff6347;
  padding: 8px 32px;
  border: 1px solid rgba(255, 99, 65, 0.3);
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
`
const LOCAL_STORE_KEY = "___hubs_store"

const ConnectWalletBtn = () => {
  const { activate, account, deactivate, error } = useWeb3React()
  const [copied, setCopied] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [wrongNetwork, setWrongNetwork] = useState(false)
  const { setUser } = useContext(UserContext)
  // const accounts = useAccount()
  const history = useHistory()

  const WalletToggle = () => {
    setWalletOpen(!walletOpen)
  }

  const parent = useRef(null)

  const handleCopy = () => {
    setCopied(true)
  }

  const handleLogout = () => {
    deactivate()
    localStorage.clear("token")
    history.push("/login")
  }

  useEffect(() => {
    if (error) {
      console.log(error)
      if (error instanceof UnsupportedChainIdError) {
        return setWrongNetwork(true)
      }
    }
    setWrongNetwork(false)
  }, [error])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
    let timer
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false)
      }, 3000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [copied, parent])

  const createData = useCallback(async () => {
    try {
      console.log("account", account)

      if (!account) {
        return
      }

      const storedAccount = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : null
      if (storedAccount && storedAccount !== account) {
        console.log("removed")
        localStorage.removeItem("token")
        localStorage.removeItem(LOCAL_STORE_KEY)
      }

      localStorage.setItem("account", JSON.stringify(account))
      const token = localStorage.getItem("token")

      if (!token) {
        const { data: datas } = await axios.post("https://node-reticulum.onrender.com/auth/login", {
          wallet: account
        })

        if (datas.data === null) {
          history.push("/login")
          return
        }

        localStorage.setItem("token", JSON.stringify(datas.data))

        const response = await axios.get("https://node-reticulum.onrender.com/auth/status", {
          headers: {
            Authorization: `Bearer ${datas.data}`
          }
        })

        setUser(response.data.data)

        if (!localStorage.getItem(LOCAL_STORE_KEY)) {
          history.push("/login")

          return
        }

        console.log("response.data", response.data)
      } else {
        const response = await axios.get("https://node-reticulum.onrender.com/auth/status", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })

        setUser(response.data.data)

        if (!localStorage.getItem(LOCAL_STORE_KEY)) {
          history.push("/login")

          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [account])

  useEffect(() => {
    createData()
  }, [createData])

  const addGatherTestnet = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x153c099c" }]
      })
    } catch (error) {
      console.error("Error activating MetaMask:", error)
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Gather Testnet",
              chainId: "0x153c099c",
              nativeCurrency: {
                name: "GTH",
                decimals: 18,
                symbol: "GTH"
              },
              rpcUrls: ["https://testnet.gather.network"]
            }
          ]
        })
      } catch (error) {
        console.error("Error adding Gather Testnet:", error)
      }
    }
  }

  const displayAccount = account => {
    const slicedAccount = account && account.slice(0, 6) + "..." + account.slice(-6)
    return slicedAccount
  }

  return (
    <div>
      <WalletConnectContainer>
        <WalletButtons>
          {account ? (
            <WalletConnectAddr onClick={WalletToggle}>
              <WalletWrapper>
                <WalletCircle />
                {account.slice(0, 6)}...{account.slice(account.length - 6)}
              </WalletWrapper>
            </WalletConnectAddr>
          ) : wrongNetwork ? (
            <WrongButton onClick={addGatherTestnet}>Wrong Network</WrongButton>
          ) : (
            <div>
              <WalletConnect onClick={() => activate(Injected)}>Connect Wallet</WalletConnect>
            </div>
          )}
        </WalletButtons>

        <div ref={parent} style={{ marginTop: "10px" }}>
          {walletOpen && (
            <WalletDropDown>
              <Address>
                <div>
                  <CopyToClipboard text={account} onCopy={handleCopy}>
                    <CopyText>{displayAccount(account)}</CopyText>
                  </CopyToClipboard>
                </div>
                {!copied && (
                  <CopyToClipboard text={account} onCopy={handleCopy}>
                    <TbCopy size={22} />
                  </CopyToClipboard>
                )}

                {copied ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "2px", cursor: "pointer" }}>
                    <TiTick size={22} />
                  </div>
                ) : null}
              </Address>
              <Content>
                <DashboardPara>
                  <Link to={"/dashboard/recent"}>
                    <h3>Dashboard</h3>
                  </Link>
                </DashboardPara>
                <Logout onClick={WalletToggle}>
                  <h4 onClick={handleLogout}>Logout</h4>
                </Logout>
              </Content>
            </WalletDropDown>
          )}
        </div>
      </WalletConnectContainer>
    </div>
  )
}

export default ConnectWalletBtn
