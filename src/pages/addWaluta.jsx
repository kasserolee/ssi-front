import React, {useState} from "react";
import {addWaluta} from "../Service/WalutyService";

const DodajWalute = () => {
    const [symbolUnicode, setSymbolUnicode] = useState("");
    const [nazwa, setNazwa] = useState("");
    const [kraj, setKraj] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const waluta = {
            symbol_unicode: symbolUnicode,
            nazwa: nazwa,
            kraj: kraj
        };

        try {
            const response = await addWaluta(waluta);

            if(response.status === 201) {
                setMessage(`Sukces`);
                setSymbolUnicode("");
                setNazwa("");
                setKraj("");
            } else {
                setMessage("Nieoczekiwany błąd.");
            }
        } catch (error) {
            setMessage(`Błąd`);
        }
    };


    return (
        <div>
            <h2>Dodaj nową walutę</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Symbol Unicode"
                    value={symbolUnicode}
                    onChange={(e) => setSymbolUnicode(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nazwa"
                    value={nazwa}
                    onChange={(e) => setNazwa(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Kraj"
                    value={kraj}
                    onChange={(e) => setKraj(e.target.value)}
                    required
                />
                <button type="submit">Dodaj walutę</button>
            </form>
            {message}
        </div>
    );

};

export default DodajWalute;