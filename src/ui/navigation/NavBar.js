import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/metabhi-logo.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Profile from "../../assets/profile.png";
import { BsBell } from "react-icons/bs";
import MoonIcon from "../../assets/moon.svg";
import { BsSun } from "react-icons/bs";
import { ThemeContext } from "../contexts/ThemeContext";
import SearchFilter from "../../components/SearchFilter";
import { useWeb3React } from "@web3-react/core";
import { Injected } from "../connectors";
import { TiTick } from "react-icons/ti";
import { TbCopy } from "react-icons/tb";
import autoAnimate from "@formkit/auto-animate";

const StyledNavBar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4em;
  border-bottom: 1px solid ${props => props.theme.borderStyleClr};
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
  border-right: 1px solid ${props => props.theme.borderStyleClr};
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
  color: white;
`;

const WalletConnectContainer = styled.div`
  position: relative;
`;

const WalletConnectAddr = styled.div`
  border: 1px solid #0092ff;
  border-radius: 2px;
  padding: 8px 32px;
  color: ${props => props.theme.text};
  margin-right: 24px;
  cursor: pointer;
`;

const WalletButtons = styled.div``;

const WalletDropDown = styled.div`
  width: 280px;
  height: auto;
  background: ${props => props.theme.dropdown};
  border-radius: 5px;
  position: absolute;
  top: 115%;
  right: 10%;
  box-shadow: ${props => props.theme.boxShadow};
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 22px;
  border-bottom: 1px solid ${props => props.theme.walletborder};
`;

const CopyText = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.theme.text};
  cursor: pointer;
`;

const Content = styled.div`
  h3 {
    font-size: 16px;
    padding: 12px 22px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 146, 255, 0.4);
    }
  }
`;
const DashboardPara = styled.div`
  margin-top: 10px;
`;

const Logout = styled.div`
  margin-bottom: 14px;
  h4 {
    color: #ff6347;
    font-size: 16px;
    padding: 12px 22px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 146, 255, 0.4);
    }
  }
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
  const { activate, account, deactivate } = useWeb3React();
  const [copied, setCopied] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  const WalletToggle = () => {
    setWalletOpen(!walletOpen);
  };

  const handleCopy = () => {
    setCopied(true);
  };

  const displayAccount = account => {
    const slicedAccount = account.slice(0, 6) + "..." + account.slice(-6);
    return slicedAccount;
  };

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [copied, parent]);

  const handleLogout = () => {
    deactivate();
  };

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

        <SearchFilter />

        {/* <SearchInput placeholder="Search scenes..." value={params.q} onChange={onChangeQuery} /> */}
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
        <WalletConnectContainer>
          <WalletButtons>
            {account ? (
              <WalletConnectAddr onClick={WalletToggle}>
                {account.slice(0, 6)}...{account.slice(account.length - 6)}
              </WalletConnectAddr>
            ) : (
              <WalletConnect onClick={() => activate(Injected)}>Connect Wallet</WalletConnect>
            )}
          </WalletButtons>
          <div ref={parent} style={{ marginTop: "10px" }}>
            {walletOpen && (
              <WalletDropDown>
                <Address>
                  <div>
                    <CopyToClipboard text={account} onCopy={handleCopy}>
                      <CopyText>{displayAccount(account)}</CopyText>
                    </CopyToClipboard>
                  </div>
                  {!copied && (
                    <CopyToClipboard text={account} onCopy={handleCopy}>
                      <TbCopy size={22} />
                    </CopyToClipboard>
                  )}

                  {copied ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "2px", cursor: "pointer" }}>
                      <TiTick size={25} />
                    </div>
                  ) : null}
                </Address>
                <Content>
                  <DashboardPara>
                    <Link to={"/dashboard/recent"}>
                      <h3>Dashboard</h3>
                    </Link>
                  </DashboardPara>
                  <Logout>
                    <h4 onClick={handleLogout}>Logout</h4>
                  </Logout>
                </Content>
              </WalletDropDown>
            )}
          </div>
        </WalletConnectContainer>
      </RightContainer>
    </StyledNavBar>
  );
};

export default NavBar;
