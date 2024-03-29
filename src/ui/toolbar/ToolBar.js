import React, { Component } from "react"
import PropTypes from "prop-types"
import configs from "../../configs"
import { showMenu, ContextMenu, MenuItem, SubMenu } from "../layout/ContextMenu"
import ToolButton from "./ToolButton"
import { Button } from "../inputs/Button"
import SelectInput from "../inputs/SelectInput"
import NumericStepperInput from "../inputs/NumericStepperInput"
import { TransformMode, SnapMode, TransformPivot } from "../../editor/controls/SpokeControls"
import { TransformSpace } from "../../editor/Editor"
import { ArrowsAlt } from "styled-icons/fa-solid/ArrowsAlt"
import { SyncAlt } from "styled-icons/fa-solid/SyncAlt"
import { ArrowsAltV } from "styled-icons/fa-solid/ArrowsAltV"
import { Globe } from "styled-icons/fa-solid/Globe"
import { Bullseye } from "styled-icons/fa-solid/Bullseye"
import { Magnet } from "styled-icons/fa-solid/Magnet"
import { Bars } from "styled-icons/fa-solid/Bars"
import { Grid } from "styled-icons/boxicons-regular/Grid"
import { Play } from "styled-icons/fa-solid/Play"
import styled from "styled-components"
import styledTheme from "../theme"
import { InfoTooltip } from "../layout/Tooltip"
import { Pause } from "styled-icons/fa-solid"
import DarkModeLightMode from "../../components/DarkModeLightMode"
import ConnectWalletBtn from "../../components/ConnectWalletBtn"
import Loader from "../../components/Loader"

const StyledToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  background: ${props => props.theme.emptyBoxClr};
  user-select: none;
`

const ToolButtons = styled.div`
  width: auto;
  height: inherit;
  display: flex;
  flex-direction: row;
  width: 275px;
  gap: 16px;
  // padding: 0 20px;
  background: ${props => props.theme.darkClr};
`

const ToolToggles = styled.div`
  width: auto;
  height: inherit;
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.emptyBoxClr};
  align-items: center;
  gap: 16px;
  margin-left: -100px;
`

// const Spacer = styled.div`
//   flex: 1;
// `

const PublishButton = styled(Button)`
  align-self: center;
  padding: 8px 32px;
  font-size: 12px;
  border-radiusL 2px;
  background: #0092FF;
  border-radius: 2px;
  color: #fff;
  transition-duration: 8s;
  transition-delay: 7s;
  font-weight: 700;
  &:hover {
    color: #fff;
  }
`

const ToggleContent = styled.div`
  cursor: pointer;
`
const ToolBotton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 16px;
`

const snapInputStyles = {
  container: base => ({
    ...base,
    width: "80px"
  }),
  control: base => ({
    ...base,
    backgroundColor: styledTheme.inputBackground,
    minHeight: "24px",
    borderRadius: "0px",
    borderWidth: "0px",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    padding: "5px 0",
    "&:hover": {
      background: "red"
    }
  })
}

const rightSnapInputStyles = {
  container: base => ({
    ...base,
    width: "80px"
  }),
  control: base => ({
    ...base,
    background: "#111111",
    minHeight: "24px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderWidth: "0px 0px 0px 1px",
    borderColor: styledTheme.border,
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    padding: "5px 0",
    ":hover": {
      borderColor: "red"
    }
  })
}

const selectInputStyles = {
  container: base => ({
    ...base,
    width: "100px"
  }),
  control: base => ({
    ...base,
    background: "#111111",
    minHeight: "24px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderWidth: "0px",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    padding: "5px 0px",
    "&:hover": {
      background: "red"
    }
  })
}

const StyledToggleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 32px;
  background: ${props => props.theme.toolbarClr};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`

function ToggleButton({ tooltip, children, ...rest }) {
  return (
    <InfoTooltip info={tooltip}>
      <StyledToggleButton {...rest}>{children}</StyledToggleButton>
    </InfoTooltip>
  )
}

ToggleButton.propTypes = {
  tooltip: PropTypes.string,
  children: PropTypes.node
}

const ToolbarInputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(119, 119, 119, 0.3);
  border-radius: 5px;
  // border: 1px solid ${props => props.theme.border};
  // border-radius: 4px;
  margin: 0 4px;
`

const ToolbarNumericStepperInput = styled(NumericStepperInput)`
  width: 86px;
  height: 32px;

  input {
    border-width: 0;
    color: ${props => props.theme.text};
    background: ${props => props.theme.toolbarClr};
  }

  button {
    border-width: 0px 1px 0px 1px;

    &:first-child {
      border-radius: 0;
    }

    &:last-child {
      border-right-width: 0;
      border-left-width: 0;
    }
  }
`

const SelectInputLine = styled.div`
  margin-right: 2px;
`

const GlobeIcon = styled.div`
  svg {
    color: ${props => props.theme.svgIconClr};
  }
`

const WalletConnect = styled.div`
  margin-top: 9px;
`

const translationSnapOptions = [
  { label: "0.1m", value: 0.1 },
  { label: "0.125m", value: 0.125 },
  { label: "0.25m", value: 0.25 },
  { label: "0.5m", value: 0.5 },
  { label: "1m", value: 1 },
  { label: "2m", value: 2 },
  { label: "4m", value: 4 }
]

const rotationSnapOptions = [
  { label: "1°", value: 1 },
  { label: "5°", value: 5 },
  { label: "10°", value: 10 },
  { label: "15°", value: 15 },
  { label: "30°", value: 30 },
  { label: "45°", value: 45 },
  { label: "90°", value: 90 }
]

const transformPivotOptions = [
  { label: "Selection", value: TransformPivot.Selection },
  { label: "Center", value: TransformPivot.Center },
  { label: "Bottom", value: TransformPivot.Bottom }
]

const transformSpaceOptions = [
  { label: "Selection", value: TransformSpace.LocalSelection },
  { label: "World", value: TransformSpace.World }
]

export default class ToolBar extends Component {
  static propTypes = {
    menu: PropTypes.array,
    editor: PropTypes.object,
    onPublish: PropTypes.func,
    onOpenScene: PropTypes.func,
    isPublishedScene: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      editorInitialized: false,
      menuOpen: false
    }
  }

  componentDidMount() {
    const editor = this.props.editor
    editor.addListener("initialized", this.onEditorInitialized)
    editor.addListener("playModeChanged", this.onForceUpdate)
    editor.addListener("settingsChanged", this.onForceUpdate)
  }

  onEditorInitialized = () => {
    const editor = this.props.editor
    editor.spokeControls.addListener("transformModeChanged", this.onForceUpdate)
    editor.spokeControls.addListener("transformSpaceChanged", this.onForceUpdate)
    editor.spokeControls.addListener("transformPivotChanged", this.onForceUpdate)
    editor.spokeControls.addListener("snapSettingsChanged", this.onForceUpdate)
    editor.addListener("gridHeightChanged", this.onForceUpdate)
    editor.addListener("gridVisibilityChanged", this.onForceUpdate)
    this.setState({ editorInitialized: true })
  }

  componentWillUnmount() {
    const editor = this.props.editor
    editor.removeListener("initialized", this.onEditorInitialized)

    if (editor.spokeControls) {
      editor.spokeControls.removeListener("transformModeChanged", this.onForceUpdate)
      editor.spokeControls.removeListener("transformSpaceChanged", this.onForceUpdate)
      editor.spokeControls.removeListener("transformPivotChanged", this.onForceUpdate)
      editor.spokeControls.removeListener("snapSettingsChanged", this.onForceUpdate)
      editor.removeListener("gridHeightChanged", this.onForceUpdate)
      editor.removeListener("gridVisibilityChanged", this.onForceUpdate)
      editor.removeListener("playModeChanged", this.onForceUpdate)
      editor.removeListener("settingsChanged", this.onForceUpdate)
    }
  }

  onForceUpdate = () => {
    this.forceUpdate()
  }

  onMenuSelected = e => {
    if (!this.state.menuOpen) {
      const x = 0
      const y = e.currentTarget.offsetHeight
      showMenu({
        position: { x, y },
        target: e.currentTarget,
        id: "menu"
      })

      this.setState({ menuOpen: true })
      window.addEventListener("mousedown", this.onWindowClick)
    }
  }

  onWindowClick = () => {
    window.removeEventListener("mousedown", this.onWindowClick)
    this.setState({ menuOpen: false })
  }

  renderMenu = menu => {
    if (!menu.items || menu.items.length === 0) {
      return (
        <MenuItem key={menu.name} onClick={menu.action}>
          {menu.name}
          {menu.hotkey && <div>{menu.hotkey}</div>}
        </MenuItem>
      )
    } else {
      return (
        <SubMenu key={menu.name} title={menu.name} hoverDelay={0}>
          {menu.items.map(item => {
            return this.renderMenu(item)
          })}
        </SubMenu>
      )
    }
  }

  onSelectTranslate = () => {
    this.props.editor.spokeControls.setTransformMode(TransformMode.Translate)
  }

  onSelectRotate = () => {
    this.props.editor.spokeControls.setTransformMode(TransformMode.Rotate)
  }

  onSelectScale = () => {
    this.props.editor.spokeControls.setTransformMode(TransformMode.Scale)
  }

  onToggleTransformSpace = () => {
    this.props.editor.spokeControls.toggleTransformSpace()
  }

  onChangeTransformPivot = transformPivot => {
    this.props.editor.spokeControls.setTransformPivot(transformPivot)
  }

  onToggleTransformPivot = () => {
    this.props.editor.spokeControls.changeTransformPivot()
  }

  onToggleSnapMode = () => {
    this.props.editor.spokeControls.toggleSnapMode()
  }

  onChangeTranslationSnap = translationSnap => {
    this.props.editor.spokeControls.setTranslationSnap(parseFloat(translationSnap))
    this.props.editor.spokeControls.setSnapMode(SnapMode.Grid)
  }

  onChangeScaleSnap = scaleSnap => {
    this.props.editor.spokeControls.setScaleSnap(scaleSnap)
  }

  onChangeRotationSnap = rotationSnap => {
    this.props.editor.spokeControls.setRotationSnap(parseFloat(rotationSnap))
    this.props.editor.spokeControls.setSnapMode(SnapMode.Grid)
  }

  onChangeGridHeight = value => {
    this.props.editor.setGridHeight(value)
  }

  onToggleGridVisible = () => {
    this.props.editor.toggleGridVisible()
  }

  onTogglePlayMode = () => {
    if (this.props.editor.playing) {
      this.props.editor.leavePlayMode()
    } else {
      this.props.editor.enterPlayMode()
    }
  }

  render() {
    const { editorInitialized, menuOpen } = this.state

    if (!editorInitialized) {
      return <StyledToolbar />
    }

    const {
      transformMode,
      transformSpace,
      transformPivot,
      snapMode,
      translationSnap,
      rotationSnap
    } = this.props.editor.spokeControls

    return (
      <>
        <StyledToolbar>
          <ToolButtons>
            <ToolButton icon={Bars} onClick={this.onMenuSelected} selected={menuOpen} id="menu" />
            <ToolButton
              id="translate-button"
              tooltip="[T] Translate"
              icon={ArrowsAlt}
              onClick={this.onSelectTranslate}
              selected={transformMode === TransformMode.Translate}
            />
            <ToolButton
              id="rotate-button"
              tooltip="[R] Rotate"
              icon={SyncAlt}
              onClick={this.onSelectRotate}
              selected={transformMode === TransformMode.Rotate}
            />
            <ToolButton
              id="scale-button"
              tooltip="[Y] Scale"
              icon={ArrowsAltV}
              onClick={this.onSelectScale}
              selected={transformMode === TransformMode.Scale}
            />
          </ToolButtons>
          <ToolToggles>
            <ToolbarInputGroup id="transform-space">
              <InfoTooltip info="[Z] Toggle Transform Space" position="bottom">
                <ToggleButton onClick={this.onToggleTransformSpace}>
                  <GlobeIcon>
                    <Globe size={12} />
                  </GlobeIcon>
                </ToggleButton>
              </InfoTooltip>

              <SelectInput
                styles={selectInputStyles}
                onChange={this.onChangeTransformSpace}
                options={transformSpaceOptions}
                value={transformSpace}
              />
            </ToolbarInputGroup>
            <ToolbarInputGroup id="transform-pivot">
              <ToggleButton onClick={this.onToggleTransformPivot} tooltip="[X] Toggle Transform Pivot">
                <GlobeIcon>
                  <Bullseye size={12} />
                </GlobeIcon>
              </ToggleButton>
              <SelectInput
                styles={selectInputStyles}
                onChange={this.onChangeTransformPivot}
                options={transformPivotOptions}
                value={transformPivot}
              />
            </ToolbarInputGroup>
            <ToolbarInputGroup id="transform-snap">
              <ToggleButton
                value={snapMode === SnapMode.Grid}
                onClick={this.onToggleSnapMode}
                tooltip={"[C] Toggle Snap Mode"}
              >
                <GlobeIcon>
                  <Magnet size={12} />
                </GlobeIcon>
              </ToggleButton>
              <SelectInputLine>
                <SelectInput
                  styles={snapInputStyles}
                  onChange={this.onChangeTranslationSnap}
                  options={translationSnapOptions}
                  value={translationSnap}
                  placeholder={translationSnap + "m"}
                  formatCreateLabel={value => "Custom: " + value + "m"}
                  isValidNewOption={value => value.trim() !== "" && !isNaN(value)}
                  creatable
                />
              </SelectInputLine>
              <SelectInput
                styles={rightSnapInputStyles}
                onChange={this.onChangeRotationSnap}
                options={rotationSnapOptions}
                value={rotationSnap}
                placeholder={rotationSnap + "°"}
                formatCreateLabel={value => "Custom: " + value + "°"}
                isValidNewOption={value => value.trim() !== "" && !isNaN(value)}
                creatable
              />
            </ToolbarInputGroup>
            <ToolbarInputGroup id="transform-grid">
              <ToggleButton onClick={this.onToggleGridVisible} tooltip="Toggle Grid Visibility">
                <GlobeIcon>
                  <Grid size={16} />
                </GlobeIcon>
              </ToggleButton>
              <ToolbarNumericStepperInput
                value={this.props.editor.grid.position.y}
                onChange={this.onChangeGridHeight}
                precision={0.01}
                smallStep={0.25}
                mediumStep={1.5}
                largeStep={4.5}
                unit="m"
                incrementTooltip="[-] Increment Grid Height"
                decrementTooltip="[=] Decrement Grid Height"
              />
            </ToolbarInputGroup>
            {this.props.editor.settings.enableExperimentalFeatures && (
              <ToolbarInputGroup id="preview">
                <ToggleButton
                  onClick={this.onTogglePlayMode}
                  tooltip={this.props.editor.playing ? "Stop Previewing Scene" : "Preview Scene"}
                >
                  {this.props.editor.playing ? (
                    <GlobeIcon>
                      <Pause size={14} />
                    </GlobeIcon>
                  ) : (
                    <GlobeIcon>
                      <Play size={14} />
                    </GlobeIcon>
                  )}
                </ToggleButton>
              </ToolbarInputGroup>
            )}
          </ToolToggles>
          {/* <Spacer /> */}

          <ToolBotton>
            {this.props.isPublishedScene && (
              <PublishButton onClick={this.props.onOpenScene}>
                {configs.isMoz() ? "Open in Hubs" : "Open Scene"}
              </PublishButton>
            )}

            <ToggleContent>
              <DarkModeLightMode />
            </ToggleContent>
            {/* <DarkModeToggleButton /> */}
            <PublishButton id="publish-button" onClick={this.props.onPublish} style={{ borderRadius: "2px" }}>
              {configs.isMoz() ? "Publish to Hubs..." : "Publish Scene..."}
            </PublishButton>

            <WalletConnect>
              <ConnectWalletBtn />
            </WalletConnect>
            <ContextMenu id="menu">
              {this.props.menu.map(menu => {
                return this.renderMenu(menu)
              })}
            </ContextMenu>
          </ToolBotton>
        </StyledToolbar>
        <Loader />
      </>
    )
  }
}
