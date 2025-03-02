import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/marvelApi";
import styles from "./Home.module.css";
import { Character } from "../types/character";
import Header from "../components/Header";
import FiltersBar from "../components/FiltersBar";
import CharacterGrid from "../components/CharacterGrid";
import toggleAZ from "../../public/assets/toggle/Group 6.png";
import toggleZA from "../../public/assets/toggle/Group 2@3x.png";

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAscending, setIsAscending] = useState(true);

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

  const handleSort = () => {
    const sortedCharacters = [...filteredCharacters].sort((a, b) => {
      return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setFilteredCharacters(sortedCharacters);
    setIsAscending(!isAscending);
  };

  return (
    <div className={styles.container}>
      <Header />
      <FiltersBar
        totalHeroes={filteredCharacters.length}
        onSearch={handleSearch}
        onSort={handleSort}
        onToggleFavorites={() => {}}
        sortIcon={isAscending ? toggleAZ : toggleZA}
      />
      <br />
      <CharacterGrid characters={filteredCharacters} onToggleFavorite={() => {}} />
    </div>
  );
};

export default Home;
