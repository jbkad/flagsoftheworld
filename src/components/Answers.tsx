import React, { useState } from 'react';

const Answers: React.FC<{ question: any; checkAnswer: (question: any, userAnswer: string) => void }> = ({ question, checkAnswer }) => {
    const [userAnswer, setUserAnswer] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        checkAnswer(question, userAnswer);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                className='form-control answer-box'
                placeholder='Enter Answer'
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
            />
        </form>
    );
};

export default Answers;