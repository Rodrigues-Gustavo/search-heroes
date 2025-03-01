import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/marvelApi";
import styles from "./Home.module.css";
import { Character } from "../types/character";
import Header from "../components/Header";
import FiltersBar from "../components/FiltersBar";

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

      <div>
        {filteredCharacters.map((hero) => (
          <div key={hero.id}>
            <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
            <p>{hero.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;