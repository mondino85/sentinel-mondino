// Chiave AES della Sentinella Mondino
const CHIAVE_AES = "Sentinella-Mondino-Key-2025";

function decifra() {
    const testo = document.getElementById("input").value.trim();

    try {
        // Decifra
        const bytes = CryptoJS.AES.decrypt(testo, CHIAVE_AES);
        const decifrato = bytes.toString(CryptoJS.enc.Utf8);

        if (!decifrato || decifrato.trim() === "") {
            document.getElementById("output").innerText =
                "❌ Errore: testo non valido o chiave errata.";
            return;
        }

        // Converti in JSON
        let obj = null;
        try {
            obj = JSON.parse(decifrato);
        } catch (e) {
            document.getElementById("output").innerText =
                "❌ Il testo decifrato non è un JSON valido.";
            return;
        }

        // Formattazione bella
        const bello = JSON.stringify(obj, null, 4);

        document.getElementById("output").innerText = bello;

    } catch (e) {
        document.getElementById("output").innerText =
            "❌ Errore nella decifrazione.";
    }
}
