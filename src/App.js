import Cards from "./Components/Cards";
import "./scss/main.css";
import { Route, Routes, Link } from "react-router-dom";
import MainVid from "./Components/Video/Main";
import MainVoi from "./Components/Audio/Main";
import MainMsg from "./Components/Message/Main";

function App() {
  return (
      <>
      <nav>
          <Link to={"/"}><img src={require("./images/black.png")} alt="" /></Link>
      </nav>
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/video" element={<MainVid/>} />
        <Route path="/message" element={<MainMsg/>} />
        <Route path="/voice" element={<MainVoi/>} />
      </Routes>
    <div className="footer">Developed by <a href="https://abhimrt.github.io/Portfolio/">Abhishek Singhal</a> </div>
        
      </>
  );
}

export default App;
