import React from "react"
import styled from "styled-components"
import GrayIcon from "../../assets/gray.svg"
import WhiteIcon from "../../assets/white.svg"
import { BiTime } from "react-icons/bi"
import { CgTemplate } from "react-icons/cg"
import { BsFileEarmark } from "react-icons/bs"
import { AiOutlineStar } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"
import { NavLink } from "react-router-dom"

const SidebarWrapper = styled.div`
  height: calc(100vh - 77px);
  width: 260px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  top: 75px;
  left: 0;
  z-index: 1;
  border-right: 1px solid ${props => props.theme.borderStyleClr};
  &::-webkit-scrollbar {
    width: 0px;
  }
  // &::-webkit-scrollbar-thumb {
  //   background: red;
  // }
  a {
    text-decoration: none;
  }
  a.active {
    color: #0092ff;
  }
`

const RecentContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 21px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 43, 255, 0.1);
    border-left: 2px solid #002bff;
    padding: 12px 20px;
  }

  img {
    width: 24px;
  }
  h4 {
    font-size: 14px;
    font-weight: 400;
  }
  &.recent {
    margin-top: 14px;
  }

  &.borderStyle {
    border-bottom: 1px solid ${props => props.theme.borderStyleClr};
    margin-bottom: 8px;
  }
  &.borderPadding {
    margin-top: 8px;
  }
  &.borderBottom {
    margin-bottom: 8px;
  }
`
const Teams = styled.div`
  padding: 16px 21px;
  border-top: 1px solid ${props => props.theme.borderStyleClr};
  margin-top: 8px;

  h4 {
    font-size: 14px;
    font-weight: 700;
  }
`

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <div>
        <NavLink to="/dashboard/recent">
          <RecentContent className="recent">
            <BiTime size={16} />
            <h4>Recent</h4>
          </RecentContent>
        </NavLink>
      </div>
      <div>
        <NavLink to="/dashboard/template">
          <RecentContent>
            <CgTemplate size={16} />
            <h4>Templates</h4>
          </RecentContent>
        </NavLink>
      </div>

      {/* <RecentContent className="borderStyle">
        <BsFileEarmark size={16} />
        <h4>Draft</h4>
      </RecentContent>

      <RecentContent className="borderPadding">
        <AiOutlineStar size={16} />
        <h4 style={{ fontWeight: "700" }}>Favorite files</h4>
      </RecentContent>
      <RecentContent className="borderBottom">
        <AiOutlinePlus size={16} />
        <h4>Create favorite file</h4>
      </RecentContent>
      <Teams>
        <h4>Teams</h4>
      </Teams>
      <RecentContent>
        <AiOutlinePlus size={16} />
        <h4>Create new team</h4>
      </RecentContent>
      <RecentContent>
        <img src={GrayIcon} alt="GrayIcon" />
        <h4>Personal</h4>
      </RecentContent>
      <RecentContent>
        <img src={WhiteIcon} alt="WhiteIcon" />
        <h4>Company</h4>
      </RecentContent> */}
    </SidebarWrapper>
  )
}

export default Sidebar
