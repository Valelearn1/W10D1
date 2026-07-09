import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";

const BookList = (props) => {
  // La ricerca vive nella query string dell'URL (es. "/shop?q=hobbit")
  // invece che in un useState locale: così è condivisibile e sopravvive
  // alla navigazione (torna indietro col tasto "indietro" del browser).
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    // Se la ricerca è vuota, togliamo del tutto il parametro "q" dall'URL
    // invece di lasciare una query string vuota tipo "/shop?q=".
    setSearchParams(value ? { q: value } : {});
  };

  const [sortOption, setSortOption] = useState("default");

  const sortedBooks = props.books
    .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <>
      <Row>
        <Col md={8}>
          <Form.Group>
            <Form.Label>Search a book</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Ordina per</Form.Label>
            <Form.Control
              as="select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Rilevanza</option>
              <option value="price-asc">Prezzo crescente</option>
              <option value="price-desc">Prezzo decrescente</option>
              <option value="title">Titolo A-Z</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {sortedBooks.length === 0 && props.emptyMessage && (
          <Col>
            <p className="text-center mt-3">{props.emptyMessage}</p>
          </Col>
        )}
        {sortedBooks.map((b) => (
          <Col xs={12} sm={6} md={3} className="mb-4 d-flex" key={b.asin}>
            <SingleBook
              book={b}
              isFavorite={props.favorites?.includes(b.asin)}
              onToggleFavorite={props.onToggleFavorite}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookList;
