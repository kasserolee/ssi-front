import React, {useEffect, useState} from "react";
import {getWaluty, search, deleteWaluta} from "../Service/WalutyService";
import {useCookies} from "react-cookie";
import {dodajUlubione, getUlubione, usunUlubione} from "../Service/ProfilService";
import {useNavigate} from "react-router-dom";
import {Button, Fab, Icon, Pagination, TextField} from "@mui/material";
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
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [workingSet, setWorkingSet] = useState([]);
    const [itemCount, setItemCount] = useState(5);

    useEffect(() => {
        getWaluty().then((dane) => {
            setWaluty(dane.data);
            setWorkingSet(dane.data.slice((page-1)*itemCount, (page-1)*itemCount + itemCount));
            setPageCount(Math.ceil(dane.data.length / itemCount));
        });
        if (cookies.id !== undefined){
            setZalogowany(true);
            getUlubione().then((dane) => {
                let k = [];
                for (let i = 0; i < dane.data.length; i++){
                    k.push(dane.data[i].id_waluty);
                }
                setUlubione(k);
            }).catch((e) => navigate("/"));
        }
        else setZalogowany(false);
    }, [cookies, navigate]);

    async function removeFav(value){
        let res = await usunUlubione(value).catch((e) => navigate("/"));
        if (res.data === "ok"){
            ulubione.splice(ulubione.indexOf(value), 1);
        }
        if (filter) filterUpdate();
    }

    async function addFav(value){
        let res = await dodajUlubione(value).catch((e) => navigate("/"));
        if (res.data === "ok"){
            ulubione.push(value);
        }
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
            getWaluty().then((dane) => {
                setWaluty(dane.data);
                setWorkingSet(dane.data.slice((page-1)*itemCount, (page-1)*itemCount + itemCount));
                setPageCount(Math.ceil(dane.data.length / itemCount));
            });
        }
        else{
            setFilter(true);
            let k = [];
            k = waluty.filter((waluta) => ulubione.includes(waluta.id));
            setWaluty(k);
            setWorkingSet(k.slice((page-1)*itemCount, (page-1)*itemCount + itemCount));
            setPageCount(Math.ceil(k.length / itemCount));
        }
    }

    const handleSearch = async () => {
        let res = await search(query);
        setWaluty(res.data);
        if (filter) {
            let k = [];
            k = res.data.filter((waluta) => ulubione.includes(waluta.id));
            setWaluty(k);
            setWorkingSet(k.slice((page-1)*itemCount, (page-1)*itemCount + itemCount));
            setPageCount(Math.ceil(k.length / itemCount));
        }
        else{
            setWorkingSet(res.data.slice((page-1)*itemCount, (page-1)*itemCount + itemCount));
            setPageCount(Math.ceil(res.data.length / itemCount));
        }
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

    const handlePageChange = (event, value) => {
        setPage(value);
        setWorkingSet(waluty.slice((value-1)*itemCount, (value-1)*itemCount + itemCount))
    }


    return(
        <div style={{marginTop: "5vh"}}>
            <div>{cookies["id"] !== undefined && <span>Ulubione: <input type="checkbox" onChange={filterFav}/></span>} <TextField onChange={(e) => setQuery(e.target.value)} style={{width: "25vw"}} label="Wyszukiwanie"/> <Fab size="medium" onClick={handleSearch}><SearchIcon/></Fab></div><br/><br/>
            {waluty.length !== 0 && <div style={{textAlign: "left", width: "75vw", margin: "0 auto", height: "fit-content"}}>
                {workingSet.map((waluta) => <div key={waluta.id} style={{height: "6vh", border: "1px lightblue solid", marginBottom: "1vh", padding: "10px"}}>
                    <a style={{textDecoration: "none", color: "black"}} href={"/waluta/"+waluta.id}> {waluta.nazwa} - {waluta.kraj} </a> {waluta.kurs && <span style={{fontWeight: "bold"}}> {waluta.kurs}zł</span>}<span style={{float: "right"}}>{ulubione.includes(waluta.id) && <Fab value={waluta.id} onClick={async (e) => {
                    await removeFav(waluta.id)
                    setRefresh(refresh+1);
                }} size="small" style={{boxShadow: "none"}}><FavoriteIcon value={waluta.id}/></Fab>}{!ulubione.includes(waluta.id) && zalogowany && <Fab value={waluta.id} onClick={async (e) => {
                    await addFav(waluta.id);
                    setRefresh(refresh+1);
                }} size="small" style={{boxShadow: "none"}}><FavoriteBorderIcon value={waluta.id}/></Fab>}
                    {cookies["stan_konta"] !== undefined && cookies['stan_konta'].match(/^s:(.*)\..*$/)[1] === "administrator" && <Fab
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
                    </Fab>}
                    </span>
                </div>)}
                <Pagination count={pageCount} page={page} onChange={handlePageChange}/>
            </div>}
            {waluty.length === 0 && <div>
                <p>Brak walut do wyświetlenia</p>
            </div>}
        </div>
    )
}