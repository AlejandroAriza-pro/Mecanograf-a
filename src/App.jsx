import React, { useState, useEffect } from 'react';

function App() {
  const [language, setLanguage] = useState('English');
  const [difficulty, setDifficulty] = useState('Medium');
  const [sentence, setSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const sentences = {
    English: {
      Easy: 'The cat sat on the mat.',
      Medium: 'The quick brown fox jumps over the lazy dog.',
      Hard: 'The juxtaposition of contrasting elements creates a compelling narrative.'
    },
    Spanish: {
      Easy: 'El gato está en la alfombra.',
      Medium: 'El zorro marrón rápido salta sobre el perro perezoso.',
      Hard: 'La yuxtaposición de elementos contrastantes crea una narrativa convincente.'
    },
    French: {
      Easy: 'Le chat est sur le tapis.',
      Medium: 'Le rapide renard brun saute par-dessus le chien paresseux.',
      Hard: 'La juxtaposition d\'éléments contrastés crée un récit captivant.'
    }
  };

  useEffect(() => {
    setSentence(sentences[language][difficulty]);
  }, [language, difficulty]);

  useEffect(() => {
    if (startTime && endTime) {
      const timeInSeconds = (endTime - startTime) / 1000;
      const wordCount = sentence.split(' ').length;
      const wpm = Math.round(wordCount / (timeInSeconds / 60));
      setWordsPerMinute(wpm);

      let correctChars = 0;
      for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] === userInput[i]) {
          correctChars++;
        }
      }
      const acc = Math.round((correctChars / sentence.length) * 100);
      setAccuracy(acc);
    }
  }, [endTime, startTime, sentence, userInput]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUserInput(value);

    if (!startTime) {
      setStartTime(new Date().getTime());
    }

    if (value === sentence) {
      setEndTime(new Date().getTime());
    }
  };

  const handleReset = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setWordsPerMinute(0);
    setAccuracy(0);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    handleReset();
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    handleReset();
  };

  return (
    <div className="container">
      <h1>Speed Typing Test</h1>
      <div className="options">
        <label htmlFor="language">Language:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <p>{sentence}</p>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        rows="4"
        cols="50"
      />
      {endTime && (
        <div className="results">
          <p>Words per minute: {wordsPerMinute}</p>
          <p>Accuracy: {accuracy}%</p>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
