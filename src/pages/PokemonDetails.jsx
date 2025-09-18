import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonByNum } from "../api/PokemonService.js";
import "./PokemonDetails.css";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemonByNum(id)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="loading-message">Loading Pokémon details...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!pokemon) return <p>Pokémon not found.</p>;

  //gets an image of the pokemon based on its number
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png`;

  // gets the dmg match ups for all the types
  const damageTypes = [
    { name: "Normal", value: pokemon.normalDmg },
    { name: "Fire", value: pokemon.fireDmg },
    { name: "Water", value: pokemon.waterDmg },
    { name: "Electric", value: pokemon.electricDmg },
    { name: "Grass", value: pokemon.grassDmg },
    { name: "Ice", value: pokemon.iceDmg },
    { name: "Fighting", value: pokemon.fightDmg },
    { name: "Poison", value: pokemon.poisonDmg },
    { name: "Ground", value: pokemon.groundDmg },
    { name: "Flying", value: pokemon.flyingDmg },
    { name: "Psychic", value: pokemon.psychicDmg },
    { name: "Bug", value: pokemon.bugDmg },
    { name: "Rock", value: pokemon.rockDmg },
    { name: "Ghost", value: pokemon.ghostDmg },
    { name: "Dragon", value: pokemon.dragonDmg },
  ];

  //filters the list to find what types its supereffective/weak/immune against
  const weaknesses = damageTypes
    .filter((t) => t.value >= 2)
    .sort((a, b) => b.value - a.value);

  const supereffective = damageTypes
    .filter((t) => t.value > 0 && t.value < 1)
    .sort((a, b) => a.value - b.value);

  const immunities = damageTypes.filter((t) => t.value === 0);

  return (
    <div className="detail-container">
      <Link to="/" className="back-button">
        ← Back to Main Menu
      </Link>
      <div className="detail-header">
        <h1>{pokemon.name}</h1>
        <h1>#{pokemon.number}</h1>
      </div>
      <div className="detail-body">
        <div className="pokemon-image-container">
          <img src={imageUrl} alt={pokemon.name} className="pokemon-image" />
        </div>
        <div className="info-column">
          <div className="stats-grid">
            <div className="own-types">
              <span
                className={`type-badge type-${pokemon.type1.toLowerCase()}`}
              >
                {pokemon.type1}
              </span>
              {pokemon.type2 && pokemon.type2 !== "None" && (
                <span
                  className={`type-badge type-${pokemon.type2.toLowerCase()}`}
                >
                  {pokemon.type2}
                </span>
              )}
            </div>
            {/*lists the stats of the pokemon */}
            <p>
              <strong>HP:</strong> {pokemon.hp}
            </p>
            <p>
              <strong>Attack:</strong> {pokemon.attack}
            </p>
            <p>
              <strong>Defense:</strong> {pokemon.defense}
            </p>
            <p>
              <strong>Special:</strong> {pokemon.special}
            </p>
            <p>
              <strong>Speed:</strong> {pokemon.speed}
            </p>
            <p>
              <strong>Total:</strong> {pokemon.baseTotal}
            </p>
            <p>
              <strong>Height:</strong> {pokemon.heightM} m
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weightKg} kg
            </p>
          </div>

          {/*List the match ups for the pokemon */}
          <div className="matchups-container">
            <div className="supereffective">
              <h3>Super Effective Against</h3>
              <div className="type-badges">
                {supereffective.map(({ name, value }) => (
                  <span
                    key={name}
                    className={`type-badge type-${name.toLowerCase()}`}
                  >
                    {name} {value === 0.25 ? "(4x)" : "(2x)"}
                  </span>
                ))}
              </div>
            </div>
            <div className="weaknesses">
              <h3>Weak To</h3>
              <div className="type-badges">
                {weaknesses.map(({ name, value }) => (
                  <span
                    key={name}
                    className={`type-badge type-${name.toLowerCase()}`}
                  >
                    {name} {value === 4 ? "(4x)" : "(2x)"}
                  </span>
                ))}
              </div>
            </div>
            <div className="immunities">
              <h3>Immune To</h3>
              <div className="type-badges">
                {immunities.map(({ name }) => (
                  <span
                    key={name}
                    className={`type-badge type-${name.toLowerCase()}`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
