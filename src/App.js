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
import {Page403} from "./pages/page403";
import {Waluty} from "./pages/waluty";
import {Waluta} from "./pages/waluta";
import {Page404} from "./pages/page404";
import {Profil} from "./pages/profil";

function App(){
    return(
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Waluty/>}/>
                    <Route path="/rejestracja" element={<Rejestracja />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/wyloguj" element={<Wyloguj/>}/>
                    <Route path="/page403" element={<Page403/>}/>
                    <Route path="/page404" element={<Page404/>}/>
                    <Route path="/waluta/:id" element={<Waluta/>}/>
                    <Route path="/profil" element={<Profil/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
