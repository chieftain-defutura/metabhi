import styled from "styled-components";

export const PropertyLabel = styled.label`
  ${props =>
    (props.modified &&
      `font-weight: 400;
       color: ${props.theme.text};`) ||
    `font-weight: 400;
      color: ${props.theme.text}
    `}
    
`;
