import React, {Component, useEffect, useState} from "react";
import {rejestacja} from "../Service/AutoryzacjaService";
import {useNavigate} from "react-router-dom";

export const Rejestracja = () => {
    const [status, setStatus] = useState("")
    const [haslo, setHaslo] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const navigate = useNavigate();

    function checkData(){
        if (haslo === "" || email === "" || login === "" || imie === "" || nazwisko === ""){
            setStatus("Wypełnij wszystkie pola!");
            return false;
        }
        else{
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                setStatus("Podaj poprawny adres email");
                return false;
            }
        }
        return true;
    }

    const handleClick = async () => {
        if (!checkData()) return 0;
        let res = await rejestacja({login, haslo, imie, nazwisko, email});
        if (res.data.status === "login") setStatus("Konto o podanym loginie już istnieje!");
        if (res.data.status === "email") setStatus("Konto o podanym mailu już istnieje!");
        if (res.data.status === "ok") navigate("/");
    }

    return(
        <>
            <input value={login} onChange={(e) => setLogin(e.target.value)} name="login" placeholder="login"
                   type="text"/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="email"
                   type="email"/>
            <input value={haslo} onChange={(e) => setHaslo(e.target.value)} name="haslo" placeholder="haslo"
                   type="password"/>
            <input value={imie} onChange={(e) => setImie(e.target.value)} name="imie" placeholder="imie" type="text"/>
            <input value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} name="nazwisko" placeholder="nazwisko"
                   type="text"/>
            <button onClick={handleClick}>Submit</button>
            <p>{status}</p>
        </>
    );
}