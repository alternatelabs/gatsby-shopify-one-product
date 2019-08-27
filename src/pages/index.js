import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
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

              <button onClick={() => console.log("Add to cart", data.shopifyProduct.variants[0])}>Add to cart</button>
            </div>

          </div>
        </div>
      }
    </Layout>
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
        price
        sku
        availableForSale
        weight
        weightUnit
      }
    }
  }
`

