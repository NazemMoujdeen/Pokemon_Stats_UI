import React from "react";
import { Link } from "react-router-dom";
import "./PokemonTable.css";

const PokemonTable = ({ pokemons, onSort, sortConfig }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return null; // Don't show an indicator if this column isn't being sorted
    }
    // Return the correct arrow based on the sort direction
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };

  if (!pokemons || pokemons.length === 0) {
    return <p>No Pokémon found.</p>;
  }

  return (
    // creates the table
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {/* Each header is now a clickable button that calls the onSort function */}
            <th>
              <button onClick={() => onSort("number")}>
                # {getSortIndicator("number")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("name")}>
                Name {getSortIndicator("name")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("type1")}>
                Type 1 {getSortIndicator("type1")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("type2")}>
                Type 2 {getSortIndicator("type2")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("hp")}>
                HP {getSortIndicator("hp")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("attack")}>
                Attack {getSortIndicator("attack")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("defense")}>
                Defense {getSortIndicator("defense")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("special")}>
                Special {getSortIndicator("special")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("speed")}>
                Speed {getSortIndicator("speed")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("baseTotal")}>
                Total {getSortIndicator("baseTotal")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("evolutions")}>
                Evolutions {getSortIndicator("evolutions")}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("legendary")}>
                Legendary {getSortIndicator("legendary")}
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Loops over the pokemons array and create a row for each one */}
          {pokemons.map((pokemon) => (
            <tr key={pokemon.number}>
              <td>{pokemon.number}</td>
              <td className="pokemon-name">
                {/*adds a link that points to their details page */}
                <Link to={`/pokemon/${pokemon.number}`}>{pokemon.name}</Link>
              </td>
              <td>{pokemon.type1}</td>
              <td>{pokemon.type2 !== "None" ? pokemon.type2 : "-"}</td>
              <td>{pokemon.hp}</td>
              <td>{pokemon.attack}</td>
              <td>{pokemon.defense}</td>
              <td>{pokemon.special}</td>
              <td>{pokemon.speed}</td>
              <td>{pokemon.baseTotal}</td>
              <td>{pokemon.evolutions}</td>
              <td>{pokemon.legendary === 1 ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTable;
