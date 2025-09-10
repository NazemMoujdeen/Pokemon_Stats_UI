import axios from "axios";

const API_URL = 'https://localhost:8080/Pokemon'

export async function savePokemon(Pokemon){
    return await axios.post(API_URL,Pokemon);

}
export async function getPokemon(){
    return await axios.get(API_URL);
}