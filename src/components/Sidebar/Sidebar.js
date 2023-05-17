import React from "react";
import styled from "styled-components";
import GrayIcon from "../../assets/gray.svg";
import WhiteIcon from "../../assets/white.svg";
import { BiTime } from "react-icons/bi";
import { CgTemplate } from "react-icons/cg";
import { BsFileEarmark } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const SidebarWrapper = styled.div`
  height: calc(100vh - 85px);
  width: 260px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: ${props => props.theme.borderStyleClr};
  background: ${props => props.theme.darkClr};
  position: fixed;
  top: 11%;
  left: 0;
  right: 82.9%;
  z-index: 1;
  &::-webkit-scrollbar {
    width: 5px;
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

  &.borderStyle {
    border-bottom: ${props => props.theme.borderStyleClr};
    padding-bottom: 22px;
  }
  &.borderPadding {
    padding-top: 20px;
  }
  &.borderBottom {
    border-bottom: ${props => props.theme.borderStyleClr};
    padding-bottom: 22px;
  }
`;
const Teams = styled.div`
  padding: 16px 21px;
  h4 {
    font-size: 20px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <div>
        <a href="/dashboard" style={{ textDecoration: "none" }}>
          <RecentContent>
            <BiTime size={24} />
            <h4>Recent</h4>
          </RecentContent>
        </a>
      </div>
      <div>
        <a href="/dashboard/template" style={{ textDecoration: "none" }}>
          <RecentContent>
            <CgTemplate size={24} />
            <h4>Templates</h4>
          </RecentContent>
        </a>
      </div>

      <RecentContent className="borderStyle">
        <BsFileEarmark size={24} />
        <h4>Draft</h4>
      </RecentContent>
      <RecentContent className="borderPadding">
        <AiOutlineStar size={24} />
        <h4>Favorite files</h4>
      </RecentContent>
      <RecentContent className="borderBottom">
        <AiOutlinePlus size={24} />
        <h4>Create favorite file</h4>
      </RecentContent>
      <Teams>
        <h4>Teams</h4>
      </Teams>
      <RecentContent>
        <AiOutlinePlus size={24} />
        <h4>Create new team</h4>
      </RecentContent>
      <RecentContent>
        <img src={GrayIcon} alt="RecentIcon" />
        <h4>Personal</h4>
      </RecentContent>
      <RecentContent>
        <img src={WhiteIcon} alt="RecentIcon" />
        <h4>Company</h4>
      </RecentContent>
    </SidebarWrapper>
  );
};

export default Sidebar;
