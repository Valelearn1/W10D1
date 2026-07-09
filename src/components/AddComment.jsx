import { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const AddComment = (props) => {
  const [newComment, setNewComment] = useState({
    comment: "",
    rate: 1,
    elementId: props.asin,
  });

  // feedback tiene il messaggio da mostrare nell'Alert (o null se non c'è
  // niente da mostrare) insieme al variant bootstrap ("success"/"danger").
  const [feedback, setFeedback] = useState(null);

  // Ogni volta che feedback cambia (e non è null), parte un timer che lo
  // pulisce da solo dopo 4 secondi. Il "return" dentro useEffect è la
  // funzione di cleanup: React la richiama prima di rieseguire l'effetto
  // (o quando il componente si smonta), qui serve per annullare il timer
  // precedente se un nuovo feedback arriva prima che scada.
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

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
        setFeedback({ variant: "success", message: "Recensione inviata!" });
        setNewComment({
          comment: "",
          rate: 1,
          elementId: props.asin,
        });
        props.refreshComments();
      } else {
        setFeedback({
          variant: "danger",
          message: "Qualcosa è andato storto, riprova.",
        });
      }
    } catch (error) {
      setFeedback({
        variant: "danger",
        message: "Qualcosa è andato storto, riprova.",
      });
    }
  };

  return (
    <div className="my-3">
      {feedback && (
        <Alert
          variant={feedback.variant}
          onClose={() => setFeedback(null)}
          dismissible
        >
          {feedback.message}
        </Alert>
      )}
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
