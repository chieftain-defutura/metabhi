import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CaretRight } from "styled-icons/fa-solid/CaretRight";
import { CaretDown } from "styled-icons/fa-solid/CaretDown";

const CollapsibleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
 
`;

const CollapsibleLabel = styled.div`
  color: ${props => props.theme.text2};
  // background-color: ${props => props.theme.disabled};
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  // width:100%;
  padding: 12px;
  margin:8px;
  align-items:center;
  overflow:hidden;
  justify-content:space-between ;
  :hover {
    color: ${props => props.theme.text};
  }
`;

const CollapsibleContent = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 4px 8px;
  width:100%;
  ul{
    display: flex;
  }

`;
// const Collapsel = styled.div`
// display: flex;
// flex-direction: row;
//  `

const CollapseIcon = styled.div``;

export default function Collapsible({ label, open, children }) {
  const [collapsed, setCollapsed] = useState(!open);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(collapsed => !collapsed);
  }, [setCollapsed]);

  return (
    <div>
    <CollapsibleContainer>
      <CollapsibleLabel onClick={toggleCollapsed}>
        <CollapseIcon as={collapsed ? CaretRight : CaretDown} size={14} collapsed={collapsed} />
        {label}
      </CollapsibleLabel>
    {!collapsed && <CollapsibleContent collapsed={collapsed}>{children}</CollapsibleContent>}
    </CollapsibleContainer>
    </div>
  );  
}

Collapsible.defaultProps = {
  open: false
};

Collapsible.propTypes = {
  open: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.node
};
