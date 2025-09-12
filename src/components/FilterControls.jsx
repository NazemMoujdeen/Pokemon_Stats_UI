import React from "react";
import "./FilterControls.css";

// A list of all Gen 1 types to populate the dropdowns
const pokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
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
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={type2} onChange={(e) => setType2(e.target.value)}>
          <option value="any">Any Type 2</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        // The 'active' class is added conditionally based on the legendaryFilter state
        className={`legendary-button ${legendaryFilter ? "active" : ""}`}
        onClick={() => setLegendaryFilter(!legendaryFilter)}
      >
        Legendary
      </button>
    </div>
  );
};

export default FilterControls;
