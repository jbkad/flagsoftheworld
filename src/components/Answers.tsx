import { useState } from 'react';
import '../App.css';

const Answers = ({question, checkAnswer}: {question: any, checkAnswer: any}) => {

    const [userAnswer, setUserAnswer] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const correct = checkAnswer(question, userAnswer)
        if (correct) {
            setUserAnswer('')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control answer-box"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                />
                <small className="form-text text-muted">TIP: Answers are case sensitive</small>
            </form>
        </>
    )
}

export default Answers