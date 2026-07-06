import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    comment: {
      comment: "",
      rate: 1,
      elementId: this.props.asin,
    },
  };

  componentDidUpdate(prevProps) {
    // BUG che la consegna chiedeva di scovare: "elementId" viene letto da
    // this.props.asin solo qui sopra, nell'inizializzazione dello state.
    // Quel codice gira UNA VOLTA SOLA, quando il componente viene creato.
    //
    // Con la nuova struttura, AddComment resta montato quando l'utente passa
    // da un libro all'altro (cambia solo la prop "asin" che riceve da
    // CommentArea) — quindi senza questo controllo, elementId resterebbe
    // congelato al primo libro selezionato, e le recensioni verrebbero
    // salvate sempre sullo stesso libro.
    //
    // Appena ci accorgiamo che l'asin ricevuto è cambiato, resettiamo tutto
    // il form (testo e voto compresi): ha senso, perché stiamo iniziando una
    // recensione per un libro diverso.
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        comment: {
          comment: "",
          rate: 1,
          elementId: this.props.asin,
        },
      });
    }
  }

  sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTNlY2E0NjE0NDAwMTVlMDVjZjMiLCJpYXQiOjE3ODI5OTM5MDAsImV4cCI6MTc4NDIwMzUwMH0.BfZqaFoCGBdXZSZRNKmGHKCm2T8TxxdiDYjh6rzXXb8",
          },
        },
      );
      if (response.ok) {
        alert("Comment was sent!");
        this.setState({
          comment: {
            comment: "",
            rate: 1,
            elementId: this.props.asin,
          },
        });
        // Il commento è stato salvato sul server, ma CommentArea non lo sa
        // ancora: this.props.refreshComments() rifà la fetch delle recensioni
        // in CommentArea, così la nuova recensione compare subito in lista.
        this.props.refreshComments();
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    return (
      <div className="my-3">
        <Form onSubmit={this.sendComment}>
          <Form.Group>
            <Form.Label>Comment text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add comment here"
              value={this.state.comment.comment}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={this.state.comment.rate}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    rate: e.target.value,
                  },
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
  }
}

export default AddComment;
