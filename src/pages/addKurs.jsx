import React, {useEffect, useState} from "react";
import {Autocomplete, Button, TextField} from "@mui/material";
import {getWaluty} from "../Service/WalutyService";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import {dodaj} from "../Service/HistoriaService";
import {useNavigate} from "react-router-dom";

export const AddKurs = () => {
    const [waluty, setWaluty] = useState([]);
    const [nazwy, setNazwy] = useState([]);
    const [waluta, setWaluta] = useState();
    const [data, setData] = useState(dayjs());
    const [kurs, setKurs] = useState(0);
    const [komunikat, setKomunikat] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getWaluty().then((dane) => {
            setWaluty(dane.data);
            let k = [];
            for (let i = 0; i < dane.data.length; i++){
                k.push(dane.data[i].nazwa);
            }
            setNazwy(k);
        });
    }, []);

    function checkData(){
        if (waluta === "" || kurs <= 0){
            setKomunikat("Podaj poprawne dane");
            return false;
        }
        setKomunikat("");
        return true;
    }

    const handleSubmit = async () => {
        if (!checkData()) return 0;
        let k = waluty.find((element) => element.nazwa === waluta);
        let res = await dodaj({
            id_waluty: k.id,
            kurs: kurs,
            data: data.year() + "-" + (data.month() + 1) + "-" + data.date()
        });
        if (res.status !== 200) navigate("/page403");
        if (res.data === "ok") setKomunikat("Dodano");
    }

    return(
        <div style={{width: "75vw", margin: "0 auto", paddingTop: "5vh"}}>
            <h4>Dodaj kurs waluty</h4>
            <Autocomplete onChange={(e,v) => setWaluta(v)} renderInput={(params) => <TextField {...params} label="Waluta" style={{width: "20vw"}}/>} options={nazwy}/><br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker
                format="YYYY-MM-DD"
                value={data}
                onChange={(newValue) => setData(newValue)}
            /></LocalizationProvider><br/><br/>
            <TextField value={kurs} type="number" label="Kurs" onChange={(e) => setKurs(e.target.value)}/><br/><br/>
            <Button onClick={handleSubmit} style={{border: "1px skyblue solid"}}>Zapisz</Button><br/><br/>
            {komunikat}
        </div>
    )
}