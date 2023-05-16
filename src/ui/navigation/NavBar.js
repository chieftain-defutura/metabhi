import React, { useState, useCallback } from "react";
import configs from "../../configs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SearchInput } from "../projects/ProjectGrid";
import SearchIcon from "../../assets/search-icon.png";
import Logo from "../../assets/metabhi-logo.png";

import Profile from "../../assets/profile.png";
import { BsBell } from "react-icons/bs";
import MoonIcon from "../../assets/moon.svg";
import { BsSun } from "react-icons/bs";
import SunIcon from "../../assets/moon.svg";
import { ThemeContext } from "../contexts/ThemeContext";

const StyledNavBar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4em;
  border-bottom: ${props => props.theme.borderStyleClr};
  background: ${props => props.theme.darkClr};

  a {
    color: ${props => props.theme.text};
    text-decoration: none;
  }
`;

const BorderRight = styled.div`
  height: 60px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  border-right: ${props => props.theme.borderStyleClr};
  padding: 6px 20px;
  width: 260px;
  a {
    display: block;
  }

  img {
    width: 65px;
    display: block;
    object-fit: contain;
  }
  h1 {
    font-size: 20px;
  }
`;

const InputContent = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  background: ${props => props.theme.black};
  border: 1px solid rgba(119, 119, 119, 0.3);
  border-radius: 5px;
  padding: 2px 16px;
`;

const ToggleContent = styled.div`
  display: flex;
  align-item: center;
  cursor: pointer;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 600px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;

  li {
    padding: 0 20px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;

  @media (max-width: 600px) {
    flex: 1;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;

  @media (max-width: 600px) {
    flex: 1;
  }
`;
const WalletConnect = styled.div`
  display: flex;
  justify-content: flex-end;
  background: #002bff;
  padding: 8px 32px;
  border: 1px solid #002bff;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 24px;
  color: ${props => props.theme.text};
`;

// class NavBar extends Component {
//   static propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired
//   };

//   render() {
//     return (
//       <StyledNavBar>
//         <IconContainer>
//           <Link to="/">
//             <img src={configs.icon()} alt={configs.name()} />
//           </Link>
//           <h1>What's New</h1>
//         </IconContainer>
//         <SearchInput placeholder="Search scenes..." value={params.q} onChange={onChangeQuery} />

//         <RightContainer>
//           <img alt="" src={Toggle} />
//           <img alt="" src={Bell} />
//           <img alt="" src={Profile} />
//           <WalletConnect> Connect Wallet</WalletConnect>
//         </RightContainer>
//       </StyledNavBar>
//     );
//   }
// }

// export default withAuth(NavBar);

const NavBar = () => {
  const queryParams = new URLSearchParams(location.search);
  const [params, setParams] = useState({
    source: "scene_listings",
    filter: queryParams.get("filter") || "featured-remixable",
    q: queryParams.get("q") || ""
  });
  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext);

  const updateParams = useCallback(
    nextParams => {
      const search = new URLSearchParams();

      for (const name in nextParams) {
        if (name === "source" || !nextParams[name]) {
          continue;
        }

        search.set(name, nextParams[name]);
      }

      history.push(`/projects/create?${search}`);

      setParams(nextParams);
    },
    [history]
  );

  const onChangeQuery = useCallback(
    value => {
      updateParams({
        source: "scene_listings",
        filter: "remixable",
        q: value
      });
    },
    [updateParams]
  );

  const toggle = theme => {
    localStorage.setItem("theme", JSON.stringify(theme));
    setIsDarkMode(theme === "light" ? false : true);
  };

  return (
    <StyledNavBar>
      <LeftContainer>
        <IconContainer>
          <Link to="/">
            <img src={Logo} alt="logo" />

            {/* <img src={configs.icon()} alt={configs.name()} /> */}
          </Link>
          <h1>What's New</h1>
          <BorderRight></BorderRight>
        </IconContainer>

        <InputContent>
          <img src={SearchIcon} alt="search" />
          <SearchInput placeholder="Search scenes..." value={params.q} onChange={onChangeQuery} />
        </InputContent>
      </LeftContainer>

      <RightContainer>
        {isDarkMode ? (
          <ToggleContent onClick={() => toggle("light")}>
            <img src={MoonIcon} alt="moon" />
          </ToggleContent>
        ) : (
          <ToggleContent onClick={() => toggle("dark")}>
            <BsSun size={24} />
          </ToggleContent>
        )}
        <BsBell size={22} />
        <img alt="" src={Profile} />
        <WalletConnect>Connect Wallet</WalletConnect>
      </RightContainer>
    </StyledNavBar>
  );
};

export default NavBar;
