import '../App.css';

const Game = ({question}: {question: any}) => {

    if (question) {
      return (
        <div>
          <img
            src={question.flags.png}
            alt="Flags"
            height="200"  
          />
        </div>
      )
    }
  
    return (
      <>
        <h2 className="flag-img">Want to test your geography knowledge? <br /> Ready for the ultimate flag challenge? <br /> Press "Start" to begin!</h2>
      </>
    );
  };
  
  export default Game
  