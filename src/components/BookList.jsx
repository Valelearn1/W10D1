import { useState } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = (props) => {
  // Un useState per campo: ognuno restituisce [valoreAttuale, setterDiQuelValore].
  // Sono l'equivalente diretto dei due campi che prima vivevano in this.state.
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsin, setSelectedAsin] = useState(null);

  // Chiami il setter con il nuovo valore di selectedAsin ricevuto come parametro.
  const selectBook = (asin) => {
    setSelectedAsin(asin);
  };

  return (
    // Riga principale a due colonne: libri a sinistra, recensioni a destra.
    // I Col qui sotto usano ancora la griglia a 12 colonne, ma relativa a
    // questa Row (non all'intera pagina) — è per questo che dentro la
    // colonna di sinistra possiamo continuare ad avere "4 card per riga"
    // senza dover ricalcolare nulla a mano.
    <Row>
      <Col md={8}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search a book</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {props.books
            .filter((b) =>
              b.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((b) => (
              <Col xs={12} sm={6} md={3} className="mb-4 d-flex" key={b.asin}>
                <SingleBook
                  book={b}
                  onSelect={selectBook}
                  selectedAsin={selectedAsin}
                />
              </Col>
            ))}
        </Row>
      </Col>

      {/* Colonna delle recensioni: md={4} la mette a destra, occupando lo
          spazio rimanente (8 + 4 = 12). "sticky-top" (classe di Bootstrap)
          la mantiene visibile mentre scorri in basso tra i libri, invece
          di sparire fuori dallo schermo. */}
      <Col md={4}>
        <div className="sticky-top" style={{ top: "1rem" }}>
          <CommentArea asin={selectedAsin} />
        </div>
      </Col>
    </Row>
  );
};

export default BookList;
