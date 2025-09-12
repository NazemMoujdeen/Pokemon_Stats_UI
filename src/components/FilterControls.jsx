import React from "react";
import "./FilterControls.css";

// Using lowercase types to match the filtering logic in HomePage.jsx
const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
];

const FilterControls = ({
  type1,
  setType1,
  type2,
  setType2,
  legendaryFilter,
  setLegendaryFilter,
}) => {
  return (
    <div className="filter-controls">
      <div className="type-filters">
        <select value={type1} onChange={(e) => setType1(e.target.value)}>
          <option value="any">Any Type 1</option>
          {pokemonTypes.map((type) => (
            // Capitalize the display text for the user, but keep the value lowercase
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <select value={type2} onChange={(e) => setType2(e.target.value)}>
          <option value="any">Any Type 2</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <button
        className={`legendary-button ${legendaryFilter ? "active" : ""}`}
        onClick={() => setLegendaryFilter(!legendaryFilter)}
      >
        Legendary
      </button>
    </div>
  );
};

export default FilterControls;
