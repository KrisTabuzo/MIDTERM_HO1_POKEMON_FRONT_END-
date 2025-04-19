import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [allpokemon, setallPokemon] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState([null]);
  const [generation, setgeneration] = useState('');
  const [type, settype] = useState('');

  
  const fetchPokemon = async (name) => {
    try {
      const response = await fetch(`https://localhost:7296/api/Pokemon/name/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch (err) {
      setPokemon(null);
      setError(err.message);
    }
  };

  const fetchPokemonGeneration = async (generation) => {
    try {
      const response = await fetch(`https://localhost:7296/api/Pokemon/generation/${generation}`);
      if (!response.ok) {
        throw new Error('No Pokémon from this generation found');
      }
      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch (err) {
      setPokemon(null);
      setError(err.message);
    }
  };

  const fetchPokemontype = async (type) => {
    try {
      const response = await fetch(`https://localhost:7296/api/Pokemon/type/${type}`);
      if (!response.ok) {
        throw new Error('No Pokémon from this type found');
      }
      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch (err) {
      setPokemon(null);
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.pokemonName.value.trim();

    if (name) {
      fetchPokemon(name);
    }

  };


  const handleGenerationChange = async (e) => {
    const generation = e.target.value;
    setgeneration(generation);
    if (generation === '') {
      try {
        const response = await fetch(`https://localhost:7296/api/Pokemon`);
        if (!response.ok) throw new Error('Failed to fetch all Pokémon');
        const data = await response.json();
        setPokemon(data);
        setError(null);
      } catch (err) {
        setPokemon(null);
        setError(err.message);
      }
    } else {
      fetchPokemonGeneration(generation);
    }
  };

  const handletypeChange = async (e) => {
    const type = e.target.value;
    settype(type);

    if (type === '') {
      try {
        const response = await fetch(`https://localhost:7296/api/Pokemon`);
        if (!response.ok) throw new Error('Failed to fetch all Pokémon');
        const data = await response.json();
        setPokemon(data);
        setError(null);
      } catch (err) {
        setPokemon(null);
        setError(err.message);
      }
    } else {
      fetchPokemontype(type);
    }
  };

  return (
    <div className="App container py-4 ">
    <h1 className="text-center mb-4">Generation 3 & 4 Pokédex</h1>
    <br></br>

  <form onSubmit={handleSubmit}>
              <input type="text" name="pokemonName" placeholder="Enter Pokémon name" required />
              <button type="submit" className='search'>Search</button>
              <br />
              <div >
                <label className='type'> Filter by Type: </label>
                <select onChange={handletypeChange} value={type}  className='options' >
                  <option value="">All Types</option>
                  <option value="Grass">Grass</option>
                  <option value="Fire">Fire</option>
                  <option value="Water">Water</option>
                  <option value="Electric">Electric</option>
                  <option value="Ghost">Ghost</option>
                  <option value="Dark"> Dark </option>
                  <option value="Normal"> Normal </option>
                  <option value="Bug"> bUg </option>
                  <option value="Ground"> Ground </option>
                  <option value="Psychic"> Psychicc </option>

                </select>


                <label className='gen'>Filter by Generation: </label>
                <select onChange={handleGenerationChange} value={generation} className='options'>
                  <option value="">All Generation</option>
                  <option value="3">Generation 3</option>
                  <option value="4"> Generatio4</option>
                </select>
              </div>
            </form>


            {error && <p>{error}</p>}

  <div className="row">
    {Array.isArray(pokemon) ? (
      pokemon.map((p) => (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={p.name}>
          <div className='cards'>
          <h2 className='pname'>{p.name}</h2>
                    <img src={p.imageUrl} alt={p.name} className='image'/>
                    <p><strong>Height:</strong> {p.height}</p>
                    <p><strong>Weight:</strong> {p.weight}</p>
                    <p><strong>Type:</strong> {p.type}</p>
                    <p><strong>Generation:</strong> {p.generation}</p>
                    <p><strong>Base Evolution:</strong> {p.baseEvolution}</p>
                    <p><strong>Next Evolution:</strong> {p.nextEvolution}</p>

            </div>
            </div>

      ))
    ) : (
      pokemon && (
        <div className="col-md-6 offset-md-3">
         <div className="details">
                  <h2 className='pname'>{pokemon.name}</h2>
                  <img src={pokemon.imageUrl} alt={pokemon.name} className='image' />
                  <p><strong>Height:</strong> {pokemon.height}</p>
                  <p><strong>Weight:</strong> {pokemon.weight}</p>
                  <p><strong>Type:</strong> {pokemon.type}</p>
                  <p><strong>Generation:</strong> {pokemon.generation}</p>
                  <p><strong>Base Evolution:</strong> {pokemon.baseEvolution}</p>
                </div>
        </div>
      )
    )}
  </div>
</div>

  );
}

export default App;
