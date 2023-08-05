import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import configs from "../configs"
import styled from "styled-components"
import Input from "../ui/inputs/Input"
import { useAccount } from "wagmi"
import { UserContext } from "../ui/contexts/UserContext"
import axios from "axios"
import { toast } from "react-toastify"

// import MetaMaskLogo from "../assets/MetaMask-logo.png"
// import ConnectWalletBtn from "../components/ConnectWalletBtn"
// import { PRIVACY, TERMS } from "../constants";

const LOCAL_STORE_KEY = "___hubs_store"

const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 400px;
  align-self: center;

  & > * {
    margin-bottom: 20px;
  }

  img {
    width: 100px;
    margin: 0 auto;
  }

  h3 {
    font-size: 2em;
    color: ${props => props.theme.text};
    margin: 20px 0;
  }

  h4 {
    font-size: 1.1em;
    color: ${props => props.theme.text};
  }
  button {
    border: none;
    outline: none;
    padding: 8px 32px;
    background: #0092ff;
    cursor: pointer;
  }
`

const FormInput = styled(Input)`
  font-size: 20px;
  padding: 8px;
  height: 36px;
`

const ErrorMessage = styled.p`
  color: ${props => props.theme.red};
  margin-bottom: 20px;
`

const LoginForm = ({ error, onSubmit }) => {
  const [email, setEmail] = useState("")
  const { address, isConnected } = useAccount()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      if (localStorage.getItem("token") && !localStorage.getItem(LOCAL_STORE_KEY)) {
        onSubmit(user.email)
      }
    }
  }, [user, onSubmit, isConnected])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!address || !isConnected) {
      toast.error("Please connect your wallet before adding email")
    }

    try {
      await axios.post("https://node-reticulum.onrender.com/auth/register", {
        wallet: address,
        email: email
      })
      onSubmit(email)

      // history.push("/dashboard/recent")
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <h3>Register or Login</h3>
      <h4>Login to save projects and publish scenes{configs.isMoz() && " to Hubs"}.</h4>
      <FormInput
        type="email"
        name="email"
        placeholder={!address || !isConnected ? "Connect wallet to proceed" : "Email"}
        disabled={!address || !isConnected}
        value={email}
        onChange={handleEmailChange}
      />

      <button type="submit" disabled={!address || !isConnected}>
        {!address || !isConnected ? "Connect wallet to proceed" : "Send Magic Link"}
      </button>
    </StyledAuthForm>
  )
}
LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm
