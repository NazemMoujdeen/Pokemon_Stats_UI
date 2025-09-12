import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonByNum } from "../api/PokemonService.js";
import "./PokemonDetails.css";

const PokemonDetail = () => {
  const { id } = useParams(); // Gets the ':id' from the URL
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

  return (
    <div className="detail-container">
      <Link to="/" className="back-button">
        ← Back to Pokédex
      </Link>
      <div className="detail-header">
        <h1>{pokemon.name}</h1>
        <span>#{pokemon.number}</span>
      </div>
      <div className="stats-grid">
        <p>
          <strong>Type 1:</strong> {pokemon.type1}
        </p>
        <p>
          <strong>Type 2:</strong> {pokemon.type2}
        </p>
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
      </div>
    </div>
  );
};

export default PokemonDetail;
