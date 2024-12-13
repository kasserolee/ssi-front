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
import DodajWalute from "./pages/addWaluta";
import {ZmianaHasla} from "./pages/zmianaHasla";
import {Admin} from "./pages/admin";
import {AddKurs} from "./pages/addKurs";

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
                    <Route path="/waluta/dodaj" element={<DodajWalute/>} />
                    <Route path="/zmianaHasla" element={<ZmianaHasla/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/addKurs" element={<AddKurs/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
