import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function CharacterCard({ character, onClose }) {
  return (
    <div className="character-card">
      <button className="close-button" onClick={() => onClose(character)}>Close</button>
      <h2>Name: {character.name}</h2>
      <h3>Height: {character.height}</h3>
      <p>Films: {character.films.length}</p>
    </div>
  );
}

function App() {
  const [characters, setCharacters] = useState([]);
  const [dispCharacters, setDispCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(response => {
        setCharacters(response.data.results);
        setDispCharacters(response.data.results.slice(0, 3));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddCard = () => {
    if (characters.length > dispCharacters.length) {
      const nextCharacter = characters[dispCharacters.length];
      setDispCharacters(prevCharacters => [...prevCharacters, nextCharacter]);
    }
  };

  const handleCloseCard = (characterToRemove) => {
    setDispCharacters(prevCharacters =>
      prevCharacters.filter(character => character !== characterToRemove)
    );
  };

  return (
    <div className="App">
      <h1 style = {{backgroundColor:"#C859d4"}}>Star Wars Characters</h1>
      <div className="character-list">
        {dispCharacters.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            onClose={handleCloseCard}
          />
        ))}
      </div>
      {dispCharacters.length < characters.length && (
        <button className="add-button" onClick={handleAddCard}>Add Card</button>
      )}
    </div>
  );
}

export default App;
