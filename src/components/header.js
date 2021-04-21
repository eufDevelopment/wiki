import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "../svg/logo.svg"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#04669b`,
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
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >   
        <Logo style={{
          fill: `#fff`,
          height: `50px`,
          display: `inline-block`,
          float: 'left'
        }}/>
        <h1 style={{ margin: 0 }}>{siteTitle}</h1>       
      </Link>

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
