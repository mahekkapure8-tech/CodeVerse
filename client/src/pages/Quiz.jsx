import { useState } from "react";
import quizData from "../data/quizData";
import "./Quiz.css";

function Quiz(){
    const[currentQuestion,setCurrentQuestion] = useState(0);
    const question = quizData[currentQuestion];
    console.log(quizData);
console.log(question);
    const [selectedOption,setSelectedOption] = useState("");
    const [score,setScore]= useState(0);
    const [quizFinished,setQuizFinished] = useState(false);

    function handleNext(){
        if(selectedOption === question.answer){
            setScore(score + 1);
        }
            if(currentQuestion  <quizData.length - 1){
                setCurrentQuestion(currentQuestion +1);
                setSelectedOption("");
            }else{
                setQuizFinished(true);
            }
    }
    if(quizFinished){
        return(
            <div className="quiz-page">
                <h1> Quiz Completed</h1>

                <h2>Your Score:{score}/{quizData.length}</h2>
                <button onClick={()=>{
                    setCurrentQuestion(0);
                    setSelectedOption("");
                    setScore(0);
                    setQuizFinished(false);
                }}>
                     🔄Retry Quiz
                </button>
            </div>
        )
    }
    return(
        <div className="quiz-page">
            <h1>🧠 React Quiz</h1>

            <h2>Question {currentQuestion +1} / {quizData.length}</h2>

            <h3>{question.question}</h3>
            {
                question.options.map((option)=>(
                    <button className="option-btn"
                     key={option} 
                     onClick={() => setSelectedOption(option)}>
                        {option}
                    </button>
                    
                ))
            }
            <p>selected Answer:{selectedOption}</p>
            <button className="next-btn"onClick={handleNext}>
                Next➡️
            </button>
        </div>
    );
}
export default Quiz;