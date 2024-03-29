import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ProjectGridItem, ProjectGridSceneItem } from "./ProjectGridItem"
import { Row } from "../layout/Flex"
import StringInput from "../inputs/StringInput"

const ProjectGridItemContainer = styled.div`
  text-decoration: none;
`

export function NewProjectGridItem() {
  return <></>
}

NewProjectGridItem.propTypes = {
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired
}

NewProjectGridItem.defaultProps = {
  label: "New Project"
}

export function LoadingProjectGridItem() {
  return (
    <ProjectGridItemContainer>
      <h3>Loading...</h3>
    </ProjectGridItemContainer>
  )
}

const StyledProjectGrid = styled.div`
  display: grid;
  grid-gap: 27px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`

const ListGridItem = styled.div`
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  // gap: 28px;
`

const ScenesFound = styled.div`
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
`

export function ProjectGrid({ newProjectPath, newProjectLabel, projects, scenes, contextMenuId, loading, isGrid }) {
  console.log(projects)
  if (!isGrid) {
    return (
      <ListGridItem>
        {newProjectPath && !loading && <NewProjectGridItem path={newProjectPath} label={newProjectLabel} />}
        {scenes?.length === 0 ? (
          <ScenesFound>
            <p>No scenes found.</p>
          </ScenesFound>
        ) : (
          scenes?.map(scene => (
            <ProjectGridSceneItem key={scene.scene_id || scene.id} scene={scene} contextMenuId={contextMenuId} />
          ))
        )}
        {/* {scenes &&
          scenes.map(scene => (
            <ProjectGridSceneItem key={scene.scene_id || scene.id} scene={scene} contextMenuId={contextMenuId} />
          ))} */}
        {projects.map(project => (
          <ProjectGridItem
            key={project.project_id || project.id}
            project={project}
            contextMenuId={contextMenuId}
            isGrid={isGrid}
          />
        ))}
        {loading && <LoadingProjectGridItem />}
      </ListGridItem>
    )
  }
  return (
    <StyledProjectGrid>
      {newProjectPath && !loading && <NewProjectGridItem path={newProjectPath} label={newProjectLabel} />}
      {scenes &&
        scenes.map(scene => (
          <ProjectGridSceneItem key={scene.scene_id || scene.id} scene={scene} contextMenuId={contextMenuId} />
        ))}
      {projects.map(project => (
        <ProjectGridItem
          key={project.project_id || project.id}
          project={project}
          contextMenuId={contextMenuId}
          isGrid={isGrid}
        />
      ))}
      {loading && <LoadingProjectGridItem />}
    </StyledProjectGrid>
  )
}

ProjectGrid.propTypes = {
  contextMenuId: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  scenes: PropTypes.arrayOf(PropTypes.object),
  newProjectPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  newProjectLabel: PropTypes.string,
  loading: PropTypes.bool,
  isGrid: PropTypes.isGrid
}

export const ProjectGridContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  // background-color: ${props => props.theme.panel2};
  border-radius: 3px;
`

export const ProjectGridContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 40px;
`

export const ProjectGridHeader = styled.div`
  display: flex;
  background-color: ${props => props.theme.toolbar2};
  border-radius: 3px 3px 0px 0px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

export const Filter = styled.a`
  font-size: 14px;
  cursor: pointer;
  color: ${props => (props.active ? props.theme.blue : props.theme.text)};
`

export const Separator = styled.div`
  height: 48px;
  width: 1px;
  background-color: ${props => props.theme.border};
`

export const ProjectGridHeaderRow = styled(Row)`
  align-items: center;

  & > * {
    margin: 0 10px;
  }
`

export const SearchInput = styled(StringInput)`
  width: auto;
  min-width: 296px;
  height: 44px;
`

export const CenteredMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ErrorMessage = styled(CenteredMessage)`
  color: ${props => props.theme.red};
`
