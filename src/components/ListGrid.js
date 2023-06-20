/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { AiOutlineStar } from "react-icons/ai"

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
  padding: 12px 0;
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
    font-weight: 400;
    color: ${props => props.theme.lightGray};
  }
`

const Profile = styled.div`
  width: 24px;
  height: 24px;
  background: ${props => props.theme.text};
  border-radius: 2px;
`

const Minutes = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  padding-right: 30px;

  p {
    font-size: 12px;
    color: ${props => props.theme.lightGray};
  }
`

const Circle = styled.div`
  width: 24px;
  height: 24px;
  background: #f6851b;
  border-radius: 50%;
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
          <ListGridContainer key={index}>
            <ListGridContent>
              <AiOutlineStar size={18} />
              <Profile></Profile>
              <p>{f.name}</p>
            </ListGridContent>
            <Minutes>
              {/* <p>{f.minutes}</p> */}
              <Circle></Circle>
            </Minutes>
          </ListGridContainer>
        )
      })}
    </ListGridWrapper>
  )
}

export default ListGrid
