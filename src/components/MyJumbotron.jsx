import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-bookshelf.jpg'

const MyJumbotron = () => (
  <Jumbotron
    className="hero-jumbotron text-center"
    style={{ '--hero-bg': `url(${heroImage})` }}
  >
    <div className="hero-content">
      <h1 className="hero-title">Welcome to EpiBooks!</h1>
      <p className="hero-subtitle">We list books</p>
      <Button as={Link} to="/shop" variant="dark" className="hero-cta">
        Vai al negozio
      </Button>
    </div>
  </Jumbotron>
)

export default MyJumbotron
