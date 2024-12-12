import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Rejestracja} from "./pages/rejestracja";
import {Login} from "./pages/login";
import {Header} from "./pages/header";
import {Wyloguj} from "./pages/wyloguj";

function App(){
    return(
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/rejestracja" element={<Rejestracja />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/wyloguj" element={<Wyloguj/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
