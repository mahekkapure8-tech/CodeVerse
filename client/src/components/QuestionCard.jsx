import "./QuestionCard.css";
import { Link } from "react-router-dom";
function QuestionCard(props){
   
    function getDifficultyBadge(){
if(props.difficulty === "Easy"){
    return "🟢 Easy";
}
else if(props.difficulty === "Medium"){
    return "🟡 Medium";
}
else{
    return "🔴 Hard";
}
}
function getDifficultyClass(){
    if(props.difficulty ==="Easy"){
        return "difficulty easy"
}else if(props.difficulty === "Medium"){
    return "difficulty medium"
}else{
    return "difficulty hard"
}
}

    return(
        <div className="question-card">
            <h2>{props.title}</h2>
            <button 
            className="bookmark-btn"
            onClick={() => props.toggleBookmark(props.id)}>
                {props.bookmarked ? "⭐" : "☆"}
            </button>
            <p className={getDifficultyClass()}>{getDifficultyBadge()}</p>
            <p>Category : {props.category}</p>
            <p>{props.description}</p>
            <Link to={`/question/${props.id}`}>
    <button className="solve-btn">
        Solve
    </button>
</Link>
        </div>

    )
}
export default QuestionCard;


