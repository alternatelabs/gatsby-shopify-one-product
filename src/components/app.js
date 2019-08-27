import React from "react"
import { Provider } from "react-redux"
import store from "../store"
import Layout from "./layout"

const App = ({ children }) => {
  store.dispatch.cart.fetchPreviousCart()

  return (
    <Provider store={store}>
      <Layout>
        {children}
      </Layout>
    </Provider>
  )
}

export default App
