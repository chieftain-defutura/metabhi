import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { InfoTooltip } from "../layout/Tooltip";

const StyledToolButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  color: ${props => props.theme.white};
  cursor: pointer;
  position: relative;
  background: ${props => props.theme.darkClr};

 

  // background-color: ${props => (props.selected ? props.theme.blue : props.theme.toolbar)};

  &:hover {
    background: rgba(0, 43, 255, 0.4);
    border: 1px solid rgba(0, 146, 255, 0.2);
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  font-size: 14px;
  color: ${props => props.theme.svgIconClr};
`;

export default function ToolButton({ id, icon, onClick, selected, tooltip }) {
  return (
    <InfoTooltip id={id} info={tooltip} position="bottom">
      <StyledToolButton selected={selected} onClick={onClick}>
        <Icon as={icon} />
      </StyledToolButton>
    </InfoTooltip>
  );
}

ToolButton.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  tooltip: PropTypes.string
};
