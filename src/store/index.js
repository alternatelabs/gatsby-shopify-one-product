import { init } from "@rematch/core"
import cart from "./models/cart"

const store = init({
  models: {
    cart,
  }
})

export const dispatch = store.dispatch

export default store
