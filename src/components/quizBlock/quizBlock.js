import QuizItems from '../quizItems/quizItems';
import pic from '../../assets/undraw_adventure_4hum 1.svg'
import './quizBlock.scss';
const QuizBlock = () => {
    return (
        <div className="quiz__block">
            <div className="quiz__block-title">Country Quiz</div>
            <div className="quiz__block-img">
                <img src={pic} alt="adv" />
            </div>
            <div className="quiz__block-content">
                <QuizItems/>
            </div>
        </div>
    )
}
export default QuizBlock;