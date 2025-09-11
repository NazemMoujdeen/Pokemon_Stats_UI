import { useState, useEffect } from "react";
import "./App.css";
import pokeballLogo from "./assets/pokeballLogo.png";
import PokemonTable from "./components/PokemonTable.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterControls from "./components/FilterControls.jsx";
function App() {
  // These add states to components to hold data
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [type1, setType1] = useState("any");
  const [type2, setType2] = useState("any");
  const [legendaryFilter, setLegendaryFilter] = useState(false);

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
    const searchMatch = !searchTerm
      ? true
      : (pokemon.name &&
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (pokemon.number && pokemon.number.toString().includes(searchTerm));

    // filters the list based on type selected
    const type1Match =
      type1 === "any" ||
      (pokemon.type1 && pokemon.type1.toLowerCase() === type1) ||
      (pokemon.type2 && pokemon.type2.toLowerCase() === type1);

    // does the same if a type 2 is selected
    const type2Match =
      type2 === "any" ||
      (pokemon.type1 && pokemon.type1.toLowerCase() === type2) ||
      (pokemon.type2 && pokemon.type2.toLowerCase() === type2);

    // button to filter for legendary pokemon
    const legendaryMatch = !legendaryFilter ? true : pokemon.legendary === 1;

    // results are shown if all the the filters are true
    return searchMatch && type1Match && type2Match && legendaryMatch;
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
        <FilterControls
          type1={type1}
          setType1={setType1}
          type2={type2}
          setType2={setType2}
          legendaryFilter={legendaryFilter}
          setLegendaryFilter={setLegendaryFilter}
        />
        {loading && <p className="loading-message">Loading stats...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {/* the new filtered list of pokemon is passed back to the table*/}
        {!loading && !error && <PokemonTable pokemons={filteredPokemon} />}
      </div>
    </div>
  );
}

export default App;
