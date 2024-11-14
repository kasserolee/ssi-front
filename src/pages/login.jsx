import React, {useEffect, useState} from "react";

const host = "http://localhost:9001"

export const Login = () => {
    const [status, setStatus] = useState("");
    const [login, setLogin] = useState("");
    const [haslo, setHaslo] = useState("");


    useEffect(() => {
        fetch("http://localhost:9001/login").then(res => res.json()).then(status => setStatus(status.status))
    }, []);

    const handleLogin = () => {
        fetch(host + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                haslo: haslo
            })
        })
            .then(res => res.json())
            .then(data => setStatus(data.status))
            .catch(err => setStatus("Błąd logowania"));
    }

    return(
        <>
            <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                name="login"
                placeholder="Login"
                type="text"
            />

            <input
                value={haslo}
                onChange={(e) => setHaslo(e.target.value)}
                name="haslo"
                placeholder="Hasło"
                type="password"
            />

            <button onClick={handleLogin}>Zaloguj</button>
            <p>{status}</p>
        </>
    );
}