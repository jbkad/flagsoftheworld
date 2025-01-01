const Game: React.FC<{ question: any; showFlagName: boolean }> = ({ question, showFlagName }) => {
    if (question) {
        return (
            <div className="flag-container">
                {question && (
                    <>
                        <img className="flag" src={question.flags.png} alt="Flags" />
                        {showFlagName && <div className=" flag-name">{question.name.common}</div> }
                    </>
                )}
            </div>
        );
    }

    return (
        <div>
          <div className="flag">How well do you know the world's flags? <br/> Put your knowledge to the test!</div>
        </div>
    );
}

export default Game;