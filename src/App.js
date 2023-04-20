import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import UsreCreation from "./Components/UsreCreation";
import AddClass from "./Components/AddClass";
import Subjects from "./Components/Subjects";
import Chapter from "./Components/Chapter";
import Question from "./Components/Question";

function App() {
  return (
    <div className="mainScreen">
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/usercreation" element={<UsreCreation />}></Route>
          <Route path="/addclass" element={<AddClass />}></Route>
          <Route path="/subjects" element={<Subjects />}></Route>
          <Route path="/chapter" element={<Chapter />}></Route>
          <Route path="/question" element={<Question />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
