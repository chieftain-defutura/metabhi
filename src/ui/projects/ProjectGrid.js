import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ProjectGridItem, ProjectGridSceneItem } from "./ProjectGridItem";
import { Row } from "../layout/Flex";
import StringInput from "../inputs/StringInput";
import { Link } from "react-router-dom";
import PenFile from "../../assets/pen-file-svg.png";
import StarIcon from "../../assets/star.svg";
import Plus from "../../assets/plus.svg";

const ProjectGridItemContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // height: 220px;
  // border-radius: 6px;
  text-decoration: none;
  // background-color: ${props => props.theme.toolbar};
  // justify-content: center;
  // align-items: center;
  // border: 1px solid transparent;


  // &:hover {
  //   color: inherit;
  //   border-color: ${props => props.theme.selected};
  // }

  // svg {
  //   width: 3em;
  //   height: 3em;
  //   margin-bottom: 20px;
  // }
`;

const Box = styled.div`
  background: ${props => props.theme.lightDarkClr};
  border: ${props => props.theme.borderFileClr};
  border-radius: 5px;

  &:hover {
    border-color: ${props => props.theme.gray};
    color: #fff;
  }
`;

const Empty = styled.div`
  background: ${props => props.theme.emptyBoxClr};
  // width: 270.5px;
  height: 160px;
`;

const UnTitleContent = styled.div`
  background: ${props => props.theme.darkGray};
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
`;

const Untitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h4 {
    font-size: 14px;
    margin-bottom: 2px;
  }
  p {
    font-size: 12px;
    color: ${props => props.theme.lightGray};
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

const UntitleProfile = styled.div`
  margin-top: 8px;
  img {
    width: 18px;
    height: 18px;
  }
`;

export function NewProjectGridItem({ path, label }) {
  return (
    <ProjectGridItemContainer as={Link} to={path}>
      {/* <img src={Plus} alt="plus" />
      <h3>{label}</h3> */}
      <Box>
        <Empty></Empty>
        <UnTitleContent>
          <Untitle>
            <div>
              <img src={PenFile} alt="NewFileImg" />
            </div>
            <div>
              <h4 style={{ textDecoration: "none" }}>Untitle</h4>
              <p>Edit time </p>
            </div>
          </Untitle>
          <UntitleProfile>
            <img src={StarIcon} alt="star" />
          </UntitleProfile>
        </UnTitleContent>
      </Box>
    </ProjectGridItemContainer>
  );
}

NewProjectGridItem.propTypes = {
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired
};

NewProjectGridItem.defaultProps = {
  label: "New Project"
};

export function LoadingProjectGridItem() {
  return (
    <ProjectGridItemContainer>
      <h3>Loading...</h3>
    </ProjectGridItemContainer>
  );
}

const StyledProjectGrid = styled.div`
  display: grid;
  grid-gap: 27px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

export function ProjectGrid({ newProjectPath, newProjectLabel, projects, scenes, contextMenuId, loading }) {
  return (
    <StyledProjectGrid>
      {newProjectPath && !loading && <NewProjectGridItem path={newProjectPath} label={newProjectLabel} />}
      {scenes &&
        scenes.map(scene => (
          <ProjectGridSceneItem key={scene.scene_id || scene.id} scene={scene} contextMenuId={contextMenuId} />
        ))}
      {projects.map(project => (
        <ProjectGridItem key={project.project_id || project.id} project={project} contextMenuId={contextMenuId} />
      ))}
      {loading && <LoadingProjectGridItem />}
    </StyledProjectGrid>
  );
}

ProjectGrid.propTypes = {
  contextMenuId: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  scenes: PropTypes.arrayOf(PropTypes.object),
  newProjectPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  newProjectLabel: PropTypes.string,
  loading: PropTypes.bool
};

export const ProjectGridContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  // background-color: ${props => props.theme.panel2};
  border-radius: 3px;
`;

export const ProjectGridContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 40px;
`;

export const ProjectGridHeader = styled.div`
  display: flex;
  background-color: ${props => props.theme.toolbar2};
  border-radius: 3px 3px 0px 0px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const Filter = styled.a`
  font-size: 1.25em;
  cursor: pointer;
  color: ${props => (props.active ? props.theme.blue : props.theme.text)};
`;

export const Separator = styled.div`
  height: 48px;
  width: 1px;
  background-color: ${props => props.theme.border};
`;

export const ProjectGridHeaderRow = styled(Row)`
  align-items: center;

  & > * {
    margin: 0 10px;
  }
`;

export const SearchInput = styled(StringInput)`
  width: auto;
  min-width: 296px;
  height: 44px;
`;

export const CenteredMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled(CenteredMessage)`
  color: ${props => props.theme.red};
`;
