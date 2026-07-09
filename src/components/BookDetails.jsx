import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fantasy from "../data/fantasy.json";
import CommentArea from "./CommentArea";
import Loading from "./Loading";
import Error from "./Error";

const BookDetails = () => {
  const { asin } = useParams();
  const book = fantasy.find((b) => b.asin === asin);

  const [openLibraryInfo, setOpenLibraryInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!book) return;

    const fetchOpenLibraryInfo = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        let response = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&limit=1`,
        );
        if (response.ok) {
          let data = await response.json();
          setOpenLibraryInfo(data.docs[0] || null);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchOpenLibraryInfo();
  }, [asin, book]);

  if (!book) {
    return <p className="text-center mt-3">Libro non trovato.</p>;
  }

  return (
    <div className="my-4">
      <div className="text-center">
        <img
          src={book.img}
          alt={book.title}
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />
        <h2>{book.title}</h2>
        <p>${book.price.toFixed(2)}</p>

        {isLoading && <Loading />}
        {isError && <Error />}
        {!isLoading && !isError && openLibraryInfo && (
          <p>
            {openLibraryInfo.author_name?.[0] &&
              `di ${openLibraryInfo.author_name[0]}`}
            {openLibraryInfo.first_publish_year &&
              ` — prima pubblicazione: ${openLibraryInfo.first_publish_year}`}
          </p>
        )}
      </div>

      <CommentArea asin={book.asin} />
    </div>
  );
};

export default BookDetails;
