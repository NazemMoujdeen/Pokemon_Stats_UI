import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/pokemon";

export async function savePokemon(Pokemon) {
  return await axios.post(API_URL, Pokemon);
}
export async function getPokemon() {
  const response = await axios.get(API_URL);
  return response.data;
}
export async function getPokemonByNum(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}
export async function getPokemonByName(name) {
  const response = await axios.get(`${API_URL}?name=${name}`);
  return response.data;
}
export async function getPokemonByType(type) {
  const response = await axios.get(`${API_URL}?type=${type}`);
  return response.data;
}
export async function getPokemonByLegendary(legendary) {
  const response = await axios.get(`${API_URL}?legendary=${legendary}`);
  return response.data;
}
