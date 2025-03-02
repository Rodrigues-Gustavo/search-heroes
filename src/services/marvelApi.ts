import axios from "axios";
import md5 from "md5";
import { Character } from "../types/character";

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const BASE_URL = "https://gateway.marvel.com/v1/public";

const getAuthParams = () => {
  const ts = Date.now().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
};

export const marvelApi = axios.create({ baseURL: BASE_URL });

export const fetchCharacters = async (nameFilter: string = ""): Promise<Character[]> => {
  try {
    const response = await marvelApi.get(
      `/characters?${getAuthParams()}&limit=20&orderBy=modified${nameFilter ? `&nameStartsWith=${nameFilter}` : ""}`
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    return [];
  }
};




export const fetchCharacterDetails = async (id: number): Promise<Character | null> => {
  try {
    const response = await marvelApi.get(`/characters/${id}?${getAuthParams()}`);
    return response.data.data.results[0] || null;
  } catch (error) {
    console.error("Erro ao buscar detalhes do personagem:", error);
    return null;
  }
};

export const fetchCharacterComics = async (id: number): Promise<any[]> => {
  try {
    const response = await marvelApi.get(`/characters/${id}/comics?${getAuthParams()}&orderBy=-onsaleDate&limit=10`);
    return response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar quadrinhos:", error);
    return [];
  }
};
