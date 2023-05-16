// import React,{useState} from 'react'
// import styled from 'styled-components'

// export const ToggleButton=styled.div`

// `
// const ToggleInput = styled.input`
//   width: 0;
//   height: 0;
//   visibility: hidden;
//   &:checked + label {
//     background: #4FEE48;
//   }
//   &:checked + label::after {
//     left: 25px;
//     transform: translateX(-100%);
//     background: linear-gradient(180deg, #777777, #FFFFFF);
//   }
//   &::checked + label + Background {
//     background: #4FEE48;
//   }
// `;

// const ToggleLabel = styled.label`
//   width: 24px;
//   height: 10px;
//   position: relative;
//   display: block;
//   background:#FFFFFF ;
//   border-radius: 200px;
//   box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
//   cursor: pointer;
//   transition: 0.3s;
//   &:after {
//     content: "";
//     width: 10px;
//     height: 10px;
//     position: absolute;
//     left:2px;
//     background: linear-gradient(180deg, #FFFFFF,#999999);
//     border-radius: 180px;
//     box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
//     transition: 0.3s;
//   }
//   &:active::after {
//     width: 16px;
//   }
// `;

// const Background = styled.div`
//   background: #fff;
//   z-index: -100;
//   position: absolute;
//   transition: 0.3s;
// `;
// const Toggle = () => {
//   const [toggle, setToggle] = useState(false)

//   const ToggleClick = ()=>{
//     setToggle(!toggle)
//     console.log(toggle)
//   }
//   return (
//  <ToggleButton onChange={ToggleClick }>
//     <ToggleInput type="checkbox" id="dark"  />
//     <ToggleLabel  htmlFor="dark">
      
//     </ToggleLabel>
//     <Background></Background>
//  </ToggleButton>

//   )
// }

// export default Toggle;
import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import styled from "styled-components";

let uniqueId = 0;

const ToggleInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
  &:checked + label {
    background: #4FEE48;
  }
  &:checked + label::after {
    left: 25px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, #777777, #FFFFFF);
  }
  &::checked + label + Background {
    background: #4FEE48;
  }
`;

const ToggleLabel = styled.label`
  width: 24px;
  height: 10px;
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
    background: linear-gradient(180deg, #FFFFFF,#999999);
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  &:active::after {
    width: 16px;
  }
`;

const Background = styled.div`
  background: #fff;
  z-index: -100;
  position: absolute;
  transition: 0.3s;
`;

export default class Toggle extends Component{
  
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

  render(){
    const { value, onChange, ...rest } = this.props;
  const [toggle, setToggle] = useState(false)

  const ToggleClick = ()=>{
    setToggle(!toggle)
    console.log(toggle)
  }

    return(
      <div>
    <ToggleButton onChange={ToggleClick }>
     <ToggleInput type="checkbox" id="dark"  />
     <ToggleLabel  htmlFor="dark">
      
    </ToggleLabel>
     <Background></Background>
  </ToggleButton>
      </div>
    )
  }
}