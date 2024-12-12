import React, {useEffect, useState} from "react";
import {getWaluty, search, deleteWaluta} from "../Service/WalutyService";
import {useCookies} from "react-cookie";
import {dodajUlubione, getUlubione, usunUlubione} from "../Service/ProfilService";
import {useNavigate} from "react-router-dom";
import {Button, Fab, Icon, TextField} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

export const Waluty = () => {
    const [waluty, setWaluty] = useState([]);
    const [ulubione, setUlubione] = useState([]);
    const [cookies, setCookies] = useCookies([]);
    const navigate = useNavigate();
    const [zalogowany, setZalogowany] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [filter, setFilter] = useState(false);
    const [query, setQuery] = useState("");

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
        if (filter) filterUpdate();
    }

    async function addFav(value){
        let res = await dodajUlubione(value).catch((e) => navigate("/"));
        if (res.data === "ok"){
            ulubione.push(value);
        }
        setUlubione(ulubione);
        setRefresh(refresh+1);
        if (filter) filterUpdate();
    }

    function filterUpdate() {
        let k = [];
        k = waluty.filter((waluta) => ulubione.includes(waluta.id));
        setWaluty(k);
    }

    const filterFav = (change) => {
        if (filter){
            setFilter(false);
            getWaluty().then((dane) => setWaluty(dane.data));
        }
        else{
            setFilter(true);
            let k = [];
            k = waluty.filter((waluta) => ulubione.includes(waluta.id));
            setWaluty(k);
        }
    }

    const handleSearch = async () => {
        let res = await search(query);
        setWaluty(res.data);
        if (filter) filterUpdate();
    }


    async function deleteCurrency(id) {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę walutę?");
        if(confirmDelete) {
            try {
                await deleteWaluta(id);
                const updatedWaluty = waluty.filter((waluta) => waluta.id !== id);
                setWaluty(updatedWaluty);
                alert("Waluta została usunięta.");
            } catch (error) {
                console.error("Błąd podczas usuwania waluty:", error);
                alert("Nie udało się usunąć waluty.");
            }
        }
    }


    return(
        <div style={{marginTop: "5vh"}}>
            <div>Ulubione: <input type="checkbox" onChange={filterFav}/> <TextField onChange={(e) => setQuery(e.target.value)} style={{width: "25vw"}} label="Wyszukiwanie"/> <Fab size="medium" onClick={handleSearch}><SearchIcon/></Fab></div><br/><br/>
            {waluty.length !== 0 && <div style={{textAlign: "left", width: "75vw", margin: "0 auto", height: "fit-content"}}>
                {waluty.map((waluta) => <div key={waluta.id} style={{height: "6vh", border: "1px lightblue solid", marginBottom: "1vh", padding: "10px"}}>
                    <a style={{textDecoration: "none", color: "black"}} href={"/waluta/"+waluta.id}> {waluta.nazwa} - {waluta.kraj} </a> {waluta.kurs && <span style={{fontWeight: "bold"}}> {waluta.kurs}zł</span>}<span style={{float: "right"}}>{ulubione.includes(waluta.id) && <Fab value={waluta.id} onClick={(e) => {removeFav(waluta.id)}} size="small" style={{boxShadow: "none"}}><FavoriteIcon value={waluta.id}/></Fab>}{!ulubione.includes(waluta.id) && zalogowany && <Fab value={waluta.id} onClick={(e) => {addFav(waluta.id)}} size="small" style={{boxShadow: "none"}}><FavoriteBorderIcon value={waluta.id}/></Fab>}
                    <Fab
                        value={waluta.id}
                        onClick={() => deleteCurrency(waluta.id)}
                        size="small"
                        style={{
                            boxShadow: "none",
                            marginLeft: "10px",
                            backgroundColor: "red",
                            color: "white",
                        }}
                    >
                        <DeleteIcon value={waluta.id} />
                    </Fab>
                    </span>
                </div>)}
            </div>}
            {waluty.length === 0 && <div>
                <p>Brak walut do wyświetlenia</p>
            </div>}
        </div>
    )
}