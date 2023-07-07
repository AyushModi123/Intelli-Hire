import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Upload from "./components/upload";
import Quiz from "./components/quiz";
import Result from "./components/result";
import MyParticleElement from "./components/MyParticle";
import Navbar from "./components/Navbar/Navbar";
import UnknownTerritory from "./components/errorpg";
import Signup from "./components/signup/signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";


function App() {
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };
  const randomId = generateRandomId();

  return (
    <div className="app">
      <BrowserRouter>
        {/* <MyParticleElement /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/:id" element={<Upload randomId={randomId} />} />
          <Route
            path={`/quiz/${randomId}`}
            element={<Quiz randomId={randomId} />}
          />
          <Route path="/result" element={<Result randomId={randomId} />} />
          <Route path="*" element={<Navigate to="/unknown-territory" />} />
          <Route path="/unknown-territory" element={<UnknownTerritory />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
