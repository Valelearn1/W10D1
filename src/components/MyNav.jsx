import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyNav = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand as={Link} to="/">EpiBooks</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
      <Nav.Link as={Link} to="/about">About</Nav.Link>
      <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
    </Nav>
  </Navbar>
)

export default MyNav
