import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>

      <h1 style={{ color: "white" }}>PasteApp</h1>

      <div className="nav-links">
        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/pastes">
          Pastes
        </NavLink>
      </div>

    </div>
  )
}

export default Navbar
