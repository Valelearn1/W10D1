import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedAsin: null,
  };

  // chiami setState con un oggetto che aggiorna selectedAsin al valore ricevuto come parametro.
  selectBook = (asin) => {
    this.setState({ selectedAsin: asin });
  };

  render() {
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
                  value={this.state.searchQuery}
                  onChange={(e) =>
                    this.setState({ searchQuery: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {this.props.books
              .filter((b) =>
                b.title.toLowerCase().includes(this.state.searchQuery),
              )
              .map((b) => (
                <Col
                  xs={12}
                  sm={6}
                  md={3}
                  className="mb-4 d-flex"
                  key={b.asin}
                >
                  <SingleBook
                    book={b}
                    onSelect={this.selectBook}
                    selectedAsin={this.state.selectedAsin}
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
            <CommentArea asin={this.state.selectedAsin} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default BookList;
