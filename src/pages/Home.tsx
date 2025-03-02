import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/marvelApi";
import styles from "./Home.module.css";
import { Character } from "../types/character";
import Header from "../components/Header";
import FiltersBar from "../components/FiltersBar";
import CharacterGrid from "../components/CharacterGrid";

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    };

    loadCharacters();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = characters.filter((char) =>
        char.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCharacters(filtered);
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
        onSort={() => {}}
        onToggleFavorites={() => {}}
      />
      <br />
      <CharacterGrid characters={characters} onToggleFavorite={() => {}}/>
    </div>
  );
};

export default Home;