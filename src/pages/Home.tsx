import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/marvelApi";
import styles from "./Home.module.css";
import { Character } from "../types/character";
import Header from "../components/Header";
import FiltersBar from "../components/FiltersBar";
import CharacterGrid from "../components/CharacterGrid";
import toggleAZ from "../../public/assets/toggle/Group 6.png";
import toggleZA from "../../public/assets/toggle/Group 2@3x.png";

const MAX_FAVORITES = 5;

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    };

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    loadCharacters();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = characters.filter((char) =>
      char.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  const handleSort = () => {
    const sortedCharacters = [...filteredCharacters].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFilteredCharacters(sortedCharacters);
    setIsAscending(!isAscending);
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(id)) {
        updatedFavorites = prevFavorites.filter((favId) => favId !== id);
      } else {
        if (prevFavorites.length > MAX_FAVORITES) return prevFavorites;
        updatedFavorites = [...prevFavorites, id];
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleToggleFavoritesFilter = () => {
    setShowFavorites((prev) => !prev);
    if (!showFavorites) {
      setFilteredCharacters(characters.filter((char) => favorites.includes(char.id)));
    } else {
      setFilteredCharacters(characters);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <FiltersBar
        totalHeroes={filteredCharacters.length}
        onSearch={handleSearch}
        onSort={handleSort}
        onToggleFavorites={handleToggleFavoritesFilter}
        sortIcon={isAscending ? toggleAZ : toggleZA}
      />
      <br />
      <CharacterGrid
        characters={filteredCharacters}
        onToggleFavorite={handleToggleFavorite}
        favoriteIds={favorites}
      />
    </div>
  );
};

export default Home;
