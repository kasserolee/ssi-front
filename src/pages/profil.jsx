import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getProfil, updateProfil} from "../Service/ProfilService";
import {useCookies} from "react-cookie";
import {Button, TextField} from "@mui/material";

export const Profil = () => {
    const [cookies, setCookies] = useCookies();
    const [profil, setProfil] = useState({});
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [newImie, setNewImie] = useState("");
    const [newNazwisko, setNewNazwisko] = useState("");
    const [newLogin, setNewLogin] = useState("");
    const [newEmail ,setNewEmail] = useState("");
    const [komunikat, setKomunikat] = useState("");

    useEffect(() => {
        getProfil().then((dane) => setProfil(dane.data.uzytkownik)).catch((e) => {
            navigate("/page403");
        })
    }, [cookies]);

    const handleEdytuj = () => {
        setEdit(true);
        setNewImie(profil.imie);
        setNewNazwisko(profil.nazwisko);
        setNewEmail(profil.email);
        setNewLogin(profil.login);
    }

    function checkData(){
        if (newEmail === "" || newLogin === "" || newImie === "" || newNazwisko === ""){
            setKomunikat("Wypełnij wszystkie pola!");
            return false;
        }
        else{
            if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                setKomunikat("Podaj poprawny adres email");
                return false;
            }
        }
        return true;
    }

    const handleUpdate = async () => {
        if (!checkData()) return 0;
        let res = await updateProfil({imie: newImie, nazwisko: newNazwisko, email: newEmail, login: newLogin});
        if (res.status !== 200) navigate("/page403");
        if (res.data.status === "login") setKomunikat("Konto o takim loginie już istnieje");
        if (res.data.status === "email") setKomunikat("Konto o takim emailu już istnieje");
        if (res.data.status === "ok"){
            setKomunikat("");
            setEdit(false);
            setProfil({imie: newImie, nazwisko: newNazwisko, email: newEmail, login: newLogin});
        }
    }

    return(
        <div style={{margin: "0 auto", width: "75vw", textAlign: "left"}}>
            {!edit && <div style={{marginTop: "2vh"}}>
                <p><b>{profil.imie} - {profil.nazwisko}</b></p>
                <p>Login: {profil.login}</p>
                <p>{profil.email}</p>
                <Button style={{border: "1px solid skyblue"}} onClick={handleEdytuj}>Edytuj profil</Button>
            </div>}
            {edit && <div>
                <p>Edycja profilu</p><br/><br/>
                <TextField label="Imie" value={newImie} onChange={(e) => setNewImie(e.target.value)}/><br/><br/>
                <TextField label="Nazwisko" value={newNazwisko} onChange={(e) => setNewNazwisko(e.target.value)}/><br/><br/>
                <TextField label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/><br/><br/>
                <TextField label="Login" value={newLogin} onChange={(e) => setNewLogin(e.target.value)}/><br/><br/>
                <Button style={{border: "1px solid skyblue"}} onClick={handleUpdate}>Zapisz</Button>
            </div>}<br/>
            {komunikat}
        </div>
    )
}