import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const PanelContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 4px;
  background: ${props => props.theme.grayClr};
  overflow: hidden;
  user-select: none;
`;

function treeNodeBackgroundColor({ root, selected, active, theme }) {
  if (selected) {
    if (active) {
      return theme.bluePressed;
    } else {
      return theme.selected;
    }
  } else {
    if (root) {
      return theme.panel2;
    } else {
      return theme.panel;
    }
  }
}

export const PanelToolbar = styled.div`
  display: flex;
  padding: 4px;
  height: 40px;
  align-items: center;
  padding: 13px 24px;
  border-bottom: 1px solid rgba(119, 119, 119, 0.2);
  border-top: 1px solid rgba(119, 119, 119, 0.2);

  color: ${props => (props.selected || props.focused ? props.theme.text : props.theme.text2)};

  :hover,
  :focus {
    background-color: ${props => (props.selected ? props.theme.emptyBoxClr : props.theme.hover)};
    color: ${props => props.theme.text};
  }

  :active {
    background-color: ${treeNodeBackgroundColor};
    color: ${props => props.theme.text};
  }
`;

export const PanelIcon = styled.div`
  margin-right: 8px;
`;

export const PanelTitle = styled.div``;

export const PanelContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export default class Panel extends Component {
  static propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    children: PropTypes.node,
    toolbarContent: PropTypes.node
  };

  render() {
    const { icon, title, children, toolbarContent, ...rest } = this.props;

    // .toolbar used for onboarding

    return (
      <PanelContainer {...rest}>
        <PanelToolbar className="toolbar">
          {icon && <PanelIcon as={icon} size={12} />}
          <PanelTitle>{title}</PanelTitle>
          {toolbarContent}
        </PanelToolbar>

        <PanelContent>{children}</PanelContent>
      </PanelContainer>
    );
  }
}
