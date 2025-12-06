// Chiave AES della Sentinella Mondino
const CHIAVE_AES = "Sentinella-Mondino-Key-2025";

function decifra() {
    const testo = document.getElementById("input").value.trim();

    try {
        const bytes = CryptoJS.AES.decrypt(testo, CHIAVE_AES);
        const decifrato = bytes.toString(CryptoJS.enc.Utf8);

        if (!decifrato) {
            document.getElementById("output").innerText = "❌ Errore: chiave errata o testo non valido.";
            return;
        }

        // Format JSON
        const obj = JSON.parse(decifrato);
        const bello = JSON.stringify(obj, null, 4);

        document.getElementById("output").innerText = bello;

    } catch (e) {
        document.getElementById("output").innerText = "❌ Errore durante la decifrazione.";
    }
}
