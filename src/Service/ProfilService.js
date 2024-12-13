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

export async function getProfil(){
    return await axios.post(host + "/api/uzytkownicy/uzytkownik", "", {withCredentials: true});
}

export async function updateProfil(profil){
    return await axios.patch(host + "/api/uzytkownicy/uzytkownik", profil, {withCredentials: true});
}

export async function deactivate(){
    return await axios.patch(host + "/api/uzytkownicy/deaktywuj", "", {withCredentials: true});
}

export async function zmianaHasla(dane){
    return await axios.patch(host + "/api/uzytkownicy/passChange", dane, {withCredentials: true});
}