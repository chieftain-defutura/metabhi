import React, { useContext } from "react"
import PropertiesPanelContainer from "../ui/properties/PropertiesPanelContainer"
import ElementPopap from "./ElementPopap"
import { PopupContext } from "../ui/contexts/PopupContext"

const PopupParent = () => {
  const { popupToggle } = useContext(PopupContext)
  return popupToggle ? <ElementPopap /> : <PropertiesPanelContainer />
}

export default PopupParent
