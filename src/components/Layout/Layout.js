import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/navigation/NavBar";
import Sidebar from "../Sidebar/Sidebar";

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const LayoutWrapper = styled.div`
  display: flex;
`;

const LayoutChildren = styled.div`
  overflow-y: auto;
  height: 100%;
  background: ${props => props.theme.grayClr};
  flex: 1;
  position: absolute;
  right: 0;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <LayoutWrapper>
        <Sidebar />
        <LayoutChildren>{children}</LayoutChildren>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
