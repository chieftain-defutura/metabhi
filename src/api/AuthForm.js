import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import configs from "../configs"
import styled from "styled-components"
import Input from "../ui/inputs/Input"
import { useWeb3React } from "@web3-react/core"
import { UserContext } from "../ui/contexts/UserContext"
import axios from "axios"
import { useEffect } from "react"

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

// export default class AuthForm extends Component {
//   static propTypes = {
//     error: PropTypes.string,
//     onSubmit: PropTypes.func.isRequired
//   }

//   state = {
//     email: ""
//   }

//   onSubmit = async e => {
//     e.preventDefault()
//     this.props.onSubmit(this.state.email)
//     console.log("email", this.state.email)
//   }

//   onEmailChange = e => {
//     this.setState({ email: e.target.value })
//   }

//   // handleSubmit = async e => {
//   //   e.preventDefault()

//   //   const { account, history, onSubmit } = this.props
//   //   const { email } = this.state

//   //   if (!account) return

//   //   try {
//   //     if (!localStorage.getItem("token")) {
//   //       const { data } = await axios.post("https://node-reticulum.onrender.com/auth/register", {
//   //         wallet: account,
//   //         email: email
//   //       })
//   //       console.log("datas", data)
//   //     }

//   //     onSubmit(email)
//   //     console.log("email", email)

//   //     history.goBack()
//   //   } catch (error) {
//   //     console.error("An error occurred:", error)
//   //   }
//   // }

//   render() {
//     return (
//       <StyledAuthForm onSubmit={this.onSubmit}>
//         {this.props.error && <ErrorMessage>{this.props.error}</ErrorMessage>}
//         <h3>Register or Login</h3>
//         <h4>Login to save projects and publish scenes{configs.isMoz() && " to Hubs"}.</h4>
//         {/* <img src={MetaMaskLogo} alt="MetaMasklogo" /> */}
//         <FormInput
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={this.state.email}
//           onChange={this.onEmailChange}
//         />
//         {/* <LegalText>
//           By proceeding, you agree to the{" "}
//           <a rel="noopener noreferrer" target="_blank" href={TERMS}>
//             terms of use
//           </a>{" "}
//           and{" "}
//           <a rel="noopener noreferrer" target="_blank" href={PRIVACY}>
//             privacy notice
//           </a>
//           .
//         </LegalText> */}
//         {/* <ConnectWalletBtn /> */}

//         <button type="submit">Send Magic Link</button>
//       </StyledAuthForm>
//     )
//   }
// }

const LoginForm = ({ error, onSubmit }) => {
  const [email, setEmail] = useState("")
  const { account } = useWeb3React()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      if (localStorage.getItem("token") && !localStorage.getItem(LOCAL_STORE_KEY)) {
        onSubmit(user.email)
      }
    }
  }, [user])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!account) return

    try {
      await axios.post("https://node-reticulum.onrender.com/auth/register", {
        wallet: account,
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
      <FormInput type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />

      <button type="submit">Send Magic Link</button>
    </StyledAuthForm>
  )
}
LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm
