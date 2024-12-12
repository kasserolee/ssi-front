import React, {useEffect, useState} from "react";
import {getWaluty} from "../Service/WalutyService";
import {useCookies} from "react-cookie";
import {dodajUlubione, getUlubione, usunUlubione} from "../Service/ProfilService";
import {useNavigate} from "react-router-dom";
import {Button, Fab, Icon} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Waluty = () => {
    const [waluty, setWaluty] = useState([]);
    const [ulubione, setUlubione] = useState([]);
    const [cookies, setCookies] = useCookies([]);
    const navigate = useNavigate();
    const [zalogowany, setZalogowany] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        getWaluty().then((dane) => setWaluty(dane.data));
        if (cookies.id !== undefined){
            setZalogowany(true);
            getUlubione().then((dane) => {
                for (let i = 0; i < dane.data.length; i++){
                    ulubione.push(dane.data[i].id_waluty);
                }
                setUlubione(ulubione);
            }).catch((e) => navigate("/"));
        }
        else setZalogowany(false);
    }, [cookies, navigate, ulubione]);

    async function removeFav(value){
        let res = await usunUlubione(value).catch((e) => navigate("/"));
        if (res.data === "ok"){
            ulubione.splice(ulubione.indexOf(value), 1);
        }
        setUlubione(ulubione);
        setRefresh(refresh+1);
    }

    async function addFav(value){
        let res = await dodajUlubione(value).catch((e) => navigate("/"));
        if (res.data === "ok"){
            ulubione.push(value);
        }
        setUlubione(ulubione);
        setRefresh(refresh+1);
    }

    return(
        <div style={{textAlign: "left", width: "75vw", margin: "0 auto", height: "fit-content"}}>
            {waluty.map((waluta) => <div key={waluta.id} style={{height: "6vh", border: "1px lightblue solid", marginBottom: "1vh", padding: "10px"}}>
                <a href={"/waluta/"+waluta.id}> {waluta.nazwa} - {waluta.kraj} </a><span style={{float: "right"}}>{ulubione.includes(waluta.id) && <Fab value={waluta.id} onClick={(e) => {removeFav(waluta.id)}} size="small" style={{boxShadow: "none"}}><FavoriteIcon value={waluta.id}/></Fab>}{!ulubione.includes(waluta.id) && zalogowany && <Fab value={waluta.id} onClick={(e) => {addFav(waluta.id)}} size="small" style={{boxShadow: "none"}}><FavoriteBorderIcon value={waluta.id}/></Fab>} {waluta.kurs && <span>Kurs: {waluta.kurs}zł</span>}</span>
            </div>)}
        </div>
    )
}