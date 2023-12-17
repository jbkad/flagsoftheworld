import '../App.css';

const Game = ({question}: {question: any}) => {

    if (question) {
      return (
        <div className="flag-container">
          <img
            className="flag"
            src={question.flags.png}
            alt="Flags"
          />
        </div>
      )
    }
  
    return (
      <>
        <div>
          <h2 className="flag">Want to test your geography knowledge? <br /> Ready for the ultimate flag challenge? <br /> Press <strong>"Start"</strong> to begin!</h2>
        </div>
      </>
    );
  };
  
  export default Game
  