import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/navigation/NavBar";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard";

const LayoutWrap = styled.div``;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const LayoutWrapper = styled.div`
  // display: flex;
  display: grid;
  grid-template-columns: 0.1fr 1fr;
`;

const LayoutContainer = styled.div`
  //   overflow-y: auto;
  //   height: 100%;
  //   position: sticky;
  //   top: 0;
  //   background: #0e0e0e;
  //   border: 1px solid #1c1c1c;
  // width: 260px;
`;

const LayoutChildren = styled.div`
  overflow-y: auto;
  height: 100%;
  background: ${props => props.theme.grayClr};
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrap>
      <Header>
        <NavBar />
      </Header>
      <LayoutWrapper>
        <LayoutContainer>
          <Sidebar />
        </LayoutContainer>
        <LayoutChildren>{children}</LayoutChildren>
      </LayoutWrapper>
    </LayoutWrap>
  );
};

export default Layout;
