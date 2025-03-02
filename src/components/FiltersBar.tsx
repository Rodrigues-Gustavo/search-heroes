import { useState } from "react";
import styles from "./FiltersBar.module.css";
import searchIcon from "../../public/assets/busca/Lupa/Shape.png";
import heroIcon from "../../public/assets/icones/heroi/noun_Superhero_2227044.png";
import heartIcon from "../../public/assets/icones/heart/Path.svg";

interface FiltersBarProps {
  totalHeroes: number;
  onSearch: (query: string) => void;
  onSort: () => void;
  onToggleFavorites: () => void;
  sortIcon: string;
}

const FiltersBar = ({ totalHeroes, onSearch, onSort, onToggleFavorites, sortIcon }: FiltersBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className={styles.filtersBar}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <img src={searchIcon} alt="Buscar" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Procure por heróis"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p className={styles.heroCount}>Encontrados {totalHeroes} heróis</p>

        <div className={styles.actions}>
          <div className={styles.sortContainer}>
            <img src={heroIcon} alt="Ordenar" className={styles.icon} />
            <button className={styles.sortButton} onClick={onSort}>
              Ordenar por nome - A/Z
            </button>
            <img
              src={sortIcon} 
              alt="Alternar ordem"
              className={`${styles.toggleIcon} ${styles.animated}`}
              onClick={onSort}
            />
          </div>

          <div className={styles.favoritesContainer}>
            <img src={heartIcon} alt="Favoritos" className={styles.icon} />
            <button className={styles.favoritesButton} onClick={onToggleFavorites}>
              Somente favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
