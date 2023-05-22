import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  outline: none;
  overflow: hidden;
  user-select: none;
  font-weight:600;
  min-height: 24px;
  padding: 13px 24px;
  align-items: center;
  color: ${props => (props.selected || props.focused ? props.theme.text : props.theme.text2)};
  background: ${props => props.theme.grayClr};
  // background-color: ${props => (props.selected ? props.theme.selected : props.theme.panel2)};

  :nth-child(odd) {
    // background-color: ${props => (props.selected ? props.theme.selected : props.theme.panel)};
  }
  :hover, 
  :focus {
    background-color: ${props => (props.selected ? props.theme.emptyBoxClr : props.theme.hover)};
    color: ${props => props.theme.text};
  }

  :active {
    // background-color: ${props => props.theme.bluePressed};
    color: ${props => props.theme.text};
  }
`;

const ListItemIcon = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

export function IconListItem({ iconComponent, children, ...rest }) {
  return (
    <ListItem {...rest}>
      <ListItemIcon as={iconComponent} />
      {children}
    </ListItem>
  );
}

IconListItem.propTypes = {
  iconComponent: PropTypes.object.isRequired,
  children: PropTypes.node
};

export const List = styled.ul`
  height: 100%;
  overflow-y: auto;
`;
