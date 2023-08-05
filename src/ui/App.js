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
import { ThemeProvider } from "styled-components"
import { Column } from "./layout/Flex"
import lightTheme, { darkTheme } from "./theme"
import Layouts from "../components/Layouts"
import CardTemplate from "../components/CardTemplate"
import Dashboard from "../components/Dashboard"
import { PopupContextProvider } from "./contexts/PopupContext"
import { UserContextProvider } from "./contexts/UserContext"
import { TransactionContextProvider } from "./contexts/TransactionContext"
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { configureChains, createClient } from "wagmi"
import { avalancheFuji, shardeumSphinx, polygonMumbai } from "wagmi/chains"
import { Web3Modal } from "@web3modal/react"
import { EthereumClient } from "@web3modal/ethereum"
import { WagmiConfig } from "wagmi"
import { fiveIre, gather, moonbaseAlpha, telos } from "../components/ChainList"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const chains = [avalancheFuji, gather, telos, moonbaseAlpha, fiveIre, shardeumSphinx, polygonMumbai]

export const projectId = "ae701bd4d326c38547d537ac81c3461b"

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})

const EditorContainer = React.lazy(() =>
  import(/* webpackChunkName: "project-page", webpackPrefetch: true */ "./EditorContainer")
)

const PackageKitPage = React.lazy(() =>
  import(/* webpackChunkName: "package-kit-page", webpackPrefetch: true */ "./assets/PackageKitPage")
)

const BaseApp = ({ api }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(api?.isAuthenticated())
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

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
                  <Route path="/projects/:projectId" component={EditorContainer} />
                  <Route path="/kits/package" component={PackageKitPage} />
                  <Route path="/scenes/:sceneId" component={CreateScenePage} />
                  <Route>
                    <Layouts>
                      <Switch>
                        <Route path="/projects" exact component={ProjectsPage} />
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

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ThemeProvider>
        </AuthContextProvider>
      </ApiContextProvider>
    </>
  )
}

const ethereumClient = new EthereumClient(wagmiClient, chains)

const App = ({ api }) => {
  return (
    <>
      <ThemeContextProvider>
        <PopupContextProvider>
          <UserContextProvider>
            <TransactionContextProvider>
              <WagmiConfig client={wagmiClient}>
                <BaseApp api={api} />
              </WagmiConfig>
            </TransactionContextProvider>
          </UserContextProvider>
        </PopupContextProvider>
      </ThemeContextProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App
