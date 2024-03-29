import styled from "styled-components"

export const Button = styled.button.attrs(props => ({
  type: props.type || "button"
}))`
  display: flex;
  border: none;
  border-radius: 5px;
  background: ${props => props.theme.emptyBoxClr};
  color: ${props => props.theme.text};
  white-space: nowrap;
  min-height: 24px;
  font-size: 12px;
  font-family: "Lato", sans-serif;
  text-align: center;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 8px 32px;
  font-weight: 700;
  border: 1px solid ${props => props.theme.blue};

  &:hover {
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.blue};
  }

  &:active {
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.blue};
    // background-color: ${props => props.theme.bluePressed};
  }

  &:disabled {
    border: 1px solid ${props => props.theme.blue};
    color: ${props => props.theme.disabledText};

    &:hover {
      // background-color: ${props => props.theme.disabled};
      border: 1px solid ${props => props.theme.blue};
    }
  }
`

export const MediumButton = styled(Button)`
  line-height: 1em;
  height: 3em;
  padding: 1em;
`

export const LargeButton = styled(Button)`
  min-height: 24px;
  padding: 1em 2em;
  font-size: 1.5em;
`

export const SecondaryButton = styled(Button)`
  background-color: ${props => props.theme.hover};
  color: ${props => props.theme.text};

  &:hover {
    background-color: ${props => props.theme.text2};
  }

  &:active {
    background-color: ${props => props.theme.text2};
  }

  &:disabled {
    background-color: ${props => props.theme.disabled};
    color: ${props => props.theme.disabledText};

    &:hover {
      background-color: transparent;
    }
  }
`

export const MenuButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.text2};
  padding: 1px 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    background-color: transparent;
    color: ${props => props.theme.disabledText};

    &:hover {
      background-color: transparent;
    }
  }
`

export const PropertiesPanelButton = styled(Button)`
  align-self: center;
  justify-content: center;
  padding: 4px 0;
  margin: 18px 0;
  width: 200px;
  font-weigth: 700;
`
