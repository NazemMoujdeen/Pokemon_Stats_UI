import { useState, useEffect } from "react";
import "./App.css";
import pokeballLogo from "./assets/pokeballLogo.png";
import PokemonTable from "./components/PokemonTable.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
  // These add states to components to hold data
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchAllPokemon() {
      try {
        // makes call to api
        const response = await fetch("http://localhost:8080/pokemon");
        if (!response.ok) {
          throw new Error(
            "Network response was not ok. Is your backend running?"
          );
        }

        const data = await response.json();
        setPokemonList(data); // Save the fetched data into state
      } catch (err) {
        setError(err.message);
        console.error("Could not fetch Pokémon data:", err);
      } finally {
        setLoading(false);
      }
    }
    // Call function to fetch the data
    fetchAllPokemon();
  }, []); // The empty array ensures this runs only once

  // filters the full list based on what the user types in the search bar
  const filteredPokemon = pokemonList.filter((pokemon) => {
    if (!searchTerm) {
      return true;
    }
    const searchTermLower = searchTerm.toLowerCase();

    // check if the name exists and includes the search term.
    const nameMatch =
      pokemon.name && pokemon.name.toLowerCase().includes(searchTermLower);

    // does the same for number
    const numberMatch =
      pokemon.number && pokemon.number.toString().includes(searchTermLower);

    return nameMatch || numberMatch;
  });

  return (
    <div className="app-container">
      <div className="header">
        {/*wraps the title with logos */}
        <img src={pokeballLogo} alt="Pokeball logo" className="header-logo" />
        <h1>Pokemon Stats</h1>
        <img src={pokeballLogo} alt="Pokeball logo" className="header-logo" />
      </div>

      {/* This will display either a loading message an error or the table */}
      <div className="content-area">
        {/* the component is used to update the searchbars state */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {loading && <p className="loading-message">Loading stats...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {/* the new filtered list of pokemon is passed back to the table*/}
        {!loading && !error && <PokemonTable pokemons={filteredPokemon} />}
      </div>
    </div>
  );
}

export default App;
