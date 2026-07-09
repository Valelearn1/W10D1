import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => (
  <div className="my-4 text-center">
    <h2>Pagina non trovata</h2>
    <p>L'indirizzo che hai visitato non esiste.</p>
    <Button as={Link} to="/" variant="dark">
      Torna alla home
    </Button>
  </div>
);

export default NotFound;
