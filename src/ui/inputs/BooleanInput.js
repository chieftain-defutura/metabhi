import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import styled from "styled-components";
import { Check } from "styled-icons/fa-solid";
import Toggle from "../Toggle";

let uniqueId = 0;
//input
const StyledBooleanInput = styled.input`
  // display: none;
  // :disabled ~ label {
  //   background-color: ${props => props.theme.disabled};
  //   color: ${props => props.theme.disabledText};
  // }
  width: 0;
  height: 0;
  visibility: hidden;
  &:checked + label {
    background: #4FEE48;
  }
  &:checked + label::after {
    left: 24px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, #777777, #FFFFFF);
  }
  &::checked + label + Background {
    background: #4FEE48;
  }
`;
//label
const BooleanInputLabel = styled(Input).attrs(() => ({ as: "label" }))`
  // width: 18px;
  // height: 18px;
  // margin: 4px;
  // cursor: pointer;
  // display: block;
  // position: relative;

  width: 26px;
  height: 12px;
  position: relative;
  display: block;
  background:#FFFFFF ;
  border-radius: 200px;
  box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: 0.3s;


  
  &:after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    left:2px;
    top:1px;
    background: linear-gradient(180deg, #FFFFFF,#999999);
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  // &:active::after {
  //   width: 16px;
  // }
  
`;
//check
const BooleanCheck = styled(Check)`
  // position: absolute;
  // top: 3px;
  // left: 2px;
  // color: ${props => props.theme.pink};

`;

export default class BooleanInput extends Component {

  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: false,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.checkboxId = `boolean-input-${uniqueId++}`;
  }

  onChange = e => {
    this.props.onChange(e.target.checked);
  };

  render() {
    const { value, onChange, ...rest } = this.props;

    return (
      
      <div>
        <StyledBooleanInput {...rest} id={this.checkboxId} type="checkbox" checked={value} onChange={this.onChange} />
        <BooleanInputLabel htmlFor={this.checkboxId}></BooleanInputLabel>
        {/* <Toggle {...rest} id={this.checkboxId} type="checkbox" checked={value} onChange={this.onChange} /> */}
      </div>
    );
  }
}
