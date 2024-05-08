import { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./components/pokemon";
import { v4 as uuid } from "uuid";

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
  "articuno",
  "pikachu",
  "eevee",
  "snorlax",
  "lugia  ",
  "mewtwo",
  "mew",
  "jigglypuff",
  "psyduck",
  "meowth",
  "vulpix",
  "growlithe",
];

function App() {
  const [pokemonDB, setPokemonDB] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [userSelectedPokemons, setUserSelectedPokemons] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchPokemon = async (pokemonName) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        return {
          name: data.name,
          id: data.id,
          image: data.sprites.other["official-artwork"].front_default,
        };
      } catch (error) {
        console.error("Failed to fetch pokemon:", error);
        return null;
      }
    };

    Promise.all(pokemon.map((pokemonName) => fetchPokemon(pokemonName))).then(
      (results) => {
        const validResults = results.filter(Boolean);
        setPokemonDB(validResults);
        const pokemonList = [];
        while (
          pokemonList.length < 12 &&
          validResults.length > pokemonList.length
        ) {
          const randomIndex = Math.floor(Math.random() * validResults.length);
          const randomPokemon = validResults[randomIndex];
          const randomPokemonAlteredId = { ...randomPokemon, id: uuid() };
          pokemonList.push(randomPokemonAlteredId);
        }
        setSelectedPokemons(pokemonList);
        setLoading(false);
      }
    );
  }, []);

  function resetSelectedPokemons(pokemon) {
    const newSelectedPokemons = selectedPokemons.filter(
      (selectedPokemon) => selectedPokemon.id !== pokemon.id
    );
    const randomIndex = Math.floor(Math.random() * pokemonDB.length);
    const newPokemon = pokemonDB[randomIndex];
    const newPokemonAlteredId = { ...newPokemon, id: uuid() };
    setSelectedPokemons([...newSelectedPokemons, newPokemonAlteredId]);
  }

  function handleClick(pokemon) {
    console.log("clicked on", pokemon.name);
    //check if the userselectedpokemons array already has the pokemon
    if (userSelectedPokemons.includes(pokemon.name)) {
      //if it does, set the score to 0 and clear the userselectedpokemons array
      setScore(0);
      setUserSelectedPokemons([]);
      console.log("game over");
      resetSelectedPokemons(pokemon);
    } else {
      //if it doesn't, add the pokemon to the array
      setUserSelectedPokemons([...userSelectedPokemons, pokemon.name]);
      console.log("userSelectedPokemons", userSelectedPokemons);
      setScore((prev) => prev + 1);
      //delete the pokemon of the selected pokemons array and get a new random one from the pokemonDB at the end of the array
      resetSelectedPokemons(pokemon);
    }
  }

  console.log("rendering App component");

  return (
    <div className="bg-cyan-200 w-full p-10">
      <span className="text-4xl pb-8"> Score: {score}</span>
      <div className="grid grid-cols-4 gap-6 pt-6">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          selectedPokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} onClick={handleClick} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
