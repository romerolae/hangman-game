import { useEffect, useState } from 'react';
import { letters } from './helpers/letters';
import './App.css';
import { HangmanImages } from './components/HangmanImages';
import { getRandomWord } from './helpers/getRandomWords';

function App() {
	// Desestructurar un objeto y un arreglo

	const [word, setWord] = useState(getRandomWord);
	const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
	const [attempts, setAttempts] = useState(0);
	const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false)


	// Determine if the player has lost the game

	useEffect(() => {
		if (attempts >= 9) {
			setLose(true);
		}
	}, [attempts]);

	//Determine if the player has won the game

	useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if(currentHiddenWord === word){
      setWon(true);
    }
	}, [ hiddenWord ]);

	const checkLetter = (letter: string) => {
    if(lose) return;
    if(won) return;
		if (!word.includes(letter)) {
			setAttempts(Math.min(attempts + 1, 9));
			return;
		}

		const hiddenWordArray = hiddenWord.split(' ');

		for (let i = 0; i < word.length; i++) {
			if (word[i] === letter) {
				hiddenWordArray[i] = letter;
			}
		}

		setHiddenWord(hiddenWordArray.join(' '));
	};

    

  const newGame = () =>{
    const newWord = getRandomWord();

    setWord(newWord)
    setHiddenWord( '_ '.repeat(newWord.length));

    setAttempts(0);
    setLose(false);
    setWon(false);
  }


	return (
		<div className="App">
      <div className="mainContainer">
        <h1 className='title'>HANGMAN</h1>
        {/* Images */}
        <HangmanImages imageNumber={attempts} />

        {/* Hidden Word  */}

      </div>
        <h3 className='hiddenWord'>{hiddenWord}</h3>

			{/* word counter */}
			<h3>Attempts {attempts} </h3>

			{/* game over message  */}

			{lose ? (
        <div className="lost">
          <h3>
            Game Over, the word was: {word}
          </h3>
        </div>
			) : (
				''
			)}

			{/* victory message */}

			{ won ? (
        <div className="won">
          <h3>
            Congrats, You have won the game, you rock!!!
          </h3>
        </div>
			) : (
				''
			)}

			{letters.map((letter) => (
        <button onClick={() => checkLetter(letter)} key={letter}>
					{letter}
				</button>
			))}
        <br />
        <br />
        <button className='newGame' onClick={newGame}>New Game?</button>
		</div>
	);
}

export default App;
