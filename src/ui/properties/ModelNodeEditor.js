import React, { Component } from "react";
import { useState } from "react";
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
// display:flex;
// flex-direction:row;
`
const InputGroupSction =styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`
const BooleanToggle = styled.div`
position:relative;
right:100px;
`
const BooleanToggleShadow = styled.div`
position:relative;
right:100px;
`
const GltfInfoSection = styled.div`
display:flex;
flex-direction:row;
justify-content:space-evenly;
padding:12px 0;
` 
const AttributionSection = styled.div`
` 

export default class ModelNodeEditor extends Component {
  static propTypes = {
    editor: PropTypes.object,
    node: PropTypes.object,
    multiEdit: PropTypes.bool
  };

  static iconComponent = Cube;

  static description = "A 3D model in your scene, loaded from a GLTF URL or file.";

  constructor() {
    super();
    this.state = {toggle: false ? "false":"true" };
  }


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
  
  handleToggle(value){
    this.setState({toggle:value})
  }

  render() {
    const node = this.props.node;

    return (
      <NodeEditor description={ModelNodeEditor.description} {...this.props}>
            <GltfInfoSection >
              <h3 onClick={()=>this.handleToggle(false)}>GltfInfo</h3>
              <h3 onClick={()=>this.handleToggle(true)}>Attribution</h3>
             </GltfInfoSection>
        <InputGltfInfo>
          {!this.state.toggle && <GLTFInfo node={node} />}
        <AttributionSection>
          {this.state.toggle && <AttributionNodeEditor name="Attribution" {...this.props} />}
        </AttributionSection>
      </InputGltfInfo><InputGroup name="Model Url">
          <ModelInput value={node.src} onChange={this.onChangeSrc} />
        </InputGroup><InputGroup name="Loop Animation">
          <SelectInput
            disabled={this.isAnimationPropertyDisabled()}
            options={node.getClipOptions()}
            value={node.activeClipItems}
            onChange={this.onChangeAnimation}
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti />
        </InputGroup><InputGroupSction>
          <InputGroup name="Collidable">
          </InputGroup>
          <BooleanToggle>
            <BooleanInput value={node.collidable} onChange={this.onChangeCollidable} />
          </BooleanToggle>
        </InputGroupSction><InputGroupSction>
          <InputGroup name="Walkable">
          </InputGroup>
          <BooleanToggle>
            <BooleanInput value={node.walkable} onChange={this.onChangeWalkable} />
          </BooleanToggle>
        </InputGroupSction><InputGroupSction>
          <InputGroup name="Cast Shadow">
          </InputGroup>
          <BooleanToggleShadow>
            <BooleanInput value={node.castShadow} onChange={this.onChangeCastShadow} />
          </BooleanToggleShadow>
        </InputGroupSction><InputGroupSction>
          <InputGroup name="Receive Shadow">
          </InputGroup>
          <BooleanToggleShadow>
            <BooleanInput value={node.receiveShadow} onChange={this.onChangeReceiveShadow} />
          </BooleanToggleShadow>
        </InputGroupSction><InputGroupSction>
          <InputGroup name="Combine">
          </InputGroup>
          <BooleanToggle>
            <BooleanInput value={node.combine} onChange={this.onChangeCombine} />
          </BooleanToggle>
        </InputGroupSction><InputGroupSction>
          <InputGroup name="Billboard" info="Model always faces user in Hubs. Does not billboard in Spoke.">
          </InputGroup>
          <BooleanToggle>
            <BooleanInput value={node.billboard} onChange={this.onChangeBillboard} />
          </BooleanToggle>
        </InputGroupSction>
        
      </NodeEditor>
    );
  }
}
