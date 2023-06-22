import React from "react"
import styled from "styled-components"
import { AiOutlineStar } from "react-icons/ai"
import { Link } from "react-router-dom"
import PenFile from "../assets/pen-file-svg.png"

const ListGridWrapper = styled.div`
  margin: 24px 40px;
`

const ListGridHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 120px;
  h5 {
    font-size: 16px;
    margin-bottom: 24px;
    font-weight: 700;
  }
`

const ListGridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  margin-top: 12px;
  cursor: pointer;
  transition: all 0.5s ease-out;
  &:hover {
    background: ${props => props.theme.borderStyle};
  }
`

const ListGridContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.text};
  }
`

const Profile = styled.div`
  img {
    width: 32px;
    height: 28px;
    object-fit: cover;
  }
`

const ListGrid = ({ mappedProjects }) => {
  return (
    <ListGridWrapper>
      <ListGridHead>
        <h5>Files name</h5>
        <h5>Last viewed</h5>
      </ListGridHead>
      {mappedProjects.map((f, index) => {
        return (
          <Link to={`/projects/${f.project_id}`} key={index}>
            <ListGridContainer>
              <ListGridContent>
                <AiOutlineStar size={18} />
                <Profile>
                  <img src={f.thumbnail_url} alt="img-url" />
                </Profile>
                <p>{f.name}</p>
              </ListGridContent>
              <div>
                <img src={PenFile} alt="PenFile" width={22} />
              </div>
            </ListGridContainer>
          </Link>
        )
      })}
    </ListGridWrapper>
  )
}

export default ListGrid
