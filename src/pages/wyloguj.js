import React, {useEffect} from "react";
import {wyloguj} from "../Service/AutoryzacjaService";
import {useNavigate} from "react-router-dom";

export const Wyloguj = () => {
    const navigate = useNavigate();

    useEffect(() => {
        wyloguj().catch((e) => navigate("/page403"));
    }, []);

    return(
        <div>
            <p>Pomyślnie wylogowano</p>
            <a href="/">Strona główna</a>
        </div>
    )
}