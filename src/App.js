import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Rejestracja} from "./pages/rejestracja";
const host = "http://localhost:9001";

function App(){
  return(
      <div className="App">
          <Rejestracja/>
      </div>
  );
}

export default App;
