// 
import { useEffect, useState } from "react";
import axios from "axios";

function Practice() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        fetchQuestions();

    }, []);

    const fetchQuestions = async () => {

        try {

            const res = await axios.get("http://localhost:5000/api/questions");

            setQuestions(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="practice-page">

            <h1>Practice Problems</h1>

            {

                questions.map((q) => (

                    <div key={q._id} className="question-card">

                        <h2>{q.title}</h2>

                        <p>{q.description}</p>

                        <p>
                            <strong>Difficulty :</strong> {q.difficulty}
                        </p>

                        <p>
                            <strong>Language :</strong> {q.language}
                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default Practice;