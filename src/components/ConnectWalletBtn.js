import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Injected } from "../ui/connectors";
import autoAnimate from "@formkit/auto-animate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TiTick } from "react-icons/ti";
import { TbCopy } from "react-icons/tb";
import { Link } from "react-router-dom";
import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";

const chainId = "0x153c099c";

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const WalletConnectContainer = styled.div`
  position: relative;
`;
const WalletButtons = styled.div``;

const WalletConnectAddr = styled.div`
  border: 1px solid #0092ff;
  border-radius: 2px;
  padding: 8px 16px;
  color: ${props => props.theme.text};
  margin-right: 24px;
  cursor: pointer;
`;

const WalletConnect = styled.div`
  display: flex;
  justify-content: flex-end;
  background: #002bff;
  padding: 8px 16px;
  border: 1px solid #002bff;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 24px;
  color: white;
`;
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

const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const WalletCircle = styled.div`
  width: 14px;
  height: 14px;
  background: linear-gradient(90deg, #9d630c 0%, #e818ec 100%);
  border-radius: 50%;
`;

const ConnectWalletBtn = () => {
  const { activate, account, deactivate } = useWeb3React();
  const [copied, setCopied] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [currentNetworkId, setCurrentNetworkId] = useState(null);

  useEffect(() => {
    const fetchNetworkId = async () => {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          setCurrentNetworkId(chainId);
        } catch (error) {
          console.error("Error fetching network ID:", error);
        }
      }
    };

    fetchNetworkId();
  }, []);

  const addGatherTestnet = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x153c099c" }]
      });
    } catch (error) {
      console.error("Error activating MetaMask:", error);
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Gather Testnet",
              chainId: "0x153c099c",
              nativeCurrency: { name: "GTH", decimals: 18, symbol: "GTH" },
              rpcUrls: ["https://testnet.gather.network"]
            }
          ]
        });
      } catch (error) {
        console.error("Error adding Gather Testnet:", error);
      }
    }
  };

  const WalletToggle = () => {
    setWalletOpen(!walletOpen);
  };

  const parent = useRef(null);

  const handleCopy = () => {
    setCopied(true);
  };

  const handleLogout = () => {
    deactivate();
  };

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

  const displayAccount = account => {
    const slicedAccount = account && account.slice(0, 6) + "..." + account.slice(-6);
    return slicedAccount;
  };

  const web3 = new Web3(injected);

  console.log("web3", web3);

  // const addGatherTestnet = async () => {
  //   try {
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: "0x153c099c" }]
  //     });
  //   } catch (error) {
  //     console.error("Error activating MetaMask:", error);
  //     try {
  //       await window.ethereum.request({
  //         method: "wallet_addEthereumChain",
  //         params: [
  //           {
  //             chainName: "Gather Testnet",
  //             chainId: "0x153c099c",
  //             nativeCurrency: { name: "GTH", decimals: 18, symbol: "GTH" },
  //             rpcUrls: ["https://testnet.gather.network"]
  //           }
  //         ]
  //       });
  //     } catch (error) {
  //       console.error("Error adding Gather Testnet:", error);
  //     }
  //   }
  // };

  return (
    <div>
      <WalletConnectContainer>
        <div>{currentNetworkId !== "0x153c099c" && <button onClick={addGatherTestnet}>Wrong Network</button>}</div>
        <WalletButtons>
          {account ? (
            <WalletConnectAddr onClick={WalletToggle}>
              <WalletWrapper>
                <WalletCircle></WalletCircle>
                {account.slice(0, 6)}...{account.slice(account.length - 6)}
              </WalletWrapper>
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
    </div>
  );
};

export default ConnectWalletBtn;
