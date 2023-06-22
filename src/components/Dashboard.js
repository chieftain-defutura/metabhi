import React, { useState, useCallback, useEffect, useContext } from "react"
import styled from "styled-components"
import CardGrid from "./CardGrid"
import ListGrid from "./ListGrid"
import { ApiContext } from "../ui/contexts/ApiContext"
import { TbMenu2 } from "react-icons/tb"
import { RxDashboard } from "react-icons/rx"
import { AiOutlineFileAdd } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"
import { TbFileImport } from "react-icons/tb"
import { Link } from "react-router-dom"
import configs from "../configs"
import axios from "axios"

const DashboardWrapper = styled.div`
  margin-top: 75px;
`

const WelComeWrapper = styled.div`
  padding: 28px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 180px;
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
`

const WelComeContent = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: ${props => props.theme.lightGray};
  }
`

const MediumBtn = styled.div`
  a {
    color: ${props => props.theme.blue};
    padding: 8px 24px;
    border: 1px solid ${props => props.theme.blue};
    border-radius: 5px;
    font-size: 12px;
    text-decoration: none;
    margin-top: 25px;
    font-weight: 700;
  }
`

const NewFileContent = styled.div``

const NewFile = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 150px;
  background: ${props => props.theme.darkClr};
  border: 1px solid ${props => props.theme.borderStyleClr};
  padding: 15px 25px;
  border-radius: 5px;
  cursor: pointer;
  a {
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.text};
    }
  }
  &:hover {
    background: rgba(0, 43, 255, 0.1);
    border: 1px solid rgba(0, 146, 255, 0.2);
  }
`

const NewFilePara = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: noWrap;

  p {
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.theme.text};
  }
`

const DropDownContent = styled.div`
  h3 {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 12px;
  }
  h4 {
    font-weight: 500;
    font-size: 14px;
    color: ${props => props.theme.gray};
  }
  p {
    font-weight: 500;
    font-size: 14px;
  }
`

const MenuIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

const MenuBox = styled.div`
  border: ${props => props.theme.borderFileClr};
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 5px;
`

const RecentlyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
`

const RETICULUM_SERVER = configs.RETICULUM_SERVER || document.location.hostname

const LOCAL_STORE_KEY = "___hubs_store"

const Dashboard = () => {
  const api = useContext(ApiContext)
  const [gridToggle, setGridToggle] = useState("GridIcon")
  const queryParams = new URLSearchParams(location.search)
  const [mappedProjects, setMappedProjects] = useState([])
  const [hubsToken, setHubsToken] = useState(null)

  const [params, setParams] = useState({
    source: "scene_listings",
    filter: queryParams.get("filter") || "featured-remixable",
    q: queryParams.get("q") || ""
  })

  const updateParams = useCallback(nextParams => {
    const search = new URLSearchParams()

    for (const name in nextParams) {
      if (name === "source" || !nextParams[name]) {
        continue
      }

      search.set(name, nextParams[name])
    }

    history.push(`/projects/create?${search}`)

    setParams(nextParams)
  }, [])

  const sendMagicLink = useCallback(async () => {
    try {
      const response = await axios.get("https://node-reticulum.onrender.com/auth/status", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      })

      const data = response.data
      const email = data.data.email
      const abortController = new AbortController()
      await api.authenticate(email, abortController.signal)
      alert("Magic link has been set to your email")
    } catch (err) {
      console.error("Error while logging in", err)
    }
  }, [api])

  const getToken = useCallback(async () => {
    const value = localStorage.getItem(LOCAL_STORE_KEY)

    if (!value) {
      await sendMagicLink()
      setHubsToken(false)
      throw new Error("Not authenticated")
    }

    const store = JSON.parse(value)

    if (!store || !store.credentials || !store.credentials.token) {
      throw new Error("Not authenticated")
    }

    return store.credentials.token
  }, [sendMagicLink])

  const dataGet = useCallback(async () => {
    try {
      const token = await getToken()

      const headers = {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      }

      const response = await fetch(`https://${RETICULUM_SERVER}/api/v1/projects`, { headers })

      const json = await response.json()

      if (!Array.isArray(json.projects)) {
        throw new Error(`Error fetching projects: ${json.error || "Unknown error."}`)
      }

      const mappedData = json.projects.map(project => {
        return {
          name: project.name,
          thumbnail_url: project.thumbnail_url,
          project_id: project.project_id
        }
      })

      setMappedProjects(mappedData)
    } catch (error) {
      console.error(error)
    }
  }, [getToken])

  useEffect(() => {
    dataGet()
  }, [dataGet])

  useCallback(() => {
    updateParams({
      ...params,
      filter: "remixable",
      q: ""
    })
  }, [updateParams, params])

  return (
    <>
      <DashboardWrapper>
        <WelComeWrapper>
          <WelComeContent>
            <h4>Welcome</h4>
            <p>If You’re new here we recommend going through the tutorial.</p>
            <p>Otherwise, jump right in and create a project from scratch or from one of our templates.</p>
            <div style={{ marginTop: "32px" }}>
              <MediumBtn>
                <Link to="/projects/tutorial">Start Tutorial</Link>
              </MediumBtn>
            </div>
          </WelComeContent>
          <NewFileContent>
            <Link to="/projects/new">
              <NewFile>
                <NewFilePara>
                  <AiOutlineFileAdd size={24} />
                  <p>New file</p>
                </NewFilePara>
                <div>
                  <AiOutlinePlus size={16} />
                </div>
              </NewFile>
            </Link>
            <Link to="/projects/new">
              <NewFile style={{ marginTop: "24px" }}>
                <NewFilePara>
                  <TbFileImport size={24} />
                  <p>Import file</p>
                </NewFilePara>
                <div>
                  <AiOutlinePlus size={18} />
                </div>
              </NewFile>
            </Link>
          </NewFileContent>
        </WelComeWrapper>

        <RecentlyContent>
          <DropDownContent>
            <h3>Recently viewed</h3>
          </DropDownContent>
          <MenuIcons>
            <div onClick={() => setGridToggle("GridIcon")}>
              <MenuBox style={{ border: gridToggle === "GridIcon" ? "1px solid #777777" : "inherit" }}>
                <RxDashboard size={26} />
              </MenuBox>
            </div>
            <div onClick={() => setGridToggle("MenuIcon")}>
              <MenuBox style={{ border: gridToggle !== "MenuIcon" ? "inherit" : "1px solid #777777" }}>
                <TbMenu2 size={26} />
              </MenuBox>
            </div>
          </MenuIcons>
        </RecentlyContent>
      </DashboardWrapper>

      {!JSON.parse(localStorage.getItem("token")) ? (
        "Connect wallet to get the projects"
      ) : JSON.parse(localStorage.getItem("token")) && hubsToken === false ? (
        <button style={{ border: "none", outline: "none", padding: "8px 32px", background: "#0092ff" }} type="button">
          Send Magic Link
        </button>
      ) : (
        <>
          {gridToggle === "GridIcon" && <CardGrid mappedProjects={mappedProjects} />}
          {gridToggle === "MenuIcon" && <ListGrid mappedProjects={mappedProjects} />}
        </>
      )}
    </>
  )
}

export default Dashboard
