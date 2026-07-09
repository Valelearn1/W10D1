import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import Home from "./components/Home";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Wishlist from "./components/Wishlist";
import About from "./components/About";
import NotFound from "./components/NotFound";
import fantasy from "./data/fantasy.json";

function App() {
  // Stato dei preferiti sollevato qui perché serve sia a Shop (per mostrare
  // il cuore su ogni card) sia a Wishlist (per filtrare i libri salvati).
  // L'inizializzazione da localStorage usa la forma "funzione" di useState:
  // così localStorage.getItem viene letto una sola volta, al primo render,
  // non a ogni render.
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Ogni volta che favorites cambia, salviamo la nuova lista in localStorage,
  // così i preferiti sopravvivono a un refresh della pagina.
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (asin) => {
    setFavorites((prev) =>
      prev.includes(asin) ? prev.filter((a) => a !== asin) : [...prev, asin],
    );
  };

  return (
    <Container>
      <MyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <BookList
              books={fantasy}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              emptyMessage="Nessun libro trovato."
            />
          }
        />
        <Route path="/books/:asin" element={<BookDetails />} />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </Container>
  );
}

export default App;
