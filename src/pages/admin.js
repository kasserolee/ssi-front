import React, {useEffect} from "react";
import {verify} from "../Service/AutoryzacjaService";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        verify().then().catch((e) => navigate("/page403"));
    }, []);

    return(
        <div style={{margin: "0 auto", width: "75vw"}}>
            <Button style={{border: "1px skyblue solid"}} href="/waluta/dodaj">Dodaj walutę</Button><br/><br/>
            <Button style={{border: "1px skyblue solid"}} href="/addKurs">Dodaj kurs</Button><br/><br/>
        </div>
    )
}