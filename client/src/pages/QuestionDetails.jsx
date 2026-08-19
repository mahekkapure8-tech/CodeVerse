// 
import Achievements from "../components/Achievements";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import questions from "../data/questions";
import "./QuestionDetails.css"; 
function QuestionDetails() {

    const { id } = useParams();
    const [code, setCode] = useState("");
    const [notes, setNotes] = useState("");
    const [xp, setXp] = useState(0);


    const question = questions.find(
        (q) => q.id === Number(id)
    );

    if (!question) {
        return <h1>Question Not Found</h1>;
    }

    return (

        <div className="question-details">
<Link to="/practice">
    <button className="back-btn">
        ← Back to Practice
    </button>
</Link>
            <h1>{question.title}</h1>

            <h3>{question.difficulty}</h3>

            <p>
                <strong>Category:</strong> {question.category}
            </p>

            <p>{question.description}</p>

            <hr />

            <h3>Example Input</h3>

            <pre>{question.exampleInput}</pre>

            <h3>Example Output</h3>

            <pre>{question.exampleOutput}</pre>
            <h3>Hint</h3>

<p>{question.hint}</p>
<h3>📝 My Notes</h3>


<textarea
    className="notes-editor"
    placeholder="Write your notes here..."
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
></textarea>
<h3>Write your code</h3>
  <textarea className="code-editor"
  placeholder="Write your solution here..."
  value={code}
  onChange={(e)=>setCode(e.target.value)}>

  </textarea>
  <button className="submit-btn"
  onClick={()=>{
        setXp((prev) => Math.min(prev + 20, 100));

    alert("✅ Solution Submitted!\n📝 Notes Saved!+20 XP Earned");
  }}>
  🚀submit solution
  </button>
  <h3 className="xp-text">
    ⭐ Current XP : {xp}
</h3>

<div className="xp-bar">
   
    <div
        className="xp-fill"
        style={{ width: `${xp}%` }}
    ></div>
</div>
 <Achievements xp={xp} />
    </div>
    
    );
}

export default QuestionDetails;