import React, {useEffect, useState} from 'react';
import './App.css';

// components
import Header from './components/Header';
import Game from './components/Game';
import Score from './components/Score';
import Timer from './components/Timer';
import Answers from './components/Answers';
import quizQuestions from './functions/quizQuestions';


// functions
  const Country:React.FC = () => {

  const [loading, setLoading] = useState(true);
  let [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    async function startGame () {
      // resets the game
      setLoading(true);
      setScore(0);
      setGameOver(false);

      // fetch the questions
      const newQuestions = await quizQuestions();
      setQuestions(newQuestions);

      // start the game
      setLoading(false);
    }

    startGame();
  }, []);

  function wrongAnswer(){
  // clears form when answer is wrong
    return <></>;
  }

  const checkAnswer = (question: any, userAnswer: string) => {
    const correct: boolean = (question.name.common == userAnswer) || (question.name.official == userAnswer) 
    if (correct) {
      setScore(score + 1)
      newQuestion()
      return correct
    } else {
      return wrongAnswer
    }
  };

  function newQuestion () {
    const idx = Math.floor(Math.random()*questions.length)
    setQuestion(questions.splice(idx, 1)[0])
  }
  
  // switches the 'start' button color.
  const buttonClass = Boolean(question) ? 'btn btn-danger skip-btn' : 'btn btn-success skip-btn';


  return (
    <>
      <Header />
        <div className="app">
          <Score score={score} />
          <Game question={question} />
          <br/>
          <button onClick={newQuestion} className={buttonClass}>
            {Boolean(question) ? 'Skip' : 'Start'}
          </button>
          <Answers question={question} checkAnswer={checkAnswer} />
        </div>
    </>
  );
}

export default Country;