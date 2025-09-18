import { useState, useEffect } from "react";
import "./HomePage.css";
import pokeballLogo from "../assets/pokeballLogo.png";
import PokemonTable from "../components/PokemonTable.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterControls from "../components/FilterControls.jsx";
import { getPokemon } from "../api/PokemonService.js";

function HomePage() {
  // These add states to components to hold data
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [type1, setType1] = useState("any");
  const [type2, setType2] = useState("any");
  const [legendaryFilter, setLegendaryFilter] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "number",
    direction: "ascending",
  });

  useEffect(() => {
    getPokemon()
      .then((data) => setPokemonList(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []); // The empty array ensures this runs only once

  //this function deals with sorting the columns when clicked changing the column order basd on the "key" selected
  const handleSort = (key) => {
    let direction;

    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    } else {
      // default to decending
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //creates a new sorted list based on the original unsorted list using a shallow copy of the original ([...pokemonList])
  const sortedPokemon = [...pokemonList].sort((a, b) => {
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (valA > valB) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // filters the full list based on what the user types in the search bar and sort value
  const filteredPokemon = sortedPokemon.filter((pokemon) => {
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

        {!loading && !error && (
          <PokemonTable
            pokemons={filteredPokemon}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
