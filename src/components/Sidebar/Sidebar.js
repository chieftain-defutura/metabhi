import React, { useState } from "react";
import styled from "styled-components";
import GrayIcon from "../../assets/gray.svg";
import WhiteIcon from "../../assets/white.svg";
import { BiTime } from "react-icons/bi";
import { CgTemplate } from "react-icons/cg";
import { BsFileEarmark } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const SidebarWrapper = styled.div`
  height: calc(100vh - 85px);
  width: 260px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  top: 10.3%;
  left: 0;
  right: 82.9%;
  z-index: 1;
  &::-webkit-scrollbar {
    width: 5px;
  }
  a.active {
    background: ${props => props.theme.darkClr};
    color: #0092ff;
  }
`;

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
    font-size: 18px;
  }
  &.recent {
    margin-top: 14px;
  }

  &.borderStyle {
    border-bottom: ${props => props.theme.borderStyleClr};
    margin-bottom: 8px;
  }
  &.borderPadding {
    margin-top: 8px;
  }
  &.borderBottom {
    margin-bottom: 8px;
  }
`;
const Teams = styled.div`
  padding: 16px 21px;
  border-top: ${props => props.theme.borderStyleClr};
  margin-top: 8px;

  h4 {
    font-size: 20px;
  }
`;

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SidebarWrapper>
      <div>
        <NavLink to="/dashboard/recent" style={{ textDecoration: "none" }}>
          <RecentContent
            className="recent"
            style={{
              background: activeIndex === 0 ? "rgba(0, 146, 255, 0.2)" : "transparent"
            }}
            onClick={() => setActiveIndex(0)}
          >
            <BiTime size={24} />
            <h4>Recent</h4>
          </RecentContent>
        </NavLink>
      </div>
      <div>
        <NavLink to="/dashboard/template" style={{ textDecoration: "none" }}>
          <RecentContent
            style={{
              background: activeIndex === 1 ? "rgba(0, 146, 255, 0.2)" : "transparent"
            }}
            onClick={() => setActiveIndex(1)}
          >
            <CgTemplate size={24} />
            <h4>Templates</h4>
          </RecentContent>
        </NavLink>
      </div>

      <RecentContent
        className="borderStyle"
        style={{
          background: activeIndex === 2 ? "rgba(0, 146, 255, 0.2)" : "transparent"
        }}
        onClick={() => setActiveIndex(2)}
      >
        <BsFileEarmark size={24} />
        <h4>Draft</h4>
      </RecentContent>

      <RecentContent
        className="borderPadding"
        style={{
          background: activeIndex === 3 ? "rgba(0, 146, 255, 0.2)" : "transparent"
        }}
        onClick={() => setActiveIndex(3)}
      >
        <AiOutlineStar size={24} />
        <h4>Favorite files</h4>
      </RecentContent>
      <RecentContent
        className="borderBottom"
        style={{
          background: activeIndex === 4 ? "rgba(0, 146, 255, 0.2)" : "transparent"
        }}
        onClick={() => setActiveIndex(4)}
      >
        <AiOutlinePlus size={24} />
        <h4>Create favorite file</h4>
      </RecentContent>
      <Teams>
        <h4>Teams</h4>
      </Teams>
      <RecentContent
        style={{
          background: activeIndex === 5 ? "rgba(0, 146, 255, 0.2)" : "transparent"
        }}
        onClick={() => setActiveIndex(5)}
      >
        <AiOutlinePlus size={24} />
        <h4>Create new team</h4>
      </RecentContent>
      <RecentContent
        style={{
          background: activeIndex === 6 ? "rgba(0, 146, 255, 0.2)" : "transparent"
        }}
        onClick={() => setActiveIndex(6)}
      >
        <img src={GrayIcon} alt="RecentIcon" />
        <h4>Personal</h4>
      </RecentContent>
      <RecentContent
        style={{
          background: activeIndex === 7 ? "rgba(0, 146, 255, 0.2)" : "transparent"
        }}
        onClick={() => setActiveIndex(7)}
      >
        <img src={WhiteIcon} alt="RecentIcon" />
        <h4>Company</h4>
      </RecentContent>
    </SidebarWrapper>
  );
};

export default Sidebar;
