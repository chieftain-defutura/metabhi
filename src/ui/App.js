/* eslint-disable react/prop-types */
import React, { useState, useEffect, Suspense, useContext } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import configs from "../configs"
import GlobalStyle from "./GlobalStyle"
import Loading from "./Loading"
import Error from "./Error"
import { ApiContextProvider } from "./contexts/ApiContext"
import { AuthContextProvider } from "./contexts/AuthContext"
import ThemeContextProvider, { ThemeContext } from "./contexts/ThemeContext"
import RedirectRoute from "./router/RedirectRoute"
import { Telemetry } from "../telemetry"
import LandingPage from "./landing/LandingPage"
import WhatsNewPage from "./whats-new/WhatsNewPage"
import LoginPage from "./auth/LoginPage"
import LogoutPage from "./auth/LogoutPage"
import ProjectsPage from "./projects/ProjectsPage"
import CreateProjectPage from "./projects/CreateProjectPage"
import CreateScenePage from "./projects/CreateScenePage"
import { Web3ReactProvider } from "@web3-react/core"
import { ThemeProvider } from "styled-components"
import { Column } from "./layout/Flex"
import lightTheme, { darkTheme } from "./theme"
import Layouts from "../components/Layouts"
import CardTemplate from "../components/CardTemplate"
import Dashboard from "../components/Dashboard"
import { useEagerConnect } from "./useEagerConnect"
import { PopupContextProvider } from "./contexts/PopupContext"
import { UserContextProvider } from "./contexts/UserContext"
import { TransactionContextProvider } from "./contexts/TransactionContext"
import { Web3Provider } from "@ethersproject/providers"
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { configureChains, createClient } from "wagmi"
import { avalancheFuji } from "wagmi/chains"
import { Web3Modal } from "@web3modal/react"
import { EthereumClient } from "@web3modal/ethereum"
import { WagmiConfig } from "wagmi"
import { fiveIre, gather, moonbaseAlpha, telos } from "../components/ChainList"

export const chains = [avalancheFuji, gather, telos, moonbaseAlpha, fiveIre]

export const projectId = "ae701bd4d326c38547d537ac81c3461b"

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})

///

// import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"

const EditorContainer = React.lazy(() =>
  import(/* webpackChunkName: "project-page", webpackPrefetch: true */ "./EditorContainer")
)

const PackageKitPage = React.lazy(() =>
  import(/* webpackChunkName: "package-kit-page", webpackPrefetch: true */ "./assets/PackageKitPage")
)

const BaseApp = ({ api }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated())
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

  useEagerConnect()

  const handleAuthenticationChange = isAuthenticated => {
    setIsAuthenticated(isAuthenticated)
  }

  useEffect(() => {
    api.addListener("authentication-changed", handleAuthenticationChange)
    const storedTheme = localStorage.getItem("theme")
    if (!storedTheme) {
      setIsDarkMode(false)
    } else if (JSON.parse(storedTheme) === "light") {
      setIsDarkMode(false)
    } else {
      setIsDarkMode(true)
    }

    return () => {
      api.removeListener("authentication-changed", handleAuthenticationChange)
    }
  }, [api, setIsDarkMode])

  return (
    <>
      <ApiContextProvider value={api}>
        <AuthContextProvider value={isAuthenticated}>
          <ThemeProvider theme={!isDarkMode ? darkTheme : lightTheme}>
            <Router basename={process.env.ROUTER_BASE_PATH}>
              <GlobalStyle />
              <Column as={Suspense} fallback={<Loading message="Loading..." fullScreen />}>
                <Switch>
                  {configs.isMoz() && <Route path="/" exact component={LandingPage} />}
                  {!configs.isMoz() && <RedirectRoute path="/" exact to="/dashboard/recent" />}
                  <Route path="/whats-new" exact component={WhatsNewPage} />
                  <RedirectRoute path="/new" exact to="/dashboard/recent" />
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/logout" exact component={LogoutPage} />
                  <Route path="/projects/create" exact component={CreateProjectPage} />
                  <RedirectRoute path="/projects/templates" exact to="/projects/create" />
                  <Route path="/projects" exact component={ProjectsPage} />
                  <Route path="/projects/:projectId" component={EditorContainer} />
                  <Route path="/kits/package" component={PackageKitPage} />
                  <Route path="/scenes/:sceneId" component={CreateScenePage} />
                  <Route>
                    <Layouts>
                      <Switch>
                        <Route exact path="/dashboard/recent" component={Dashboard} />
                        <Route path="/dashboard/template" component={CardTemplate} />
                      </Switch>
                    </Layouts>
                  </Route>

                  <Route render={() => <Error message="Page not found." />} />
                  {/* <Route path="/popup" component={ElementPopap} /> */}
                </Switch>
              </Column>
              <Telemetry />
            </Router>
          </ThemeProvider>
        </AuthContextProvider>
      </ApiContextProvider>
    </>
  )
}

// const projectId = "9c7d246e2cd8e826a8cc11a9eeb49f1b"

// const { chains, provider } = configureChains([mainnet, polygon, optimism, gather], [publicProvider()])

// const { connectors } = getDefaultWallets({
//   appName: "metabhi",
//   projectId,
//   chains
// })

// const wagmiClient = createConfig({
//   autoConnect: true,
//   provider,
//   connectors
// })

// const { chains, provider } = configureChains(
//   [chain.mainnet, chain.polygonMumbai, chain.goerli],
//   [alchemyProvider({ apiKey: "wKstaSi0DT5-HkVuN4qFlq5f_V1R7RBZ" })],
//   [publicProvider()]
// )

// const { connectors } = getDefaultWallets({
//   appName: "Test web3 app",
//   chains
// })

// const wagmiClient = createClient({
//   autoConnect: true,
//   provider,
//   connectors
// })

///

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [chain.mainnet],
//   [alchemyProvider({ apiKey: "wKstaSi0DT5-HkVuN4qFlq5f_V1R7RBZ" }), publicProvider()]
// )

// const config = createClient({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName: "wagmi"
//       }
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         projectId: "ae701bd4d326c38547d537ac81c3461b"
//       }
//     }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: "Injected",
//         shimDisconnect: true
//       }
//     })
//   ],
//   publicClient,
//   webSocketPublicClient
// })
///

function getLibrary(provider) {
  return new Web3Provider(provider)
}

// const { chains, provider, webSocketProvider } = configureChains([chain.goerli], [publicProvider()])

// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
//   connectors: [new InjectedConnector()]
// })

const ethereumClient = new EthereumClient(wagmiClient, chains)

const App = ({ api }) => {
  return (
    // eslint-disable-next-line no-undef
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeContextProvider>
        <PopupContextProvider>
          <UserContextProvider>
            <TransactionContextProvider>
              <WagmiConfig client={wagmiClient}>
                {/* <RainbowKitProvider chains={chains}> */}
                <BaseApp api={api} />
                {/* </RainbowKitProvider> */}
              </WagmiConfig>
            </TransactionContextProvider>
          </UserContextProvider>
        </PopupContextProvider>
      </ThemeContextProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Web3ReactProvider>
  )
}

export default App
