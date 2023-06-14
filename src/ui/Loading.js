import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => (props.fullScreen ? "100vh" : "100%")};
  width: ${props => (props.fullScreen ? "100vw" : "100%")};
  min-height: 300px;

  span {
    width: 100px;
    height: 100px;
    background: transparent;
    border-radius: 50%;
    border-top: 1px solid ${props => props.theme.blue};
    animation: spin 2s linear infinite;
    margin-bottom: 50px;

    @keyframes spin {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  svg {
    margin-bottom: 20px;
  }
  img {
    width: 100px;
    height: 100px;
  }
`

export default class Loading extends Component {
  static propTypes = {
    message: PropTypes.string,
    fullScreen: PropTypes.bool
  }

  render() {
    return (
      <StyledLoading fullScreen={this.props.fullScreen}>
        <span></span>
        {/* <SpokeLogo /> */}
        {this.props.message}
      </StyledLoading>
    )
  }
}
