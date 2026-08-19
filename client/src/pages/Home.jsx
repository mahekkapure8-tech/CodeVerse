
import "../components/Home.css";
import { useState } from "react";
import { Link}  from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
// import FeatureCard from "../components/FeatureCard";
// import Counter from "../components/Counter";
// import LikeButton from "../components/LikeButton";
// import NameInput from "../components/NameInput";
import SearchBar from "../components/SearchBar";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions";
import DailyChallenge from "../components/DailyChallenge";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm,setSearchTerm] = useState("");
  const [bookmarkedQuestions,setBookmarkedQuestions] = useState([]);
  function toggleBookmark(questionId){
    if(bookmarkedQuestions.includes(questionId))
    {
      setBookmarkedQuestions(
        bookmarkedQuestions.filter((id) => id !== questionId)
      
     );
    }else{
      setBookmarkedQuestions([...bookmarkedQuestions,questionId]);
    }
  }
  const features = [
    {
      id : 1,
      title:"Practice Coding",
    description: "Solve coding questions and improve your skills."
    },
    {
      id : 2,
    title: "Quiz",
    description: "Test your programming knowledge."
  },
  {
    id : 3,
    title: "Track Progress",
    description: "Track your learning journey."
  }
];
const filteredQuestions = questions.filter((question)=>{
  const matchesCategory = selectedCategory === "All" || question.category ===selectedCategory;

  const matchesSearch = question.title.toLowerCase().includes (searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
  }
);
  
const categories = ["All", "Arrays", "Strings", "Graphs"];


  return (
    <>
      
      <Hero />
      <DailyChallenge />
    
         
    
    </>
  );
}

export default Home;



