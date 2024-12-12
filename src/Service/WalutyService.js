import axios from "axios";
const host = "http://localhost:9001"

export async function getWaluty(){
    return await axios.get(host + "/api/waluty");
}

export async function getWaluta(id){
    return await axios.get(host + "/api/waluty/"+id);
}