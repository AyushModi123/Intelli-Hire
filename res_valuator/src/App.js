import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Upload from "./components/upload";
import Quiz from "./components/quiz";
import Result from "./components/result";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
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
