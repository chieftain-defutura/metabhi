import React, { Component } from "react"
import PropTypes from "prop-types"
import { withEditor } from "../contexts/EditorContext"
import DefaultNodeEditor from "./DefaultNodeEditor"
import Panel from "../layout/Panel"
import styled from "styled-components"
import { SlidersH } from "styled-icons/fa-solid/SlidersH"
import TransformPropertyGroup from "./TransformPropertyGroup"
// import NameInputGroup from "./NameInputGroup"
import InputGroup from "../inputs/InputGroup"
import BooleanInput from "../inputs/BooleanInput"
// import DarkModeToggleButton from "../ToggleButton"
// import { ToggleButton } from "../Toggle"
// import Toggle from "../Toggle"

const StyledNodeEditor = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const PropertiesHeader = styled.div`
  // background-color: ${props => props.theme.panel2};
  border: none !important;
  padding-bottom: 0 !important;
`

const NameInputGroupContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  // align-items: flex-start;
  justify-content: space-around;
  border-bottom: 1px solid ${props => props.theme.emptyBoxClr};
`

const VisibleInputGroup = styled(InputGroup)`
  display: flex;
  flex: 0;
  flex-direction: row;

  & > label {
    width: auto !important;
    padding-right: 8px;
  }
`

const PropertiesPanelContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  // align-item:center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.scrollbarClr};
  }
`

const NoNodeSelectedMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 100px;
`
const VisibleInput = styled.div`
  display: flex;
  flex-direction: row;
`

class PropertiesPanelContainer extends Component {
  static propTypes = {
    editor: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: props.editor.selected
    }
  }

  componentDidMount() {
    const editor = this.props.editor
    editor.addListener("selectionChanged", this.onSelectionChanged)
    editor.addListener("objectsChanged", this.onObjectsChanged)
  }

  componentWillUnmount() {
    const editor = this.props.editor
    editor.removeListener("selectionChanged", this.onSelectionChanged)
    editor.removeListener("objectsChanged", this.onObjectsChanged)
  }

  onSelectionChanged = () => {
    this.setState({ selected: this.props.editor.selected })
  }

  onObjectsChanged = (objects, property) => {
    const selected = this.props.editor.selected

    if (property === "position" || property === "rotation" || property === "scale" || property === "matrix") {
      return
    }

    for (let i = 0; i < objects.length; i++) {
      if (selected.indexOf(objects[i]) !== -1) {
        this.setState({ selected: this.props.editor.selected })
        return
      }
    }
  }

  onChangeVisible = value => {
    this.props.editor.setPropertySelected("_visible", value)
  }

  onChangeEnabled = value => {
    this.props.editor.setPropertySelected("enabled", value)
  }

  render() {
    const editor = this.props.editor
    const selected = this.state.selected

    let content

    if (selected.length === 0) {
      content = <NoNodeSelectedMessage>No node selected</NoNodeSelectedMessage>
    } else {
      const activeNode = selected[selected.length - 1]
      const NodeEditor = editor.getNodeEditor(activeNode) || DefaultNodeEditor

      const multiEdit = selected.length > 1

      let showNodeEditor = true

      for (let i = 0; i < selected.length - 1; i++) {
        if (editor.getNodeEditor(selected[i]) !== NodeEditor) {
          showNodeEditor = false
          break
        }
      }

      let nodeEditor

      if (showNodeEditor) {
        nodeEditor = <NodeEditor multiEdit={multiEdit} node={activeNode} editor={editor} />
      } else {
        nodeEditor = <NoNodeSelectedMessage>Multiple Nodes of different types selected</NoNodeSelectedMessage>
      }

      const disableTransform = selected.some(node => node.disableTransform)

      content = (
        <StyledNodeEditor>
          <PropertiesHeader>
            <NameInputGroupContainer>
              {/* <NameInputGroup node={activeNode} editor={editor} />  */}
              {activeNode.nodeName !== "Scene" && (
                <>
                  <VisibleInput>
                    <VisibleInputGroup name="Visible"></VisibleInputGroup>
                    <BooleanInput value={activeNode._visible} onChange={this.onChangeVisible} />
                  </VisibleInput>
                  <VisibleInput>
                    <VisibleInputGroup name="Enabled"></VisibleInputGroup>
                    <BooleanInput value={activeNode.enabled} onChange={this.onChangeEnabled} />
                  </VisibleInput>
                </>
              )}
            </NameInputGroupContainer>
            {!disableTransform && <TransformPropertyGroup node={activeNode} editor={editor} />}
          </PropertiesHeader>
          {nodeEditor}
        </StyledNodeEditor>
      )
    }

    // id used in onboarding

    return (
      <Panel id="properties-panel" title="Properties" icon={SlidersH}>
        <PropertiesPanelContent>{content}</PropertiesPanelContent>
      </Panel>
    )
  }
}

export default withEditor(PropertiesPanelContainer)
