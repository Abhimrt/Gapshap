import Cards from "./Components/Cards";
import "./scss/main.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainVid from "./Components/Video/Main";
import MainVoi from "./Components/Audio/Main";
import MainMsg from "./Components/Message/Main";

function App() {

  // window.confirm("fa")

  window.onbeforeunload = function () {
    return "Data will be lost if you leave the page, are you sure?";
  };
  const navigate = useNavigate();
  return (
    <div className="app">
      <nav>
        <div onClick={() => window.confirm("Your data will be lost. Are you sure to exit this page.") ? navigate("/") : null}><img src={require("./images/black.png")} alt="" /></div>
      </nav>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/video" element={<MainVid />} />
        <Route path="/message" element={<MainMsg />} />
        <Route path="/voice" element={<MainVoi />} />
      </Routes>


    </div>
  );
}

export default App;
