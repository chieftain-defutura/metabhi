import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import configs from "../configs"
import PreviewDialog from "../ui/dialogs/PreviewDialog"
import StringInput from "../ui/inputs/StringInput"
import BooleanInput from "../ui/inputs/BooleanInput"
import FormField from "../ui/inputs/FormField"
import { useChainId, useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"
import axios from "axios"
import { ERC721Abi } from "./NftAbi/ERC721Abi"
import { CONTRACTS } from "./contracts"
import { TransactionContext } from "../ui/contexts/TransactionContext"

const PublishDialog = props => {
  const [name, setName] = useState("Crater")
  const [creatorAttribution, setCreatorAttribution] = useState("")
  const [allowRemixing, setAllowRemixing] = useState(false)
  const [jsonHash, setJsonHash] = useState(false)
  const [allowPromotion, setAllowPromotion] = useState(false)
  const { setLoading } = useContext(TransactionContext)
  const chainId = useChainId()
  const [mintNftAddress, setMintNftAddress] = useState(
    CONTRACTS[chainId]?.address || "0x30E9fEF957036ACf9468D61922F4A837EC0eF169"
  )
  const { address } = useAccount()

  const { onCancel, screenshotUrl, contentAttributions } = props

  const onChangeName = event => {
    setName(event)
  }

  useEffect(() => {
    setMintNftAddress((CONTRACTS[chainId]?.address || "0x30E9fEF957036ACf9468D61922F4A837EC0eF169").toLowerCase())
  }, [chainId])

  const { config } = usePrepareContractWrite({
    address: mintNftAddress,
    abi: ERC721Abi,
    functionName: "mint",
    args: [address || "", jsonHash]
  })

  const { data: contractData, write } = useContractWrite(config)

  useWaitForTransaction({
    hash: contractData?.hash
  })

  const onChangeCreatorAttribution = event => {
    setCreatorAttribution(event)
  }

  const onChangeAllowRemixing = value => {
    setAllowRemixing(value)
  }

  const onChangeAllowPromotion = value => {
    setAllowPromotion(value)
  }

  function convertBlobUrlToFile(blobUrl, fileName) {
    return fetch(blobUrl)
      .then(response => response.blob())
      .then(blob => new File([blob], fileName))
  }

  const onSubmit = async () => {
    if (!address) return

    onCancel()

    try {
      setLoading(true)

      const file = await convertBlobUrlToFile(screenshotUrl, "demo")
      const formData = new FormData()
      formData.append("file", file)

      const imageResData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: "e791f4722a928786f3a4",
          pinata_secret_api_key: "061e40a53c59f57788841539c4068ea4456329ad31bfc08418fbfd2329640df7"
        }
      })

      const newData = { name: name, image: imageResData.data.IpfsHash }
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
      setJsonHash(JsonHash)

      const dataHash = `https://gateway.pinata.cloud/ipfs/${JsonHash}`
      console.log("dataHash", dataHash)

      write()
      setLoading(false)
    } catch (error) {
      console.log("Error sending File to IPFS:")
      console.log(error)
      setLoading(false)
    }
  }

  const onConfirm = () => {
    const publishState = {
      name: name.trim(),
      creatorAttribution: creatorAttribution.trim(),
      allowRemixing,
      allowPromotion,
      contentAttributions: props.contentAttributions
    }

    props.onPublish(publishState)
  }

  return (
    <PreviewDialog
      imageSrc={screenshotUrl}
      title={configs.isMoz() ? "Publish to Hubs" : "Publish Scene"}
      onConfirm={onConfirm}
      onSubmit={onSubmit}
      onCancel={onCancel}
      confirmLabel="Save and Publish"
    >
      <FormField>
        <label htmlFor="sceneName">Scene Name</label>
        <StringInput
          id="sceneName"
          required
          pattern={"[A-Za-z0-9-':\"!@#$%^&*(),.?~ ]{4,64}"}
          title="Name must be between 4 and 64 characters and cannot contain underscores"
          value={name}
          onChange={onChangeName}
        />
      </FormField>
      <FormField>
        <label htmlFor="creatorAttribution">Your Attribution (optional):</label>
        <StringInput id="creatorAttribution" value={creatorAttribution} onChange={onChangeCreatorAttribution} />
      </FormField>
      <FormField inline>
        <label htmlFor="allowRemixing">
          Allow
          <a href="https://github.com/mozilla/Spoke/blob/master/REMIXING.md" target="_blank" rel="noopener noreferrer">
            Remixing
          </a>
          &nbsp;with
          <br />
          Creative Commons&nbsp;
          <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">
            CC-BY 3.0
          </a>
        </label>
        <BooleanInput id="allowRemixing" value={allowRemixing} onChange={onChangeAllowRemixing} />
      </FormField>
      <FormField inline>
        <label htmlFor="allowPromotion">
          Allow {configs.isMoz() ? "Mozilla to " : ""}
          <a href="https://github.com/mozilla/Spoke/blob/master/PROMOTION.md" target="_blank" rel="noopener noreferrer">
            {configs.isMoz() ? "promote" : "promotion"}
          </a>
          {configs.isMoz() ? "" : "of "}my scene
        </label>
        <BooleanInput id="allowPromotion" value={allowPromotion} onChange={onChangeAllowPromotion} />
      </FormField>
      {contentAttributions && (
        <FormField>
          <label>Model Attribution:</label>
          <ul>
            {contentAttributions.map(
              (a, i) =>
                a.author &&
                a.title && (
                  <li key={i}>
                    <b>{`${a.title}`}</b>
                    {(a.author && ` (by ${a.author})`) || ` (by Unknown)`}
                  </li>
                )
            )}
          </ul>
        </FormField>
      )}
    </PreviewDialog>
  )
}

PublishDialog.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  screenshotUrl: PropTypes.string,
  contentAttributions: PropTypes.array,
  onPublish: PropTypes.func,
  published: PropTypes.bool,
  sceneUrl: PropTypes.string,
  initialSceneParams: PropTypes.object
}

export default PublishDialog
