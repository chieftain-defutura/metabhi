import React, { Component } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import SelectInput from "../inputs/SelectInput";
import InputGroup from "../inputs/InputGroup";
import BooleanInput from "../inputs/BooleanInput";
import ModelInput from "../inputs/ModelInput";
import { Cube } from "styled-icons/fa-solid/Cube";
import { GLTFInfo } from "../inputs/GLTFInfo";
import AttributionNodeEditor from "./AttributionNodeEditor";
import styled from "styled-components";

const InputGltfInfo = styled.div`
display:flex;
flex-direction:row;
`
const InputGroupSction =styled.div`
display:flex;
flex-direction:row;
justify-content:start;
`

export default class ModelNodeEditor extends Component {
  static propTypes = {
    editor: PropTypes.object,
    node: PropTypes.object,
    multiEdit: PropTypes.bool
  };

  static iconComponent = Cube;

  static description = "A 3D model in your scene, loaded from a GLTF URL or file.";

  onChangeSrc = (src, initialProps) => {
    this.props.editor.setPropertiesSelected({ ...initialProps, src });
  };

  onChangeAnimation = activeClipItems => {
    this.props.editor.setPropertySelected("activeClipItems", activeClipItems || []);
  };

  onChangeCollidable = collidable => {
    this.props.editor.setPropertySelected("collidable", collidable);
  };

  onChangeWalkable = walkable => {
    this.props.editor.setPropertySelected("walkable", walkable);
  };

  onChangeCastShadow = castShadow => {
    this.props.editor.setPropertySelected("castShadow", castShadow);
  };

  onChangeReceiveShadow = receiveShadow => {
    this.props.editor.setPropertySelected("receiveShadow", receiveShadow);
  };

  onChangeCombine = combine => {
    this.props.editor.setPropertySelected("combine", combine);
  };

  onChangeBillboard = billboard => {
    this.props.editor.setPropertySelected("billboard", billboard);
  };

  isAnimationPropertyDisabled() {
    const { multiEdit, editor, node } = this.props;

    if (multiEdit) {
      return editor.selected.some(selectedNode => selectedNode.src !== node.src);
    }

    return false;
  }

  render() {
    const node = this.props.node;

    return (
      <NodeEditor description={ModelNodeEditor.description} {...this.props}>
        <InputGroup name="Model Url">
          <ModelInput value={node.src} onChange={this.onChangeSrc} />
        </InputGroup>
        <InputGroup name="Loop Animation">
          <SelectInput
            disabled={this.isAnimationPropertyDisabled()}
            options={node.getClipOptions()}
            value={node.activeClipItems}
            onChange={this.onChangeAnimation}
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
          />
        </InputGroup>
        <InputGroupSction>
        <InputGroup name="Collidable">
        </InputGroup>
          <BooleanInput value={node.collidable} onChange={this.onChangeCollidable} />
        </InputGroupSction>
        <InputGroupSction>
        <InputGroup name="Walkable">
        </InputGroup>
        <BooleanInput value={node.walkable} onChange={this.onChangeWalkable} />
        </InputGroupSction>
        <InputGroupSction>
        <InputGroup name="Cast Shadow">
        </InputGroup>
        <BooleanInput value={node.castShadow} onChange={this.onChangeCastShadow} />
        </InputGroupSction>
        <InputGroupSction>
        <InputGroup name="Receive Shadow">
        </InputGroup>
        <BooleanInput value={node.receiveShadow} onChange={this.onChangeReceiveShadow} />
        </InputGroupSction>
        <InputGroupSction>
        <InputGroup name="Combine">
        </InputGroup>
        <BooleanInput value={node.combine} onChange={this.onChangeCombine} />
        </InputGroupSction>
        <InputGroupSction>
        <InputGroup name="Billboard" info="Model always faces user in Hubs. Does not billboard in Spoke.">
        </InputGroup>
        <BooleanInput value={node.billboard} onChange={this.onChangeBillboard} />
        </InputGroupSction>
        <InputGltfInfo>
        {node.model && <GLTFInfo node={node} />}
        <AttributionNodeEditor name="Attribution" {...this.props} />
        </InputGltfInfo>
      </NodeEditor>
    );
  }
}
