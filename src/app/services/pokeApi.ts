import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await axios.get(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  return response.data;
};

export const getPokemonDetails = async (name: string) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};
