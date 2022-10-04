import { NavLink } from 'react-router-dom'
import {Container, Nav, Navbar,NavDropdown} from 'react-bootstrap'

const NavbarNav = () => {

   const navActive = ({isActive}) => {
      return{
        color: isActive ? 'black' : '',
        textDecoration: isActive ? 'none' : ''
      }
   }

    return(
        <div>
          <Navbar bg="light" expand="lg">
           <Container>
           <NavLink
                className="nav-link"
                to="/"
                style={navActive}>
                <Navbar.Brand>CATATKAS</Navbar.Brand>
              </NavLink>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">                
                <NavLink
                  className="nav-link"
                  to="/stocks"
                  style={navActive}>
                  Stock Product
                </NavLink>
                 <NavDropdown title="Transaction" id="basic-nav-dropdown">

                    <NavDropdown.Item>Record transaction</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">Record accounts payable</NavDropdown.Item>
                </NavDropdown>
                <NavLink
                  className="nav-link"
                  to="/financialAnalysis"
                  style={navActive}>
                  Financial Analysis
                </NavLink>
               </Nav>
             </Navbar.Collapse>
           </Container>
         </Navbar>
        </div>
    )
    
}

export default NavbarNav