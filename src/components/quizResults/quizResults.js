import win from '../../assets/winners.svg'
import './quizResults.scss';

const QuizResults = ({counter, rebootQuiz}) => {

    return (
        <>
            <img src={win} alt="" />
            <div className="results-label">Results</div>
            <div className="results-count">You`ve got <span>{counter}</span> right answers!</div>
            <button onClick={rebootQuiz} className="results-btn">Try Again</button>
        </>
    )
    
}
export default QuizResults;