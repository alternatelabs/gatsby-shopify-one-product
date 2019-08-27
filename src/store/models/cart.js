import client from "../../utils/shopify"

export default {
  state: {
    open: false,
    numberItems: 0,
    items: [],
    total: 0,
    subtotal: 0,
    currency: "GBP",
    checkoutId: null,
    url: null,
    isLoading: false,
  },
  reducers: {
    setLoading(state, isLoading) {
      return { ...state, isLoading }
    },
    show(state) {
      return { ...state, open: true }
    },
    hide(state) {
      return { ...state, open: false }
    },
    setCheckout(state, checkout) {
      const totalItems = checkout.lineItems.reduce((memo, lineItem) => memo + lineItem.quantity, 0)
      return {
        ...state,
        checkoutId: checkout.id,
        items: checkout.lineItems,
        numberItems: totalItems,
        total: checkout.totalPrice,
        subtotal: checkout.subtotalPrice,
        currency: checkout.currencyCode,
        url: checkout.webUrl,
      }
    },
  },
  effects: dispatch => ({
    async fetchPreviousCart(payload, rootState) {
      const checkoutId = localStorage.getItem("checkoutId")
      if (checkoutId) {
        dispatch.cart.setLoading(true)
        // Fetch checkout items
        const checkout = await client.checkout.fetch(checkoutId)
        dispatch.cart.setCheckout(checkout)
        dispatch.cart.setLoading(false)
      }
    },
    async addItem({ variantId, quantity }, rootState) {
      dispatch.cart.setLoading(true)
      let { checkoutId } = rootState.cart
      if (!checkoutId) {
        const checkout = await client.checkout.create()
        checkoutId = checkout.id
        localStorage.setItem("checkoutId", checkoutId)
      }

      const lineItemsToAdd = [{ variantId, quantity }]

      const resp = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
      console.log("checkout is...", resp)

      dispatch.cart.setCheckout(resp)
      dispatch.cart.setLoading(false)
    },
    async updateItem({ id, quantity }, rootState) {
      dispatch.cart.setLoading(true)
      const { checkoutId } = rootState.cart
      const lineItemsToUpdate = [{ id, quantity }]
      console.log("Update line items", lineItemsToUpdate)
      const resp = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
      dispatch.cart.setCheckout(resp)
      dispatch.cart.setLoading(false)
    },
    async removeItem({ id }, rootState) {
      dispatch.cart.setLoading(true)
      const { checkoutId } = rootState.cart
      const resp = await client.checkout.removeLineItems(checkoutId, [id])
      dispatch.cart.setCheckout(resp)
      dispatch.cart.setLoading(false)
    },
  })
}
