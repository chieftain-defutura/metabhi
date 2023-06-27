import React, { useContext } from "react"
import styled from "styled-components"
import { Column } from "../ui/layout/Flex"
import { PopupContext } from "../ui/contexts/PopupContext"

const Source = styled.div`
  background-color: ${props => props.theme.grayClr};
  width: auto;
  z-index: 1000;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.scrollbarClr};
    border-radius: 50px;
  }
`

const ElementPopap = () => {
  const { selectedSource, savedState, SourceComponent, setSavedState, editor } = useContext(PopupContext)

  return (
    <Column flex>
      <Source>
        {SourceComponent && !selectedSource.toggle && (
          <div style={{ width: "auto" }}>
            <SourceComponent
              key={selectedSource.id}
              source={selectedSource.src}
              editor={editor}
              savedState={savedState}
              setSavedState={setSavedState}
            />
          </div>
        )}
      </Source>
    </Column>
  )
}

export default ElementPopap
