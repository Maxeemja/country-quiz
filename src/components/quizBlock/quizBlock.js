import QuizItems from '../quizItems/quizItems';
import QuizResults from '../quizResults/quizResults';
import pic from '../../assets/undraw_adventure_4hum 1.svg'
import './quizBlock.scss';
import { useState } from 'react/cjs/react.development';
const QuizBlock = () => {

    const [viewResults, setViewResults] = useState(false);
    const [counter, setCounter] = useState(0);

    const rebootQuiz = () => {
        setCounter(0);
        setViewResults(false);
    }

    return (
        <div className="quiz__block">
            <div className="quiz__block-title">Country Quiz</div>
            <div className="quiz__block-img">
                <img src={pic} alt="adv" hidden={viewResults ? true : false} />
            </div>
            <div className={viewResults ? `quiz__block-results` : `quiz__block-content`}>
                {viewResults ? <QuizResults rebootQuiz={rebootQuiz} counter={counter} setCounter={setCounter}/> 
                : <QuizItems goForResults={setViewResults} setCounter={setCounter}/>}
            </div>
        </div>
    )
}

export default QuizBlock;