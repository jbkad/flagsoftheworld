import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Score from './components/Score';
import Game from './components/Game';
import Answers from './components/Answers';
import quizQuestions from './functions/quizQuestions';

const Country:React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  let [score, setScore] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFlagName, setShowFlagName] = useState(false);

  useEffect(() => {
    async function startGame () {
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

  // checks the correct answer against the user's input
  const checkAnswer = (question: any, userAnswer: string) => {
    const commonName = question.name.common.toLowerCase();
    const officialName = question.name.official.toLowerCase();
    const alternativeSpelling = question.name.altSpellings || [];

    const correct: boolean = 
      commonName === userAnswer.toLowerCase() ||
      officialName === userAnswer.toLowerCase() ||
      alternativeSpelling
        .map((spelling: string) => spelling.toLowerCase())
        .includes(userAnswer.toLowerCase());

    if (correct) {
      setScore(score + 1)
      newQuestion();
      setIsWrongAnswer(false);
      setIsCorrectAnswer(true);

      // clears 'Correct answer!' prompt after 2s
      setTimeout(() => {
        setIsCorrectAnswer(false);
      }, 600);

      setUserAnswer('');

      return correct
    } else {
      wrongAnswer();
      return false;
    }
  };

  // produces the next question in the game
  function newQuestion () {
    const idx = Math.floor(Math.random()*questions.length);
    setQuestion(questions.splice(idx, 1)[0]);
    setShowFlagName(false)
  }

  const handleSkip = () => {
    setTimeout(() => {
      setShowFlagName(true);
    }, 0);

    setTimeout(() => {
      newQuestion();
    }, 1500);
  };

    // allows users to skip questions using the '1' key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "1") {
        handleSkip();
        e.preventDefault();
      }
    };

  return (
    <>
      <Header />
      <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
        <Score score={score} />
        <Game question={question} showFlagName={showFlagName} />
        <br/>
        <button onClick={handleSkip} className={Boolean(question) ? 'btn btn-danger skip-btn' : 'btn btn-success skip-btn'}>
          {Boolean(question) ? 'Skip' : 'Start'}
        </button>
        <div className='skip-text'>{Boolean(question) ? 'Or press key "1"' : ''}</div>
        <br />
        {Boolean(question) ?  
          <div className={(isWrongAnswer) ? 'label-answer text-danger' : isCorrectAnswer ? 'label-answer text-success' : 'label-answer text-secondary-emphasis'}>{isWrongAnswer ? 'Wrong!' : isCorrectAnswer ? 'Correct!' : 'Enter Answer'}</div>
        : ''}
        <Answers question={question} checkAnswer={checkAnswer} />
      </div>
    </>
  );
}

export default Country;