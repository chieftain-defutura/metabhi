import React from "react";
import styled from "styled-components";

const DarkModeContainer = styled.div`
  // margin-top: -2px;
  // padding-left: 54px;
  // background: ${props => props.theme.lightDarkClr};
`;
const StyledInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
  &:checked + label {
    background: #242424;
  }
  &:checked + label::after {
    left: 40px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, #777, #3a3a3a);
  }
  &::checked + label + Background {
    background: #242424;
  }
`;

const DarkModeLabel = styled.label`
  width: 46px;
  height: 24px;
  position: relative;
  display: block;
  background: #ebebeb;
  border-radius: 200px;
  box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: 0.3s;
  &:after {
    content: "";
    width: 18px;
    height: 18px;
    position: absolute;
    top: 3px;
    left: 4px;
    background: linear-gradient(180deg, #ffcc89, #d8860b);
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

const DarkModeToggleButton = () => {
  return (
    <DarkModeContainer>
      <StyledInput type="checkbox" id="darkmode-toggle" />
      <DarkModeLabel htmlFor="darkmode-toggle">
        {/* <img src={Moon} alt="" width="50px" height="50px" /> */}

        {/* <img src={Sun} alt="" width="50px" height="50px" /> */}
      </DarkModeLabel>
      <Background></Background>
    </DarkModeContainer>
  );
};

export default DarkModeToggleButton;
