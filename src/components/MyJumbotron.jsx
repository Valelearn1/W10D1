import { Jumbotron, Button } from 'react-bootstrap'
import heroImage from '../assets/hero-bookshelf.jpg'

const MyJumbotron = () => (
  <Jumbotron
    className="hero-jumbotron text-center"
    style={{ '--hero-bg': `url(${heroImage})` }}
  >
    <div className="hero-content">
      <h1 className="hero-title">Welcome to EpiBooks!</h1>
      <p className="hero-subtitle">We list books</p>
      <Button variant="dark" href="#book-list" className="hero-cta">
        Scopri i libri
      </Button>
    </div>
  </Jumbotron>
)

export default MyJumbotron
