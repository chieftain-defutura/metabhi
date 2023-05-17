import styled from "styled-components";

const Well = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.emptyBoxClr};
  border-radius: 5px;
  padding: 12px 14px;
  margin: 8px;
`;

Well.displayName = "Well";

export default Well;
