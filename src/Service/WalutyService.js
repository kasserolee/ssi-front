import axios from "axios";
const host = "http://localhost:9001"

export async function getWaluty(){
    return await axios.get(host + "/api/waluty");
}

export async function getWaluta(id){
    return await axios.get(host + "/api/waluty/"+id);
}

export async function addWaluta(waluta) {
    return await axios.post(host + "/api/waluty", waluta);
}

export async function search(query){
    return await axios.post(host + "/api/waluty/search", {query: query});
}

export async function deleteWaluta(id) {
    return await axios.delete(`${host}/api/waluty/${id}`);
}