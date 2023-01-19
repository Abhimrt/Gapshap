import Cards from "./Components/Cards";
import "./scss/main.css";
import { Route, Routes, Navigate } from "react-router-dom";
import MainVid from "./Components/Video/Main";
import MainVoi from "./Components/Audio/Main";
import MainMsg from "./Components/Message/Main";

function App() {
  return (
      <>
      <nav>
        <img src={require("./images/black.png")} alt="" />
      </nav>
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/video" element={<MainVid/>} />
        <Route path="/message" element={<MainMsg/>} />
        <Route path="/voice" element={<MainVoi/>} />
      </Routes>

        
      </>
  );
}

export default App;
