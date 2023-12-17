const Score = ({score}: {score: number}) => {

    return (
        <div className="spacing">
            <span className="badge rounded-pill bg-primary">Score: {score}</span> 
        </div>
    )
  }
  
  export default Score;