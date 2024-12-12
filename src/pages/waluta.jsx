import React, {useEffect, useState} from "react";
import {getWaluta} from "../Service/WalutyService";
import {useNavigate, useParams} from "react-router-dom";
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";

export const Waluta = (props) => {
    const [waluta, setWaluta] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const [daty, setDaty] = useState([]);
    const [wartosci, setWartosci] = useState([0]);

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

    return(
        <div style={{width: "75vw", margin: "0 auto"}}>
            <div style={{width: "45%", float: "right", textAlign: "left"}}>
                <b>{waluta.nazwa} - {waluta.kraj}</b><br/><br/>
                {waluta.symbol_unicode}
            </div>
            <div style={{width: "45%", float: "left"}}>
                {daty.length !== 0 && <LineChart xAxis={[{data: daty, scaleType: 'time', valueFormatter: (date) => dayjs(date).format("DD-MM-YYYY")}]} yAxis={[{min: Math.min(...wartosci)-1, max: Math.max(...wartosci)+1, data: wartosci}]} series={[{data: wartosci}]} height={500} width={500}></LineChart>}
                {daty.length === 0 && <p>Brak danych historycznych do wyświetlenia</p>}
            </div>
        </div>
    )
}