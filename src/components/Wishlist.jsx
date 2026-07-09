import BookList from "./BookList";
import fantasy from "../data/fantasy.json";

const Wishlist = (props) => {
  const wishlistBooks = fantasy.filter((b) =>
    props.favorites.includes(b.asin),
  );

  return (
    <BookList
      books={wishlistBooks}
      favorites={props.favorites}
      onToggleFavorite={props.onToggleFavorite}
      emptyMessage="La tua wishlist è vuota. Aggiungi qualche libro dal negozio!"
    />
  );
};

export default Wishlist;
