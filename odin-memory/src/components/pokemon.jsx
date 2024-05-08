import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function PokemonCard({ pokemon, onClick }) {
  return (
    <div
      className="flex flex-col justify-center items-center border border-black rounded-lg shadow-xl"
      onClick={() => onClick(pokemon)}
    >
      <h2 className="mt-4 text-xl">{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
}

export default PokemonCard;
