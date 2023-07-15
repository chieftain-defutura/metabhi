import React, { Component } from "react"
import PropTypes from "prop-types"
import configs from "../../configs"
import { withApi } from "../contexts/ApiContext"
import { ProjectGridSceneItem } from "./ProjectGridItem"
import NavBar from "../navigation/NavBar"
import { ProjectGridContainer, ProjectGridContent, ErrorMessage } from "./ProjectGrid"
import Footer from "../navigation/Footer"
import LatestUpdate from "../whats-new/LatestUpdate"
import { connectMenu, ContextMenu, MenuItem } from "../layout/ContextMenu"
import styled from "styled-components"

export const ProjectsSection = styled.section`
  // padding-bottom: 100px;
  display: flex;
  flex: ${props => (props.flex === undefined ? 1 : props.flex)};

  // &:first-child {
  //   padding-top: 100px;
  // }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 16px;
  }
`

export const ProjectsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  // margin: 0 auto;
  // max-width: 1200px;
  // padding: 0 20px;
`

// const WelcomeContainer = styled(ProjectsContainer)`
//   align-items: center;

//   & > * {
//     text-align: center;
//   }

//   & > *:not(:first-child) {
//     margin-top: 20px;
//   }

//   h2 {
//     max-width: 480px;
//   }
// `

const ScenesFound = styled.div`
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
`

export const ProjectsHeader = styled.div`
  // margin-bottom: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
`

const ListGridItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 28px;
`

const contextMenuId = "project-menu"

class ProjectsPage extends Component {
  static propTypes = {
    api: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    const isAuthenticated = this.props.api.isAuthenticated()

    this.state = {
      projects: [],
      scenes: [],
      loading: isAuthenticated,
      isAuthenticated,
      error: null
    }
  }

  componentDidMount() {
    document.title = configs.longName()

    // We dont need to load projects if the user isn't logged in
    if (this.state.isAuthenticated) {
      Promise.all([this.props.api.getProjects(), this.props.api.getProjectlessScenes()])
        .then(([projects, scenes]) => {
          this.setState({
            scenes: scenes.map(scene => ({
              ...scene,
              url: `/scenes/${scene.scene_id}`
            })),
            projects: projects.map(project => ({
              ...project,
              url: `/projects/${project.project_id}`
            })),
            loading: false
          })
        })
        .catch(error => {
          console.error(error)

          if (error.response && error.response.status === 401) {
            // User has an invalid auth token. Prompt them to login again.
            this.props.api.logout()
            return this.props.history.push("/login", { from: "/dashboard/recent" })
          }

          this.setState({ error, loading: false })
        })
    }
  }

  onDeleteProject = project => {
    this.props.api
      .deleteProject(project.project_id)
      .then(() => this.setState({ projects: this.state.projects.filter(p => p.project_id !== project.project_id) }))
      .catch(error => this.setState({ error }))
  }

  renderContextMenu = props => {
    return (
      <ContextMenu id={contextMenuId}>
        <MenuItem onClick={e => this.onDeleteProject(props.trigger.project, e)}>Delete Project</MenuItem>
      </ContextMenu>
    )
  }

  ProjectContextMenu = connectMenu(contextMenuId)(this.renderContextMenu)

  render() {
    const { error, loading, projects, scenes, isAuthenticated } = this.state

    const ProjectContextMenu = this.ProjectContextMenu

    return (
      <>
        <NavBar />
        <main>
          {!isAuthenticated || (projects.length === 0 && !loading) ? (
            <ProjectsSection></ProjectsSection>
          ) : (
            <LatestUpdate />
          )}
          <ProjectsSection>
            <ProjectsContainer>
              <ProjectsHeader>
                <h1>Scenes</h1>
              </ProjectsHeader>
              <ProjectGridContainer>
                {/* <ProjectGridHeader>
                  <ProjectGridHeaderRow></ProjectGridHeaderRow>
                  <ProjectGridHeaderRow>
                    <Button as={Link} to="/projects/create">
                      New Project
                    </Button>
                  </ProjectGridHeaderRow>
                </ProjectGridHeader> */}
                <ProjectGridContent>
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                  {!error && (
                    <>
                      <ListGridItem>
                        {scenes?.length === 0 ? (
                          <ScenesFound>
                            <p>No scenes found.</p>
                          </ScenesFound>
                        ) : (
                          scenes?.map(scene => (
                            <ProjectGridSceneItem
                              key={scene.scene_id || scene.id}
                              scene={scene}
                              contextMenuId={contextMenuId}
                            />
                          ))
                        )}
                      </ListGridItem>
                    </>
                  )}
                </ProjectGridContent>
              </ProjectGridContainer>
            </ProjectsContainer>
          </ProjectsSection>
          <ProjectContextMenu />
        </main>
        <Footer />
      </>
    )
  }
}

export default withApi(ProjectsPage)
