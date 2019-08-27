import React from "react"
import styled from "@emotion/styled"

const CartWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  pointer-events: ${props => props.open ? 'all' : 'none'};
  opacity: ${props => props.open ? 1 : 0};
  transition: opacity 0.4s ease-in-out;
`

const CartBox = styled.div`
  position: absolute;
  top: 0;
  transition: right 0.2s ease-in-out;
  right: ${props => props.open ? "0" : "-100%" };
  bottom: 0;
  width: 100%;
  max-width: 375px;
  padding: 30px;
  background: #fff;
`

const Cart = ({ open, onClose }) => {
  return (
    <CartWrapper onClick={onClose} open={open}>
      <CartBox open={open} onClick={e => e.stopPropagation()}>
        Cart
      </CartBox>
    </CartWrapper>
  )
}

export default Cart
