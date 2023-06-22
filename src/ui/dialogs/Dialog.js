import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { Button } from "../inputs/Button"
// import nftAbi from "../../api/NftAbi/nftAbi.json"
import { useWeb3React } from "@web3-react/core"
import styled from "styled-components"
import Web3 from "web3"
// import { ethers } from "ethers"
import axios from "axios"
import { ERC721Abi } from "../../api/NftAbi/ERC721Abi"
// import { Web3Storage } from "web3.storage"
import ConnectWalletBtn from "../../components/ConnectWalletBtn"

const DialogContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 4px;
  background-color: ${props => props.theme.black};
  max-width: 800px;
  min-width: 400px;
  min-height: 150px;
  // max-height: 80vh;
`

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 12px;
  overflow: hidden;
  height: 32px;
  font-weight: 400;
  background-color: ${props => props.theme.darkGray};
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  > * {
    display: flex;
    align-items: center;
  }
`

export const DialogContent = styled.div`
  color: ${props => props.theme.text};
  display: flex;
  flex: 1;
  flex-direction: row;
  /* This forces firefox to give the contents a proper height. */
  overflow: hidden;
  background: ${props => props.theme.dropdown};
  padding: 8px;
  min-height: 100px;

  h1 {
    font-size: 2em;
    color: ${props => props.theme.text};
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 12px;
    line-height: 1.5em;
  }
`

const DialogBottomNav = styled.div`
  display: flex;
  height: 64px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: ${props => props.theme.darkGray};
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  padding: 8px;

  .primary-save-btn {
    border: 1px solid #0092ff;
  }
  .save-btn {
    background: linear-gradient(92.34deg, #002bff -0.06%, #0092ff 99.94%);
    color: #fff;
    &:hover {
      border: none;
    }
  }

  a {
    color: ${props => props.theme.text2};
  }

  button {
    min-width: 84px;
  }

  & > * {
    margin: 0 8px;
  }
`

export default function Dialog({
  tag,
  title,
  onCancel,
  cancelLabel,
  onConfirm,
  confirmLabel,
  bottomNav,
  children,
  ...rest
}) {
  const { account, library } = useWeb3React()
  const [objectCID] = useState("")
  const [, setIsLoading] = useState(false)

  const mintNftAddress = "0x30E9fEF957036ACf9468D61922F4A837EC0eF169".toLowerCase()

  const onSubmitForm = useCallback(
    async e => {
      if (!onConfirm) return
      onConfirm(e)
    },
    [onConfirm, objectCID]
  )

  const onsubmit = async () => {
    if (!account || !library.provider) return

    onCancel()

    try {
      setIsLoading(true)
      const newData = { name: "subject", image: "ac0826c6-5713-427d-8357-802c5711d0d4" }
      const resData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: newData,
        headers: {
          pinata_api_key: "e791f4722a928786f3a4",
          pinata_secret_api_key: "061e40a53c59f57788841539c4068ea4456329ad31bfc08418fbfd2329640df7",
          "Content-Type": "application/json"
        }
      })
      const JsonHash = resData.data.IpfsHash

      const dataHash = `https://gateway.pinata.cloud/ipfs/${JsonHash}`
      console.log(dataHash)

      const web3 = new Web3(new Web3(library.provider))

      const mintContract = new web3.eth.Contract(ERC721Abi, mintNftAddress)
      console.log(mintContract)
      console.log(ERC721Abi)
      const tx = await mintContract.methods.mint(account, dataHash).send({ from: account })
      console.log("tx", tx)

      setIsLoading(false)
    } catch (error) {
      console.log("Error sending File to IPFS:")
      console.log(error)
    }
  }

  return (
    <>
      <DialogContainer as={tag} onSubmit={onSubmitForm} {...rest}>
        <DialogHeader>
          <span>{title}</span>
        </DialogHeader>
        <DialogContent>{children}</DialogContent>
        {(onConfirm || onCancel || bottomNav) && (
          <DialogBottomNav>
            {bottomNav}
            {onCancel && (
              <Button className="primary-save-btn" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            {!account ? (
              <ConnectWalletBtn />
            ) : (
              <>
                {onConfirm && (
                  <>
                    <Button className="save-btn" type="submit" onClick={tag === "form" ? null : onConfirm}>
                      {confirmLabel}
                    </Button>
                    <Button className="save-btn" type="submit" onClick={onsubmit}>
                      Mint
                    </Button>
                  </>
                )}
              </>
            )}
          </DialogBottomNav>
        )}
      </DialogContainer>
    </>
  )
}

Dialog.propTypes = {
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string.isRequired,
  bottomNav: PropTypes.node,
  children: PropTypes.node
}

Dialog.defaultProps = {
  tag: "form",
  confirmLabel: "Ok",
  cancelLabel: "Cancel"
}
