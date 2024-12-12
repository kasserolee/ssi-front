import axios from "axios";
const host = "http://localhost:9001"

export async function getUlubione(){
    return await axios.post(host + "/api/ulubione", "", {withCredentials: true});
}

export async function dodajUlubione(id){
    return await axios.post(host + "/api/ulubione/add/"+id, "", {withCredentials: true});
}

export async function usunUlubione(id){
    return await axios.post(host + "/api/ulubione/remove/"+id, "", {withCredentials: true});
}