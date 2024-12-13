import axios from "axios";
const host = "http://localhost:9001"

export async function dodaj(dane){
    return await axios.post(host + "/api/historia/add", dane, {withCredentials: true});
}