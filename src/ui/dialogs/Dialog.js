import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { Button } from "../inputs/Button"
import { useAccount } from "wagmi"
import styled from "styled-components"
import ConnectWalletBtn from "../../components/ConnectWalletBtn"

const DialogContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 4px;
  background-color: ${props => props.theme.black};
  max-width: 800px;
  min-width: 400px;
  min-height: 150px;
`

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 12px;
  overflow: hidden;
  height: 32px;
  font-weight: 400;
  background-color: ${props => props.theme.darkGray};
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  > * {
    display: flex;
    align-items: center;
  }
`

export const DialogContent = styled.div`
  color: ${props => props.theme.text};
  display: flex;
  flex: 1;
  flex-direction: row;
  /* This forces firefox to give the contents a proper height. */
  overflow: hidden;
  background: ${props => props.theme.dropdown};
  padding: 8px;
  min-height: 100px;

  h1 {
    font-size: 2em;
    color: ${props => props.theme.text};
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 12px;
    line-height: 1.5em;
  }
`

const DialogBottomNav = styled.div`
  display: flex;
  height: 64px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: ${props => props.theme.darkGray};
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  padding: 8px;

  .primary-save-btn {
    border: 1px solid #0092ff;
  }
  .save-btn {
    background: linear-gradient(92.34deg, #002bff -0.06%, #0092ff 99.94%);
    color: #fff;
    &:hover {
      border: none;
    }
  }

  a {
    color: ${props => props.theme.text2};
  }

  button {
    min-width: 84px;
  }

  & > * {
    margin: 0 8px;
  }
`

export default function Dialog({
  tag,
  title,
  onCancel,
  cancelLabel,
  onConfirm,
  confirmLabel,
  bottomNav,
  onSubmit,
  children,
  ...rest
}) {
  const { isConnected } = useAccount()

  const onSubmitForm = useCallback(
    async e => {
      if (!onConfirm) return
      onConfirm(e)
    },
    [onConfirm]
  )

  return (
    <>
      <DialogContainer as={tag} onSubmit={onSubmitForm} {...rest}>
        <DialogHeader>
          <span>{title}</span>
        </DialogHeader>
        <DialogContent>{children}</DialogContent>
        {(onConfirm || onCancel || bottomNav) && (
          <DialogBottomNav>
            {bottomNav}
            {onCancel && (
              <Button className="primary-save-btn" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            {!isConnected ? (
              <ConnectWalletBtn />
            ) : (
              <>
                {onConfirm && (
                  <>
                    <Button className="save-btn" type="submit" onClick={tag === "form" ? null : onConfirm}>
                      {confirmLabel}
                    </Button>
                    <Button className="save-btn" type="submit" onClick={onSubmit}>
                      Mint
                    </Button>
                  </>
                )}
              </>
            )}
          </DialogBottomNav>
        )}
      </DialogContainer>
    </>
  )
}

Dialog.propTypes = {
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string.isRequired,
  bottomNav: PropTypes.node,
  onSubmit: PropTypes.func,
  children: PropTypes.node
}

Dialog.defaultProps = {
  tag: "form",
  confirmLabel: "Ok",
  cancelLabel: "Cancel"
}
