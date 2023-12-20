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
          <h2 className="flag">Want to test your geography knowledge? <br /> Ready for the ultimate flag challenge? <br /> Press <strong>"Start"</strong> to begin!</h2>
        </div>
    );
}

export default Game;