import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SingleBook = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {/* h-100: la card riempie tutta l'altezza del suo Col (che a sua
            volta, grazie a "d-flex" in BookList, si estende per tutta
            l'altezza della riga). Così tutte le card in una riga risultano
            della stessa altezza, indipendentemente dalla lunghezza del titolo. */}
      <Card
        className="book-card h-100"
        onClick={() => navigate(`/books/${props.book.asin}`)}
      >
        {/* position: relative sul wrapper serve per poter posizionare il
            cuoricino dei preferiti in overlay sopra la copertina. */}
        <div style={{ position: "relative" }}>
          {/* height fissa + objectFit "cover": le copertine dei libri hanno
                proporzioni diverse tra loro, con objectFit "cover" vengono
                tutte ritagliate per riempire lo stesso spazio senza deformarsi. */}
          <Card.Img
            variant="top"
            src={props.book.img}
            alt={props.book.title}
            style={{ height: "250px", objectFit: "cover" }}
          />
          {/* stopPropagation: senza questo, cliccare il cuore farebbe
              scattare anche l'onClick della Card (navigazione al dettaglio),
              perché il click "risale" fino al genitore. */}
          <Button
            variant={props.isFavorite ? "danger" : "outline-light"}
            size="sm"
            className="position-absolute"
            style={{ top: "8px", right: "8px" }}
            onClick={(e) => {
              e.stopPropagation();
              props.onToggleFavorite(props.book.asin);
            }}
          >
            {props.isFavorite ? "♥" : "♡"}
          </Button>
        </div>
        <Card.Body>
          <Card.Title style={{ color: "black" }}>
            {props.book.title}
          </Card.Title>
          <Card.Text style={{ color: "black" }}>
            ${props.book.price.toFixed(2)}
          </Card.Text>
          {/* Bottone puramente cosmetico: dà l'idea di un negozio senza una
              vera logica di carrello dietro. */}
          <Button
            variant="dark"
            size="sm"
            onClick={(e) => e.stopPropagation()}
          >
            Aggiungi al carrello
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleBook;
