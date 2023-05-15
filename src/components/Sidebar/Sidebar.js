import React from "react";
import styled from "styled-components";
import RecentIcon from "../../assets/recent-svg.svg";
import DraftIcon from "../../assets/draft-svg.svg";
import StarIcon from "../../assets/star.svg";
import PlusIcon from "../../assets/plus.svg";
import GrayIcon from "../../assets/gray.svg";
import WhiteIcon from "../../assets/white.svg";
import TemplateIcon from "../../assets/template.svg";

const SidebarWrapper = styled.div`
  height: calc(100vh - 85px);
  border-right: ${props => props.theme.borderStyleClr};
  background: ${props => props.theme.darkClr};
  position: fixed;
  top: 11%;
  left: 0;
  right: 82.9%;
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
    padding-bottom: 20px;
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
        <a href="/dashboard" style={{ textDecoration: "none", paddingTop: "22px" }}>
          <RecentContent>
            <img src={RecentIcon} alt="RecentIcon" />
            <h4>Recent</h4>
          </RecentContent>
        </a>
      </div>
      <div>
        <a href="/dashboard/template" style={{ textDecoration: "none" }}>
          <RecentContent>
            <img src={TemplateIcon} alt="RecentIcon" />
            <h4>Templates</h4>
          </RecentContent>
        </a>
      </div>

      <RecentContent className="borderStyle">
        <img src={DraftIcon} alt="RecentIcon" />
        <h4>Draft</h4>
      </RecentContent>
      <RecentContent className="borderPadding">
        <img src={StarIcon} alt="RecentIcon" />
        <h4>Favorite files</h4>
      </RecentContent>
      <RecentContent className="borderBottom">
        <img src={PlusIcon} alt="RecentIcon" />
        <h4>Create favorite file</h4>
      </RecentContent>
      <Teams>
        <h4>Teams</h4>
      </Teams>
      <RecentContent>
        <img src={PlusIcon} alt="RecentIcon" />
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
