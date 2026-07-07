import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  // isLoading parte da false: finché non è selezionato un libro (asin è null)
  // non c'è nessuna fetch in corso, quindi non ha senso mostrare uno spinner.
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Stessa funzione richiamata sia dall'useEffect qui sotto sia da AddComment
  // e SingleComment come prop "refreshComments", per ricaricare le recensioni
  // dopo una POST/DELETE senza cambiare libro.
  const fetchComments = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTNlY2E0NjE0NDAwMTVlMDVjZjMiLCJpYXQiOjE3ODI5OTM5MDAsImV4cCI6MTc4NDIwMzUwMH0.BfZqaFoCGBdXZSZRNKmGHKCm2T8TxxdiDYjh6rzXXb8",
          },
        },
      );
      if (response.ok) {
        let comments = await response.json();
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  // L'array di dipendenze [props.asin] fa girare questo effetto sia al primo
  // montaggio sia ogni volta che l'asin cambia, coprendo insieme quello che
  // prima facevano componentDidMount e componentDidUpdate.
  useEffect(() => {
    if (props.asin) {
      fetchComments();
    } else {
      // Nessun libro selezionato (es. l'utente ha deselezionato): puliamo
      // lo stato invece di lasciare in giro le recensioni del libro precedente.
      setComments([]);
      setIsLoading(false);
      setIsError(false);
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      {/* Sezione sempre visibile: se non c'è ancora un libro selezionato
          mostriamo un messaggio invece di lasciare l'area vuota o rotta. */}
      {!props.asin && <p>Select a book to see any reviews.</p>}
      {isLoading && <Loading />}
      {isError && <Error />}
      {props.asin && (
        <AddComment asin={props.asin} refreshComments={fetchComments} />
      )}
      <CommentList commentsToShow={comments} refreshComments={fetchComments} />
    </div>
  );
};

export default CommentArea;
