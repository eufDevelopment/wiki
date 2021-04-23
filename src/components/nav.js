import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Search from '../components/search';
import "./nav.css"
import Logo from "../svg/eugem.svg"
import Caret from "../svg/caret.svg"

import menuLinks from "./menulinks.json"

const Nav = () => (
  <div 
    id="nav"
  >
    <div
      style={{
        padding: `0`,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: `none`,
        }}
      > 
      <Logo className="logo" style={{
          display: `block`,
          margin: `1rem 0`
        }}/>  
      </Link>
      

      <button 
        className="hamburger white-button" 
        onClick={() => document.getElementById("nav").classList.toggle("open")}
        onKeyDown={() => document.getElementById("nav").classList.toggle("open")}
      >
        <span className="hamburger__top-bun"></span>
        <span className="hamburger__bottom-bun"></span>
      </button>



    </div>
    <div id="nav-container">
        <nav 
            className="gradient1"
            style={{
                borderRadius: "var(--unit1)",
                padding: "2px"
            }}
        >
            <div style={{
                padding: `0`,
                fontSize: "0.8rem",
                background: "#fff",
                borderRadius: "2px",
             }}>
            {menuLinks.map(link => (
                <div
                style={{
                    color: "var(--colorA)",
                    position: "relative"
                }}
                className="lvl1"
                key={link.id}
                >
                <Link to={link.url}>
                    {link.text}
                </Link>

                <Lvl2Menu nodes={link.nodes} id={link.id}/>

                </div>
            ))}
            </div>
        </nav>
    </div>
    <div>
      <Search />
    </div>
  </div>
)

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: ``,
}

function Lvl2Menu(props) {
  if (props.nodes) {  
    return <MenuTwo id={props.id} nodes={props.nodes}/>;  
  }  
  return '';
}

function MenuTwo(props){ 
  const nodes = props.nodes;
  return (
    <>
      <button aria-label="Expand Menu" id={props.id} type="button" className="lvl2 expand white-button collapsed" title="Expand" onClick={() => toggleClass(props.id)} onKeyDown={() => toggleClass(props.id)} ><Caret /></button>
      <div className="submenu sublvl2">
        {nodes.map(link => (
            <div
            style={{
                color: "var(--colorA)",
                position: "relative"
            }}
            className="lvl2"
            key={link.id}
            >
            <Link to={link.url}>
                {link.text}
            </Link>

            <Lvl3Menu nodes={link.nodes} id={link.id}/>

            </div>
        ))}
      </div>
    </>
  )
}

function Lvl3Menu(props) {
  if (props.nodes) {  
    return <MenuThree id={props.id} nodes={props.nodes}/>;  
  }  
  return '';
}

function MenuThree(props){ 
  const nodes = props.nodes;
  return (
    <>
      <button aria-label="Expand Menu" id={props.id} type="button" className="lvl2 expand white-button collapsed" title="Expand" onClick={() => toggleClass(props.id)} onKeyDown={() => toggleClass(props.id)} ><Caret /></button>
      <div className="submenu sublvl3">
        {nodes.map(link => (
            <div
            style={{
                color: "var(--colorA)",
                position: "relative"
            }}
            className="lvl3"
            key={link.id}
            >
            <Link to={link.url}>
                {link.text}
            </Link>

            <Lvl3Menu nodes={link.nodes} id={link.id}/>

            </div>
        ))}
      </div>
    </>
  )
}


function toggleClass(id){
  document.getElementById(id).classList.toggle("collapsed");
}


export default Nav
