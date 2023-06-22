import React, { useState, useEffect, useCallback, useContext } from "react"
import styled from "styled-components"
import SearchIcon from "../assets/search-icon.png"
import configs from "../configs"
import { Link } from "react-router-dom"
import usePaginatedSearch from "../ui/projects/usePaginatedSearch"
import { ApiContext } from "../ui/contexts/ApiContext"
import { useLocation, useHistory } from "react-router-dom"

const SearchInput = styled.div`
  width: 100%;
  input {
    border: none;
    outline: none;
    background: transparent;
    color: ${props => props.theme.text};
    width: 100%;
  }
`

const SearchContainer = styled.div`
  position: relative;
`

const DropDown = styled.div`
  width: 310px;
  height: 250px;
  background: ${props => props.theme.black};
  color: ${props => props.theme.text};
  position: absolute;
  top: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.borderStyleClr};
  }

  li {
    color: ${props => props.theme.text};
    font-size: 14px;
    cursor: pointer;
  }
  p {
    color: ${props => props.theme.lightGray};
    font-size: 14px;
    margin-top: 6px;
  }
`

const SearchInner = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.theme.black};
  border: 1px solid rgba(119, 119, 119, 0.3);
  border-radius: 5px;
  padding: 14px 16px;
  width: 310px;
`

const LoadingContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const SearchContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  transition: all 0.5s ease-out;
  &:hover {
    background: ${props => props.theme.borderStyle};
  }
  img {
    width: 32px;
    height: 28px;
    object-fit: cover;
  }
`

const RETICULUM_SERVER = configs.RETICULUM_SERVER || document.location.hostname

const LOCAL_STORE_KEY = "___hubs_store"

const SearchFilter = () => {
  const [value, setValue] = useState("")
  const [openDropDown, setOpenDropDown] = useState(false)
  const [mappedProjects, setMappedProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const history = useHistory()

  const api = useContext(ApiContext)

  const queryParams = new URLSearchParams(location.search)

  const [params, setParams] = useState({
    source: "scene_listings",
    filter: queryParams.get("filter") || "featured-remixable",
    q: queryParams.get("q") || ""
  })

  console.log("mappedProjects", mappedProjects)

  const getToken = () => {
    const value = localStorage.getItem(LOCAL_STORE_KEY)

    if (!value) {
      throw new Error("Not authenticated")
    }

    const store = JSON.parse(value)

    if (!store || !store.credentials || !store.credentials.token) {
      throw new Error("Not authenticated")
    }

    return store.credentials.token
  }

  const dataGet = async () => {
    try {
      setLoading(true)

      const token = getToken()

      console.log("token", token)

      const headers = {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      }

      console.log("RETICULUM_SERVER", RETICULUM_SERVER)

      const response = await fetch(`https://${RETICULUM_SERVER}/api/v1/projects`, { headers })

      console.log("response", response)

      const json = await response.json()

      if (!Array.isArray(json.projects)) {
        throw new Error(`Error fetching projects: ${json.error || "Unknown error."}`)
      }

      console.log("json.projects", json.projects)

      const mappedData = json.projects.map(project => {
        console.log("Project Name:", project.name)
        console.log("Thumbnail url:", project.thumbnail_url)
        console.log("Project_id:", project.project_id)

        return {
          name: project.name,
          thumbnail_url: project.thumbnail_url,
          project_id: project.project_id
        }
      })

      console.log("mappedData", mappedData)

      setMappedProjects(mappedData)

      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (openDropDown) {
      dataGet()
    }
  }, [openDropDown])

  const onSearch = searchTerm => {
    setValue(searchTerm)
  }

  const updateParams = useCallback(
    nextParams => {
      const search = new URLSearchParams()

      for (const name in nextParams) {
        if (name === "source" || !nextParams[name]) {
          continue
        }

        search.set(name, nextParams[name])
      }

      setParams(nextParams)
    },
    [history]
  )

  const onChangeQuery = useCallback(
    value => {
      updateParams({
        source: "scene_listings",
        filter: "remixable",
        q: value.target.value
      })
    },
    [updateParams, params]
  )

  // const onSetFeaturedRemixable = useCallback(() => {
  //   updateParams({
  //     ...params,
  //     filter: "featured-remixable",
  //     q: ""
  //   })
  // }, [updateParams, params])

  // const onSetAll = useCallback(() => {
  //   updateParams({
  //     ...params,
  //     filter: "remixable",
  //     q: ""
  //   })
  // }, [updateParams, params])

  // const onSelectScene = useCallback(
  //   scene => {
  //     const search = new URLSearchParams()
  //     search.set("sceneId", scene.id)
  //     history.push(`/projects/new?${search}`)
  //   },
  //   [history]
  // )
  const { entries } = usePaginatedSearch(`${api.apiURL}/api/v1/media/search`, params)

  const filteredEntries = entries.map(result => ({
    ...result,
    url: `/projects/new?sceneId=${result.id}`,
    thumbnail_url: result && result.images && result.images.preview && result.images.preview.url
  }))

  console.log("filteredEntries", filteredEntries)

  return (
    <SearchContainer>
      <SearchInner onClick={() => setOpenDropDown(o => !o)}>
        <img src={SearchIcon} alt="search" onClick={() => onSearch(value)} />

        <SearchInput>
          <input type="search" value={params.q} onChange={onChangeQuery} placeholder="Search Files" />
        </SearchInput>
      </SearchInner>
      <div>
        {openDropDown && (
          <DropDown onClick={e => e.stopPropagation()}>
            {loading ? (
              <LoadingContent>
                <p>Loading...</p>
              </LoadingContent>
            ) : (
              [...filteredEntries, ...mappedProjects].map((item, index) => (
                <Link to={`/projects/${item.id || item.project_id}`} key={index}>
                  <SearchContent>
                    <div>
                      <img src={item.thumbnail_url} alt="img_url" />
                    </div>
                    <ul onClick={() => onSearch(item.name)}>
                      <li>{item.name}</li>
                    </ul>
                  </SearchContent>
                </Link>
              ))
            )}
          </DropDown>
        )}
      </div>
    </SearchContainer>
  )
}

export default SearchFilter
