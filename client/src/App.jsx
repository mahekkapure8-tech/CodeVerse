import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import "./App.css";

import { ThemeContext } from "./context/ThemeContext";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Practice from "./pages/Practice";
import QuestionDetails from "./pages/QuestionDetails";
import Quiz from "./pages/Quiz";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";

function App() {

  const { darkMode } = useContext(ThemeContext);

  return (

    <div className={darkMode ? "dark" : "light"}>

      <Layout>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/practice" element={<Practice />} />

          <Route path="/question/:id" element={<QuestionDetails />} />

          <Route path="/quiz" element={<Quiz />} />

          <Route path="/bookmarks" element={<Bookmarks />} />

          <Route path="/profile" element={<Profile />} />

        </Routes>

      </Layout>

    </div>

  );

}

export default App;