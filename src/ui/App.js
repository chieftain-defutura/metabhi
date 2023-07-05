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
import { Web3Provider } from "@ethersproject/providers"
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
import { Web3OnboardProvider, init } from "@web3-onboard/react"
import injectedModule from "@web3-onboard/injected-wallets"

const INFURA_KEY = ""
const ethereumRopsten = {
  id: "0x3",
  token: "rETH",
  label: "Ethereum Ropsten",
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`
}

const chains = [ethereumRopsten]
const wallets = [injectedModule()]
const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: "<svg>App Icon</svg>",
    description: "A demo of Web3-Onboard."
  }
})

const EditorContainer = React.lazy(() =>
  import(/* webpackChunkName: "project-page", webpackPrefetch: true */ "./EditorContainer")
)

const PackageKitPage = React.lazy(() =>
  import(/* webpackChunkName: "package-kit-page", webpackPrefetch: true */ "./assets/PackageKitPage")
)

const BaseApp = ({ api }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated())
  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext)

  useEagerConnect()

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
  }, [api])

  const handleAuthenticationChange = isAuthenticated => {
    setIsAuthenticated(isAuthenticated)
  }

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

function getLibrary(provider) {
  return new Web3Provider(provider)
}

const App = ({ api }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeContextProvider>
        <PopupContextProvider>
          <UserContextProvider>
            <TransactionContextProvider>
              <Web3OnboardProvider web3Onboard={web3Onboard}>
                <BaseApp api={api} />
              </Web3OnboardProvider>
            </TransactionContextProvider>
          </UserContextProvider>
        </PopupContextProvider>
      </ThemeContextProvider>
    </Web3ReactProvider>
  )
}

export default App
