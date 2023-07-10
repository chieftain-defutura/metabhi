import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Column, Row } from "../layout/Flex"
import { List, ListItem } from "../layout/List"
import { EditorContext } from "../contexts/EditorContext"
import AssetDropZone from "./AssetDropZone"
import { PopupContext } from "../contexts/PopupContext"

const AssetsPanelContainer = styled(Row)`
  position: relative;
  flex: 1;
  background: ${props => props.theme.grayClr};
  display: block;
`

const AssetsPanelToolbarContainer = styled.div`
  display: flex;
  min-height: 32px;
  background-color: ${props => props.theme.emptyBoxClr};
  align-items: center;
  padding: 8px;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.panel};
`

export const AssetPanelToolbarContent = styled(Row)`
  flex: 1;
  align-items: flex-end;

  & > * {
    margin-left: 16px;
  }
`

export function AssetsPanelToolbar({ title, children, ...rest }) {
  return (
    <AssetsPanelToolbarContainer {...rest}>
      <AssetPanelToolbarContent>{children}</AssetPanelToolbarContent>
    </AssetsPanelToolbarContainer>
  )
}

AssetsPanelToolbar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

const AssetsPanelColumn = styled(Column)`
  // max-width: 100%;
  // border-right: 1px solid ${props => props.theme.border};
  // overflow: auto;
`

export const AssetPanelContentContainer = styled(Row)`
  display: flex;
  flex-direction: column;
`

export default function AssetsPanel() {
  const editor = useContext(EditorContext)
  const { setEditor, sources, setSelectedSource, selectedSource, setPopupToggle } = useContext(PopupContext)

  useEffect(() => {
    if (editor) {
      setEditor(editor)
    }
  }, [editor, setEditor])

  return (
    <>
      <AssetsPanelContainer id="assets-panel">
        <AssetsPanelColumn flex>
          <AssetsPanelToolbar title="Assets" />
          <List>
            {sources.map(source => (
              <ListItem
                key={source.id}
                onClick={() => {
                  setSelectedSource({
                    toggle: selectedSource.src === source && !selectedSource.toggle,
                    src: source
                  })
                  setPopupToggle(true)
                }}
                selected={selectedSource.src === source}
              >
                {source.name}
              </ListItem>
            ))}
          </List>
        </AssetsPanelColumn>
        <AssetDropZone />
      </AssetsPanelContainer>
    </>
  )
}
