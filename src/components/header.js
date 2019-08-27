import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { dispatch } from "../store"

const Header = ({ siteTitle, numberCartItems, toggleCart }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <a href="#" className="white no-underline" onClick={e => {
        e.preventDefault()
        dispatch.cart.show()
      }}>View Cart ({numberCartItems})</a>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
