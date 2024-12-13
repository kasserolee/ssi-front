import axios from "axios";
const host = "http://localhost:9001"

export async function zaloguj(dane){
    return await axios.post(host + "/login", dane, {withCredentials: true});
}

export async function rejestacja(dane){
    return await axios.post(host + "/rejestracja", dane, {withCredentials: true});
}

export async function wyloguj(){
    return await axios.post(host + "/login/wyloguj", "", {withCredentials: true});
}

export async function verify(){
    return await axios.post(host + "/login/autoryzuj", "", {withCredentials: true});
}