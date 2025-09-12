import React from "react";
import { Link } from "react-router-dom";
import "./PokemonTable.css";

const PokemonTable = ({ pokemons }) => {
  if (!pokemons || pokemons.length === 0) {
    return <p>No Pokémon found.</p>;
  }

  return (
    // creates the table
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type 1</th>
            <th>Type 2</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Special</th>
            <th>Speed</th>
            <th>Total</th>
            <th>Evolutions</th>
            <th>Legendary</th>
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
