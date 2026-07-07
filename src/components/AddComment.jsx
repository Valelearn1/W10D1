import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = (props) => {
  const [newComment, setNewComment] = useState({
    comment: "",
    rate: 1,
    elementId: props.asin,
  });

  // L'array di dipendenze [props.asin] fa girare questo effetto ogni volta
  // che l'asin cambia, sostituendo il controllo manuale
  // "prevProps.asin !== props.asin" di componentDidUpdate.
  useEffect(() => {
    setNewComment({
      comment: "",
      rate: 1,
      elementId: props.asin,
    });
  }, [props.asin]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTNlY2E0NjE0NDAwMTVlMDVjZjMiLCJpYXQiOjE3ODI5OTM5MDAsImV4cCI6MTc4NDIwMzUwMH0.BfZqaFoCGBdXZSZRNKmGHKCm2T8TxxdiDYjh6rzXXb8",
          },
        },
      );
      if (response.ok) {
        alert("Comment was sent!");
        setNewComment({
          comment: "",
          rate: 1,
          elementId: props.asin,
        });
        props.refreshComments();
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={newComment.comment}
            onChange={(e) =>
              setNewComment({
                ...newComment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={newComment.rate}
            onChange={(e) =>
              setNewComment({
                ...newComment,
                rate: e.target.value,
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
