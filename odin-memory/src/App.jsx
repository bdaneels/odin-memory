import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const pokemon = [
  "ditto",
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "zapdos",
  "moltres",
  "artequino",
  "pikachu",
  "eevee",
  "snorlax",
  "lugia  ",
];

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async (pokemonName) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch pokemon:", error);
      }
    };

    // Call fetchPokemon for each item in the pokemon array
    pokemon.forEach((pokemonName) => {
      fetchPokemon(pokemonName);
    });
  }, [pokemon]); // Include pokemon in the dependency array if it's expected to change

  return <div>Hello World</div>;
}

export default App;
