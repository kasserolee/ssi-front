import React, {useState} from "react";
import {zmianaHasla} from "../Service/ProfilService";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const ZmianaHasla = () => {
    const [newHaslo, setNewHaslo] = useState("");
    const [confirmHaslo, setConfirmHaslo] = useState("");
    const [stareHaslo, setStareHaslo] = useState("");
    const [komunikat, setKomunikat] = useState("");
    const navigate = useNavigate();

    function checkData(){
        if (confirmHaslo !== newHaslo){
            setKomunikat("Powtórzone hasło nie pasuje do nowego");
            return false;
        }
        setKomunikat("");
        return true;
    }

    const handlePassword = async () => {
        if (!checkData()) return 0;
        let res = await zmianaHasla({stareHaslo, newHaslo});
        if (res.status !== 200){
            navigate("/page403");
        }
        if (res.data === "ok"){
            navigate("/profil");
        }
        setKomunikat("Podane hasło jest niepoprawne");
    }

    return(
        <div style={{margin: "0 auto"}}>
            <TextField type="password" onChange={(e) => {setStareHaslo(e.target.value)}} value={stareHaslo} label="Stare hasło" style={{width: "20vw"}}/><br/><br/>
            <TextField type="password" onChange={(e) => {setNewHaslo(e.target.value)}} value={newHaslo} label="Nowe hasło" style={{width: "20vw"}}/><br/><br/>
            <TextField type="password" onChange={(e) => {setConfirmHaslo(e.target.value)}} value={confirmHaslo} label="Powtórz nowe hasło" style={{width: "20vw"}}/><br/><br/>
            <Button style={{border: "1px solid skyblue"}} onClick={handlePassword}>Zmień</Button><br/><br/>
            {komunikat}
        </div>
    )
}