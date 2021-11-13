import { useState, useEffect} from 'react';
import { useCountryService } from '../../services/service';
import Spinner from '../spinner/Spinner';
import { useHttp } from '../../hooks/http.hook';
import './quizItems.scss';
const QuizItems = ({goForResults, setCounter, setStatus }) => {
    const {getRandomCountry} = useCountryService();
    const {process, setProcess} = useHttp();
    const typesOfQuestions = ['capital', 'flag']
    const [correctCountry, setCorrectCountry] = useState({});
    const [typeOfQuestion, setTypeOfQuestion] = useState('capital')
    const [answers, setAnswers] = useState([]);
    const [checking, setChecking] = useState(false);
    const [wrongAnswerFixed, setWrongAnswerFixed] = useState(false);


    const updQuestion = () => {
        setTypeOfQuestion(typesOfQuestions[Math.floor(Math.random() * 2)]);
        setProcess('loading')
        getRandomCountry()
            .then(data => {
                setCorrectCountry(data[0])
                setAnswers(data.sort(() => Math.random() - 0.5))})
            .then(() => setProcess('idle')) 
    }
    useEffect(() => {
        updQuestion()  
            //eslint-disable-next-line
    }, [])


    const checkAnswer = (e) => {
        e.preventDefault();
        setChecking(true)
        const answer = e.target.textContent.slice(1);
        const siblings = [...document.querySelectorAll('.answer')];
        
        if (answer === correctCountry.name){
            setCounter(counter => counter + 1)
            e.target.classList.add(`answer-success`)
            const icoTick = e.target.querySelector('i');
            icoTick.classList = `far fa-check-circle`;
        }
        else {
            e.target.classList.add(`answer-fail`);
            e.target.closest('li').querySelector('i').classList = `far fa-times-circle`;
            const rightAnswer = siblings.filter(e => e.textContent.slice(1) === correctCountry.name)[0];
            rightAnswer.classList = `answer answer-success`;
            rightAnswer.querySelector('i').classList = `far fa-check-circle`;
            setWrongAnswerFixed(true);
        }
        siblings.forEach(e => e.style.pointerEvents = `none`)
    }
    
    const nextQuestion = () => {
        setChecking(false);
        updQuestion();
    }

    const renderItems = () => {
        const items = [...answers].map((el, i) => 
            <li 
                key={el.id} 
                onClick={checkAnswer} 
                className="answer">
                <span>{i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : 'D'}</span>
                {el.name}
                <i></i>
            </li>)
        return items;
    }
    
    if(process === 'loading') return <Spinner/>;
    else if(process === 'error') return <div style={{'justifyContent': 'center'}}>Error!!!</div>
    return (
        <>
            <div className="quiz__block-content-question">
                <Question country={correctCountry} type={typeOfQuestion}/>
            </div>
            <div  className="quiz__block-content-answers">
                {renderItems()}
            </div>
            {checking && !wrongAnswerFixed ? <button onClick={nextQuestion} className="next-btn">Next</button> 
            : checking && wrongAnswerFixed ? <button onClick={() => goForResults(true)} className="next-btn">See Results</button> : null }
        </>
    )
}

const Question = ({type, country}) => {
    switch (type) {
        case 'capital':
            return (
                <div className="text">{`${country.capital} is the capital of`}</div>
            )
        case 'flag':
            return (
                <>
                    <div className="flag">
                        <img src={country.flag} alt="" />
                    </div>
                    <div className="text">Which country does this flag belongs to?</div>
                </>
            )
        default: return;
    }
    
}
export default QuizItems;