import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useCookies} from "react-cookie";

export const Header = () => {
    const [cookies, setCookies] = useCookies();
    const [zalogowany, setZalogowany] = useState(false);

    useEffect(() => {
        if (cookies["id"] !== undefined){
            setZalogowany(true)
        }
        else setZalogowany(false);
    }, [cookies]);

    return(
        <div>
            {!zalogowany && <div>
                <Button href="/login">Logowanie</Button><Button href="/rejestracja">Rejestracja</Button>
            </div>}
            {zalogowany && <div>
                <Button href="/wyloguj">Wyloguj</Button>
            </div>}
        </div>
    )
}