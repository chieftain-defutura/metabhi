import React, { useContext } from "react"
import { TransactionContext } from "../ui/contexts/TransactionContext"
import styled from "styled-components"

const Loading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.emptyBoxClr};
  color: ${props => props.theme.text};
  padding: 24px;
  width: 32%;
  aspect-ratio: 16 / 9;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`

const Loader = () => {
  const { loading } = useContext(TransactionContext)
  if (!loading) return null
  return <Loading>Transaction Processing...</Loading>
}

export default Loader
