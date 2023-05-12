import React, { useState, useCallback } from "react";
import configs from "../../configs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SearchInput } from "../projects/ProjectGrid";

import Profile from "../../assets/profile.png";
import Toggle from "../../assets/toggle.png";
import Bell from "../../assets/bell.svg";

const StyledNavBar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  font-size: 1.4em;
  border-bottom: 1px solid #252525;
  a {
    color: ${props => props.theme.text};
    text-decoration: none;
  }
`;

const IconContainer = styled.div`
  margin-right: 20px;
  display: flex;
  gap: 5px;
  a {
    display: block;
  }

  img {
    width: 48px;
    display: block;
  }
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
  gap: 24px;

  @media (max-width: 600px) {
    flex: 1;
  }
`;

const WalletConnect = styled.div`
  display: flex;
  justify-content: flex-end;
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

  return (
    <StyledNavBar>
      <IconContainer>
        <Link to="/">
          <img src={configs.icon()} alt={configs.name()} />
        </Link>
        <h1>What's New</h1>
      </IconContainer>
      <SearchInput placeholder="Search scenes..." value={params.q} onChange={onChangeQuery} />

      <RightContainer>
        <img alt="" src={Toggle} />
        <img alt="" src={Bell} />
        <img alt="" src={Profile} />
        <WalletConnect> Connect Wallet</WalletConnect>
      </RightContainer>
    </StyledNavBar>
  );
};

export default NavBar;
