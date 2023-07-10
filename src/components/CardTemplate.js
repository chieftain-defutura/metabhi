import React, { useState, useCallback, useEffect } from "react"
import { ProjectGridContainer, ProjectGridContent, ErrorMessage, ProjectGrid, Filter } from "../ui/projects/ProjectGrid"
import ScrollToTop from "../ui/router/ScrollToTop"
import InfiniteScroll from "react-infinite-scroller"
// import usePaginatedSearch from "../ui/projects/usePaginatedSearch"
// import { ApiContext } from "../ui/contexts/ApiContext"
import styled from "styled-components"
import { AiOutlinePlus } from "react-icons/ai"
import { TbMenu2 } from "react-icons/tb"
import { RxDashboard } from "react-icons/rx"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { AiOutlineFileAdd } from "react-icons/ai"
import { TbFileImport } from "react-icons/tb"
import axios from "axios"
import configs from "../configs"

const ProjectTemplateCards = styled.div`
  padding-bottom: 32px;
`
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
  img {
    width: 28px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.theme.text};
  }
`

// const Recently = styled.div`
//   padding: 22px 40px;
//   border-bottom: 1px solid ${props => props.theme.borderStyleClr};
//   height: 90px;

//   h3 {
//     font-weight: 500;
//     font-size: 14px;
//     margin-bottom: 12px;
//   }
// `
// const DropDown = styled.div`
//   // display: flex;
//   // align-items: center;
//   // gap: 12px;

//   h4 {
//     color: ${props => props.theme.gray};
//     font-weight: 500;
//     font-size: 14px;
//   }
// `
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
  img {
    cursor: pointer;
    width: 32px;
    height: 32px;
  }
`

// const ToolbarInputGroup = styled.div`
//   margin-top: 20px;

//   select {
//     border: none;
//     outline: none;
//     background: transparent;
//     color: ${props => props.theme.text};
//     width: 115px;
//   }
//   option {
//     background: #000000;
//     color: #fff;
//     font-size: 17px;
//   }
// `
const MenuBox = styled.div`
  border: ${props => props.theme.borderFileClr};
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 5px;
  cursor: pointer;
`

const RecentlyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
`

const RETICULUM_SERVER = configs.RETICULUM_SERVER || document.location.hostname

console.log("Reticulum", RETICULUM_SERVER)

export default function CardTemplate({ history, location }) {
  // const api = useContext(ApiContext)
  const [isGrid, setIsGrid] = useState(true)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState()
  const [newEntries, setNewEntries] = useState([])

  const queryParams = new URLSearchParams(location.search)

  const [params, setParams] = useState({
    source: "scene_listings",
    filter: queryParams.get("filter") || "featured-remixable",
    q: queryParams.get("q") || ""
  })

  const handleGetData = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("https://dev.reticulum.io/api/v1/media/search", { params: params })
      console.log(data)

      setHasMore(Boolean(data.meta.next_cursor))
      setNextCursor(data.meta.next_cursor)

      if (params.filter === "featured-remixable") {
        setNewEntries(e => [
          ...e,
          ...data.entries.map(result => ({
            ...result,
            url: `/dashboard/template?sceneId=${result.id}`,
            thumbnail_url: result && result.images && result.images.preview && result.images.preview.url
          }))
        ])
      } else if (hasMore) {
        setNewEntries(e => {
          const newData = [
            ...e,
            ...data.entries.map(result => ({
              ...result,
              url: `/dashboard/template?sceneId=${result.id}`,
              thumbnail_url: result && result.images && result.images.preview && result.images.preview.url
            }))
          ]

          // Remove duplicates
          const uniqueData = newData.filter((entry, index) => {
            const firstIndex = newData.findIndex(e => e.id === entry.id)
            return firstIndex === index
          })

          return uniqueData
        })
      } else {
        setNewEntries([
          ...data.entries.map(result => ({
            ...result,
            url: `/dashboard/template?sceneId=${result.id}`,
            thumbnail_url: result && result.images && result.images.preview && result.images.preview.url
          }))
        ])
      }
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [params, hasMore])

  useEffect(() => {
    handleGetData()
  }, [handleGetData])

  const updateParams = useCallback(
    nextParams => {
      const search = new URLSearchParams()

      for (const name in nextParams) {
        if (name === "source" || !nextParams[name]) {
          continue
        }

        search.set(name, nextParams[name])
      }

      history.push(`/dashboard/template?${search}`)

      setParams(nextParams)
    },
    [history]
  )

  // const onChangeQuery = useCallback(
  //   value => {
  //     updateParams({
  //       source: "scene_listings",
  //       filter: "remixable",
  //       q: value
  //     })
  //   },
  //   [updateParams]
  // )

  // const onSetFeaturedRemixable = useCallback(() => {
  //   updateParams({
  //     ...params,
  //     filter: "featured-remixable",
  //     q: ""
  //   })
  // }, [updateParams, params])

  const onSetAll = useCallback(() => {
    updateParams({
      ...params,
      filter: "remixable",
      q: ""
    })
  }, [updateParams, params])

  const onSelectScene = useCallback(
    scene => {
      const search = new URLSearchParams()
      search.set("sceneId", scene.id)
      history.push(`/dashboard/template?${search}`)
    },
    [history]
  )

  const loadMore = () => {
    console.log("loadmore", hasMore)
    if (hasMore) {
      updateParams({
        ...params,
        filter: "remixable",
        q: "",
        cursor: nextCursor
      })
    }
  }

  // const { loading, error, entries, hasMore, loadMore } = usePaginatedSearch(`${api.apiURL}/api/v1/media/search`, params)

  // const filteredEntries = newEntries.map(result => ({
  //   ...result,
  //   url: `/dashboard/template?sceneId=${result.id}`,
  //   thumbnail_url: result && result.images && result.images.preview && result.images.preview.url
  // }))
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
                  <AiOutlinePlus size={22} />
                </div>
              </NewFile>
            </Link>
          </NewFileContent>
        </WelComeWrapper>

        <RecentlyContent>
          <DropDownContent>
            <h3>Recently viewed</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h4>Filter:</h4>
              <Filter onClick={onSetAll} active={params.filter === "remixable"}>
                <p style={{ fontSize: "12px" }}>All</p>
              </Filter>
            </div>
          </DropDownContent>
          <MenuIcons>
            <div onClick={() => setIsGrid(true)}>
              <MenuBox style={{ border: isGrid ? "1px solid #777777" : "inherit" }}>
                <RxDashboard size={26} />
              </MenuBox>
            </div>
            <div onClick={() => setIsGrid(false)}>
              <MenuBox style={{ border: !isGrid ? "1px solid #777777" : "inherit" }}>
                <TbMenu2 size={26} />
              </MenuBox>
            </div>
          </MenuIcons>
        </RecentlyContent>
      </DashboardWrapper>

      <div>
        <ProjectGridContainer>
          <ProjectTemplateCards>
            <ProjectGridContent>
              <ScrollToTop />
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
              {!error && (
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={hasMore}
                  threshold={100}
                  useWindow={true}
                >
                  <ProjectGrid
                    projects={newEntries}
                    newProjectPath="/dashboard/template"
                    newProjectLabel="New Empty Project"
                    onSelectProject={onSelectScene}
                    loading={loading}
                    isGrid={isGrid}
                  />
                </InfiniteScroll>
              )}
            </ProjectGridContent>
          </ProjectTemplateCards>
        </ProjectGridContainer>
      </div>
    </>
  )
}

CardTemplate.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}
