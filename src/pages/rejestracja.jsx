import React, {Component, useEffect, useState} from "react";
const host = "http://localhost:9001";

export const Rejestracja = () => {
    const [status, setStatus] = useState("abc")
    const [haslo, setHaslo] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");

    useEffect(() => {
        fetch("http://localhost:9001/rejestracja").then(res => res.json()).then(status => setStatus(status.status))
    }, []);

    const dane = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify({
            uzytkownik:{
                login: login,
                haslo: haslo,
                email: email,
                imie: imie,
                nazwisko: nazwisko
            }
        })
    }

    const handleClick = () => {
        fetch(host+"/rejestracja", dane).then(res => res.json()).then(data => setStatus(data.status))
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
            <button onClick={() => handleClick()}>Submit</button>
            <p>{status}</p>
        </>
    );
}