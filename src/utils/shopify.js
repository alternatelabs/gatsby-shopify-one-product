import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "alt-wines.myshopify.com",
  storefrontAccessToken: "657bcbe19ef6f24aec2b464266004a00",
})

export default client
