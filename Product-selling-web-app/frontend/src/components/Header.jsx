import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
  import logo from '../logo.jpeg'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href="/login"
  }
  return (
    <div>
    <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                <img src={logo} alt="" style={{width: "100px", height: "100px"}} />
                </NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        {
                            localStorage.getItem('user') ?
                            <>
                            <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                             <NavItem>
                            <NavLink href="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/upload-product">Upload Product</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/my-product">My Product</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/purchased">Purchased Products</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/logout" onClick={logout}>Logout</NavLink>
                         </NavItem>
                            </> : 
                            <>
                         <NavItem>
                            <NavLink href="/register">Signup</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login">Sigin</NavLink>
                            </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
  </div>
  )
}

export default Header