import React, { useState, useEffect, useRef, useCallback, useContext } from "react"
import styled from "styled-components"
import autoAnimate from "@formkit/auto-animate"
import { useHistory } from "react-router-dom"
import { UserContext } from "../ui/contexts/UserContext"
import axios from "axios"
import { Web3Button } from "@web3modal/react"
import { useAccount } from "wagmi"
import { toast } from "react-toastify"

const WalletConnectContainer = styled.div`
  position: relative;
`
const LOCAL_STORE_KEY = "___hubs_store"

const ConnectWalletBtn = () => {
  const [copied, setCopied] = useState(false)
  const { setUser, setToken, token, user } = useContext(UserContext)
  const history = useHistory()
  const { address, isConnected, isDisconnected } = useAccount()

  const parent = useRef(null)

  useEffect(() => {
    if (isDisconnected) {
      localStorage.removeItem("token")
      setToken(null)
      setUser(null)
    }
  }, [isDisconnected, history, setToken, setUser])

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
      if (isConnected && address) {
        const storedAccount = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : null
        if (storedAccount && storedAccount !== address) {
          localStorage.removeItem("token")
          setUser(null)
          setToken(null)
          localStorage.removeItem(LOCAL_STORE_KEY)
        }

        localStorage.setItem("account", JSON.stringify(address))
        const loggedInToken = token || localStorage.getItem("token")

        if (!loggedInToken && !user) {
          const { data: datas } = await axios.post("https://node-reticulum.onrender.com/auth/login", {
            wallet: address
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
        } else {
          if (!user) {
            const response = await axios.get("https://node-reticulum.onrender.com/auth/status", {
              headers: {
                Authorization: `Bearer ${JSON.parse(loggedInToken)}`
              }
            })

            setUser(response.data.data)
          }

          if (!localStorage.getItem(LOCAL_STORE_KEY)) {
            history.push("/login")

            return
          }
        }
      }
    } catch (error) {
      if (error?.response?.data?.message === "Invalid auth token provided") {
        setToken(null)
        localStorage.removeItem("token")
        toast.error("Invalid login. Please login again")
        history.push("/login")
        return
      }
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong")
    }
  }, [isConnected, address, history, setUser, setToken, token, user])

  useEffect(() => {
    createData()
  }, [createData])

  return (
    <div>
      <WalletConnectContainer>
        <Web3Button />
      </WalletConnectContainer>
    </div>
  )
}

export default ConnectWalletBtn
