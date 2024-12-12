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
        <div style={{width: "75vw", margin: "0 auto", height: "7vh", backgroundColor: "white"}}>
            <div style={{float: "right"}}>
                {!zalogowany && <div>
                    <Button href="/login">Logowanie</Button><Button href="/rejestracja">Rejestracja</Button>
                </div>}
                {zalogowany && <div>
                    <Button href="/profil">Profil</Button>
                    <Button href="/wyloguj">Wyloguj</Button>
                </div>}
            </div>
            <div style={{float: "left"}}>
                <Button href="/">Waluty</Button>
            </div>
        </div>
    )
}