import React, {useEffect, useState} from "react";
import {getWaluta, updateWaluta} from "../Service/WalutyService";
import {useNavigate, useParams} from "react-router-dom";
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";
import {Button, TextField} from "@mui/material";
import {useCookies} from "react-cookie";

export const Waluta = (props) => {
    const [waluta, setWaluta] = useState({});
    const [edit, setEdit] = useState(false);
    const [newNazwa, setNewNazwa] = useState("");
    const [newKraj, setNewKraj] = useState("");
    const [newSymbolUnicode, setNewSymbolUnicode] = useState("");
    const [komunikat, setKomunikat] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const [daty, setDaty] = useState([]);
    const [wartosci, setWartosci] = useState([0]);
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        getWaluta(params.id).then((dane) => {
            setWaluta(dane.data.waluta);
            if (dane.data.historia){
                let x = [];
                let y = [];
                for (let i = 0; i < dane.data.historia.length; i++){
                    x.push(new Date(dane.data.historia[i].data));
                    y.push(dane.data.historia[i].kurs);
                }
                setDaty(x);
                setWartosci(y);
            }
        }).catch((e) => navigate("/page404"));
    }, []);


    const handleEdytuj = () => {
        setEdit(true);
        setNewNazwa(waluta.nazwa);
        setNewKraj(waluta.kraj);
        setNewSymbolUnicode(waluta.symbol_unicode);
    };


    const handleUpdate = async () => {
        if(!newNazwa || !newKraj || !newSymbolUnicode){
            setKomunikat("Wypełnij wszystkie pola.");
            return;
        }

        try {
            const res = await updateWaluta(params.id, {
                nazwa: newNazwa,
                kraj: newKraj,
                symbol_unicode: newSymbolUnicode
            });

            if(res.status === 200) {
                setKomunikat("");
                setEdit(false);
                setWaluta({
                    nazwa: newNazwa,
                    kraj: newKraj,
                    symbol_unicode: newSymbolUnicode
                });
            }
        } catch (error) {
            setKomunikat("Błąd podczas aktualizacji waluty.");
        }
    };


    return (
        <div style={{width: "75vw", margin: "0 auto"}}>
            {!edit && (
                <>
                    <div style={{width: "45%", float: "right", textAlign: "left"}}>
                        <b>{waluta.nazwa} - {waluta.kraj}</b><br/><br/>
                        {waluta.symbol_unicode}<br/>
                        {cookies["stan_konta"] !== undefined && cookies['stan_konta'].match(/^s:(.*)\..*$/)[1] === "administrator" &&<Button style={{marginTop: "1rem", border: "1px solid skyblue"}} onClick={handleEdytuj}>
                            Edytuj walutę
                        </Button>}
                    </div>
                    <div style={{width: "45%", float: "left"}}>
                        {daty.length !== 0 ? (
                            <LineChart
                                xAxis={[{
                                    data: daty,
                                    scaleType: 'time',
                                    valueFormatter: (date) => dayjs(date).format("DD-MM-YYYY")
                                }]}
                                yAxis={[{
                                    min: Math.min(...wartosci) - 1,
                                    max: Math.max(...wartosci) + 1,
                                    data: wartosci
                                }]}
                                series={[{data: wartosci}]}
                                height={500}
                                width={500}
                            />
                        ) : (
                            <p>Brak danych historycznych do wyświetlenia</p>
                        )}
                    </div>
                </>
            )}
            {edit && (
                <div>
                    <p>Edycja waluty</p><br/>
                    <TextField label="Nazwa" value={newNazwa} onChange={(e) => setNewNazwa(e.target.value)} /><br/><br/>
                    <TextField label="Kraj" value={newKraj} onChange={(e) => setNewKraj(e.target.value)} /><br/><br/>
                    <TextField label="Symbol Unicode" value={newSymbolUnicode} onChange={(e) => setNewSymbolUnicode(e.target.value)} /><br/><br/>
                    <Button style={{border: "1px solid skyblue"}} onClick={handleUpdate}>Zapisz</Button>
                </div>
            )}
            {komunikat && <p style={{color: "red"}}>{komunikat}</p>}
        </div>
    );
}