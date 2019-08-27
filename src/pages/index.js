import React from "react"
import { graphql } from "gatsby"

import App from "../components/app"
import SEO from "../components/seo"
import Button from "../components/button"
import { dispatch } from "../store"

const IndexPage = ({ data }) => {
  return (
    <App>
      <SEO title="Home" />
      {data.shopifyProduct &&
        <div className="flex">
          <img src={data.shopifyProduct.images[0].originalSrc} alt={data.shopifyProduct.title} style={{ maxWidth: 300 }} />
          <div className="ml4">
            <h1>{data.shopifyProduct.title}</h1>
            <p>{data.shopifyProduct.description}</p>
            <div>
              <div className="mb3">
                £{data.shopifyProduct.variants[0].price}
              </div>

              <Button onClick={() => {
                console.log("Add to cart", data.shopifyProduct.variants[0])
                dispatch.cart.addItem({ variantId: data.shopifyProduct.variants[0].shopifyId, quantity: 1 })
                dispatch.cart.show()
              }}>Add to cart</Button>
            </div>

          </div>
        </div>
      }
    </App>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    shopifyProduct {
      handle
      images {
        originalSrc
      }
      title
      description
      shopifyId
      variants {
        shopifyId
        price
        sku
        availableForSale
        weight
        weightUnit
      }
    }
  }
`

