import { useState } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";

const BookList = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = props.books.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
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
        {filteredBooks.length === 0 && props.emptyMessage && (
          <Col>
            <p className="text-center mt-3">{props.emptyMessage}</p>
          </Col>
        )}
        {filteredBooks.map((b) => (
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
