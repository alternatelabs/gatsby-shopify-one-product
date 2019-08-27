import React from "react"
import styled from "@emotion/styled"
import { connect } from "react-redux"
import { dispatch } from "../store"
import { currency as currencyFormat } from "../utils/formatters"
import Button from "./button"
import Spinner from "./Spinner"

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

const Loading = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.6);
  pointer-events: ${props => props.open ? 'all' : 'none'};
  opacity: ${props => props.open ? 1 : 0};
  transition: opacity 0.4s ease-in-out;
  z-index: 100;
`

const CloseCross = styled.span`
position: absolute;
top: 16px;
right: 20px;
z-index: 200;
cursor: pointer;
width: 40px;
height: 40px;
line-height: 40px;
font-size: 32px;
color: #9b9b9b;
font-weight: 300;
text-align: center;
`

const Cart = ({ open, items, isLoading, total, subtotal, currency, url }) => {
  return (
    <CartWrapper onClick={() => dispatch.cart.hide()} open={open}>
      <CartBox open={open} onClick={e => e.stopPropagation()}>
        <CloseCross onClick={() => dispatch.cart.hide()}>&times;</CloseCross>

        <h3>Your Cart</h3>

        <Loading open={isLoading}>
          <Spinner />
        </Loading>

        {items.length < 1 &&
          <span className="mt6 light-silver tc f3 fw6">Your shopping cart is empty.</span>
        }

        {items.map(item => (
          <div key={item.id} className="flex items-center">
            <img src={item.variant.image.src} alt={item.title} style={{ width: 80, marginBottom: 0 }} />
            <div className="ml3">
              <h5 style={{ marginBottom: 0 }}>{item.title}</h5>
              <span className="f7 light-silver fw7">{item.variant.sku}</span>
              <div className="flex justify-between items-center">
                <span className="fw7 f6">
                  {currencyFormat(item.variant.priceV2.amount, item.variant.priceV2.currency)}
                </span>
                <input type="number" value={item.quantity} onChange={e => dispatch.cart.updateItem({ id: item.id, quantity: parseInt(e.target.value) })} style={{ width: 60 }} className="tc" />
                <span className="f4 fim silver fw6 pointer" onClick={e => dispatch.cart.removeItem({ id: item.id })}>&times;</span>
              </div>
            </div>
          </div>
        ))}

        {items.length > 0 &&
          <div className="mt4">
            <div className="mb3 pt3 lh-copy bt b--near-white">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currencyFormat(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <strong>{currencyFormat(total, currency)}</strong>
              </div>
            </div>

            <Button fullWidth onClick={() => { window.location.href = url }}>Checkout</Button>
          </div>
        }
      </CartBox>
    </CartWrapper>
  )
}

const mapState = state => ({
  open: state.cart.open,
  items: state.cart.items,
  isLoading: state.cart.isLoading,
  total: state.cart.total,
  subtotal: state.cart.subtotal,
  currency: state.cart.currency,
  url: state.cart.url,
})

export default connect(mapState)(Cart)
