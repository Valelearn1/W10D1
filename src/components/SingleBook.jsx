import { Card } from "react-bootstrap";

const SingleBook = (props) => {
  return (
    <>
      {/* h-100: la card riempie tutta l'altezza del suo Col (che a sua
            volta, grazie a "d-flex" in BookList, si estende per tutta
            l'altezza della riga). Così tutte le card in una riga risultano
            della stessa altezza, indipendentemente dalla lunghezza del titolo. */}
      <Card
        className="h-100"
        onClick={() => props.onSelect(props.book.asin)}
        style={{
          border:
            props.book.asin === props.selectedAsin ? "3px solid red" : "none",
        }}
      >
        {/* height fissa + objectFit "cover": le copertine dei libri hanno
              proporzioni diverse tra loro, con objectFit "cover" vengono
              tutte ritagliate per riempire lo stesso spazio senza deformarsi. */}
        <Card.Img
          variant="top"
          src={props.book.img}
          alt={props.book.title}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{props.book.title}</Card.Title>
          <Card.Text style={{ color: "black" }}>
            ${props.book.price.toFixed(2)}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleBook;
