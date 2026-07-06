import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  // isLoading parte da false: finché non è selezionato un libro (asin è null)
  // non c'è nessuna fetch in corso, quindi non ha senso mostrare uno spinner.
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    // Se l'utente ha già un libro selezionato nel momento in cui CommentArea
    // viene creata, carichiamo subito le sue recensioni.
    if (this.props.asin) {
      this.fetchComments();
    }
  }

  componentDidUpdate(prevProps) {
    // CommentArea ora resta sempre montata: quando l'utente clicca un altro
    // libro, non viene ricreata da zero, riceve solo un nuovo valore di
    // this.props.asin. componentDidUpdate è il punto giusto per reagire a
    // questo cambiamento nei componenti a classe.
    //
    // Il controllo "prevProps.asin !== this.props.asin" è FONDAMENTALE:
    // componentDidUpdate viene richiamato ad ogni render (quindi anche dopo
    // ogni setState fatto qui dentro). Senza questo confronto, fetchComments
    // farebbe setState, che farebbe scattare di nuovo componentDidUpdate, che
    // richiamerebbe ancora fetchComments... un loop infinito.
    if (prevProps.asin !== this.props.asin) {
      if (this.props.asin) {
        this.fetchComments();
      } else {
        // Nessun libro selezionato (es. l'utente ha deselezionato): puliamo
        // lo stato invece di lasciare in giro le recensioni del libro precedente.
        this.setState({ comments: [], isLoading: false, isError: false });
      }
    }
  }

  // Stessa identica logica di fetch che prima viveva solo in componentDidMount,
  // estratta in un metodo a parte così può essere richiamata sia al primo
  // caricamento sia ogni volta che cambia il libro selezionato.
  fetchComments = async () => {
    this.setState({ isLoading: true, isError: false });
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTNlY2E0NjE0NDAwMTVlMDVjZjMiLCJpYXQiOjE3ODI5OTM5MDAsImV4cCI6MTc4NDIwMzUwMH0.BfZqaFoCGBdXZSZRNKmGHKCm2T8TxxdiDYjh6rzXXb8",
          },
        },
      );
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments: comments, isLoading: false, isError: false });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {/* Sezione sempre visibile: se non c'è ancora un libro selezionato
            mostriamo un messaggio invece di lasciare l'area vuota o rotta. */}
        {!this.props.asin && <p>Select a book to see any reviews.</p>}
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {/* AddComment ha senso solo se sappiamo a quale libro riferire il commento */}
        {this.props.asin && <AddComment asin={this.props.asin} />}
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
