import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Rejestracja} from "./pages/rejestracja";
import {Login} from "./pages/login";

const host = "http://localhost:9001";

function App(){
  return(
      <Router>
          <div className="App">
            <Routes>
                <Route path="/rejestracja" element={<Rejestracja />} />
                <Route path="/login" element={<Login />} />
            </Routes>
          </div>
      </Router>
  );
}

export default App;
