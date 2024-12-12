import React, {useEffect, useState} from "react";
import {zaloguj} from "../Service/AutoryzacjaService"
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const [status, setStatus] = useState("");
    const [login, setLogin] = useState("");
    const [haslo, setHaslo] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        let res = await zaloguj({login, haslo});
        setStatus(res.data.status);
        if (res.data.status === "ok") navigate("/");
        setStatus("Niepoprawny login lub hasło");
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