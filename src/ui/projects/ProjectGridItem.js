import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { showMenu } from "../layout/ContextMenu"
import { MenuButton } from "../inputs/Button"
import StylableContextMenuTrigger from "./StylableContextMenuTrigger"
import { EllipsisV } from "styled-icons/fa-solid/EllipsisV"
import PenFile from "../../assets/pen-file-svg.png"
import { AiOutlineStar } from "react-icons/ai"

function collectMenuProps({ project }) {
  return { project }
}

const StyledProjectGridItem = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 220px;
  background-color: ${props => props.theme.darkGray};
  text-decoration: none;
  border: 1px solid ${props => props.theme.borderStyleClr};
  border-radius: 5px;
  position: relative;

  &:hover {
    color: inherit;
    box-shadow: rgba(69, 68, 68, 0.3) 0px 8px 24px;
  }
`

const Pill = styled.i`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 3px 8px;
  background-color: ${props => props.theme.pink};
  color: white;
  border-radius: 6px;
  text-align: center;
`

const StyledContextMenuTrigger = styled(StylableContextMenuTrigger)`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`

const TitleContainer = styled.div`
  // display: flex;
  // align-items: center;
  // height: 50px;
  padding: 12px 15px;

  h3 {
    font-size: 16px;
  }

  button {
    margin-left: auto;

    svg {
      width: 1em;
      height: 1em;
    }
  }
`

const ThumbnailContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: stretch;
  background-color: ${props => props.theme.panel};
  overflow: hidden;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`

const Thumbnail = styled.div`
  display: flex;
  flex: 1;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  background-image: url(${props => props.src});
`

const Col = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${props => props.theme.text2};
  }
`

const Column = styled.div`
  display: flex;
  justify-content: space-between;
`

const Star = styled.div`
  margin-top: 8px;
  img {
    width: 18px;
    height: 18px;
  }
`

const UntitleHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  img {
    width: 24px;
    height: 24px;
  }
  h4 {
    font-size: 14px;
    font-weight: 700;
  }
  p {
    font-size: 12px;
    margin-top: 2px;
    color: ${props => props.theme.lightGray};
    font-weight: 400;
  }
`

const ListGridItem = styled.div`
  padding: 12px 18px;
  margin-top: 12px;
  cursor: pointer;
  transition: all 0.5s ease-out;
  &:hover {
    background: ${props => props.theme.borderStyle};
  }
`

const Image = styled.div`
  img {
    width: 32px;
    height: 28px;
    object-fit: cover;
  }
`

export class ProjectGridItem extends Component {
  static propTypes = {
    contextMenuId: PropTypes.string,
    project: PropTypes.object.isRequired,
    isGrid: PropTypes.bool
  }

  onShowMenu = event => {
    event.preventDefault()
    event.stopPropagation()

    const x = event.clientX || (event.touches && event.touches[0].pageX)
    const y = event.clientY || (event.touches && event.touches[0].pageY)
    showMenu({
      position: { x, y },
      target: event.currentTarget,
      id: this.props.contextMenuId,
      data: {
        project: this.props.project
      }
    })
  }

  render() {
    const { project, contextMenuId, isGrid } = this.props
    const creatorAttribution = project.attributions && project.attributions.creator

    console.log("isGrid", isGrid)

    const content = (
      <>
        <ThumbnailContainer>{project.thumbnail_url && <Thumbnail src={project.thumbnail_url} />}</ThumbnailContainer>
        <TitleContainer>
          <Column>
            <UntitleHead>
              <div>
                <img src={PenFile} alt="PenFile" />
              </div>
              <div>
                <h4>{project.name}</h4>
                {creatorAttribution && <p>{creatorAttribution}</p>}
              </div>
            </UntitleHead>
            <Star>
              <AiOutlineStar size={16} />
            </Star>
          </Column>

          {contextMenuId && (
            <MenuButton onClick={this.onShowMenu}>
              <EllipsisV />
            </MenuButton>
          )}
        </TitleContainer>
      </>
    )

    if (!isGrid) {
      return (
        <Link to={project.url}>
          {/* <ThumbnailContainer>{project.thumbnail_url && <Thumbnail src={project.thumbnail_url} />}</ThumbnailContainer> */}
          <ListGridItem>
            <Column>
              <UntitleHead>
                <Star>
                  <AiOutlineStar size={16} />
                </Star>
                <Image>
                  <img src={project.thumbnail_url} />
                </Image>
                <div>
                  <h4>{project.name}</h4>
                  {creatorAttribution && <p>{creatorAttribution}</p>}
                </div>
              </UntitleHead>
              <div>
                <img src={PenFile} alt="PenFile" width={22} />
              </div>
            </Column>

            {contextMenuId && (
              <MenuButton onClick={this.onShowMenu}>
                <EllipsisV />
              </MenuButton>
            )}
          </ListGridItem>
        </Link>
      )
    }

    if (contextMenuId) {
      return (
        <StyledProjectGridItem to={project.url}>
          <StyledContextMenuTrigger id={contextMenuId} project={project} collect={collectMenuProps} holdToDisplay={-1}>
            {content}
          </StyledContextMenuTrigger>
        </StyledProjectGridItem>
      )
    } else {
      return <StyledProjectGridItem to={project.url}>{content}</StyledProjectGridItem>
    }
  }
}

export function ProjectGridSceneItem({ scene }) {
  const creatorAttribution = scene.attributions && scene.attributions.creator

  return (
    <StyledProjectGridItem to={scene.url}>
      <ThumbnailContainer>{scene.screenshot_url && <Thumbnail src={scene.screenshot_url} />}</ThumbnailContainer>
      <TitleContainer>
        <Col>
          <h3>{scene.name}</h3>
          {creatorAttribution && <p>{creatorAttribution}</p>}
        </Col>
        <Pill>GLB</Pill>
      </TitleContainer>
    </StyledProjectGridItem>
  )
}

ProjectGridSceneItem.propTypes = {
  scene: PropTypes.object.isRequired
}
