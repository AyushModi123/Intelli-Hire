import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Upload from "./components/upload";
import Quiz from "./components/quiz";
import Result from "./components/result";
import MyParticleElement from "./components/MyParticle";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app">
      
      <BrowserRouter>
      <MyParticleElement/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Upload/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
