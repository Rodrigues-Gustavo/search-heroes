import styles from "./CharacterGrid.module.css";
import { Character } from "../types/character";
import heartIcon from "../../public/assets/icones/heart/Path Copy 2.png";

interface CharacterGridProps {
  characters: Character[];
  onToggleFavorite: (id: number) => void;
}

const CharacterGrid = ({ characters, onToggleFavorite }: CharacterGridProps) => {
  return (
    <div className={styles.grid}>
      {characters.slice(0, 20).map((character) => (
        <div key={character.id} className={styles.card}>
          <img 
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
            alt={character.name} 
            className={styles.image} 
          />
          <div className={styles.info}>
            <p className={styles.name}>{character.name}</p>
            <button className={styles.favoriteButton} onClick={() => onToggleFavorite(character.id)}>
              <img src={heartIcon} alt="Favorito" className={styles.favoriteIcon} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterGrid;
