import React, {useEffect, useState} from 'react';
import './App.css';

// components
import Header from './components/Header';
import Game from './components/Game';
import Score from './components/Score';
import Answers from './components/Answers';
import quizQuestions from './functions/quizQuestions';


// functions
  const Country:React.FC = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  let [score, setScore] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  useEffect(() => {
    async function startGame () {
      // resets the game
      setLoading(true);
      setScore(0);

      // fetch the questions
      const newQuestions = await quizQuestions();
      setQuestions(newQuestions);

      // start the game
      setLoading(false);
    }

    startGame();
  }, []);

  function wrongAnswer(){
    setIsWrongAnswer(true);

    // clears 'Wrong answer!' prompt after 2s
    setTimeout(() => {
      setIsWrongAnswer(false);
    }, 2000);
  }

  const checkAnswer = (question: any, userAnswer: string) => {
    const correct: boolean = 
      question.name.common === userAnswer ||
      question.name.official === userAnswer ||
      question.name.altSpellings === userAnswer

    if (correct) {
      setScore(score + 1)
      newQuestion();
      setIsWrongAnswer(false);
      setIsCorrectAnswer(true);

      // clears 'Correct answer!' prompt after 2s
      setTimeout(() => {
        setIsCorrectAnswer(false);
      }, 600);

      return correct
    } else {
      wrongAnswer();
      return false;
    }
  };

  function newQuestion () {
    const idx = Math.floor(Math.random()*questions.length);
    setQuestion(questions.splice(idx, 1)[0]);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "1") {
      newQuestion();
      e.preventDefault();
    }
  };

  return (
    <>
      <Header />
      <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
        <Score score={score} />
        <Game question={question} />
        <br/>
        <button onClick={newQuestion} className={Boolean(question) ? 'btn btn-danger skip-btn' : 'btn btn-success skip-btn'}>
          {Boolean(question) ? 'Skip' : 'Start'}
        </button>
        <div className='skip-text'>{Boolean(question) ? 'Or press key "1"' : ''}</div>
        <br />
        {Boolean(question) ?  
          <div className={(isWrongAnswer) ? 'label-answer text-danger' : isCorrectAnswer ? 'label-answer text-success' : 'label-answer text-secondary-emphasis'}>{isWrongAnswer ? 'Wrong Answer!' : isCorrectAnswer ? 'Correct Answer!' : 'Enter Answer'}</div>
        : ''}
        <Answers question={question} checkAnswer={checkAnswer} />
      </div>
    </>
  );
}

export default Country;