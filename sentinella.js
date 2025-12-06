// ===============================
// SENTINELLA MONDINO v1.0
// ===============================

// Chiave AES scelta da te
const CHIAVE_AES = "Sentinella-Mondino-Key-2025";

// Funzione che cifra i dati in AES-256
function cifraDatiAES(dati) {
    return CryptoJS.AES.encrypt(JSON.stringify(dati), CHIAVE_AES).toString();
}

// Raccolta dati di base
function raccogliDati() {
    const dati = {
        userAgent: navigator.userAgent,
        lingua: navigator.language,
        timestamp: new Date().toISOString(),
        sessionId: crypto.randomUUID()
    };

    return dati;
}

// Invio dei dati cifrati a EmailJS
function inviaDati(datiCifrati) {

    // Inizializzazione EmailJS
    emailjs.init({
        publicKey: "htX2_6oDOj4VqH1pD"
    });

    emailjs.send("service_qf5owhx", "template_e1dwimp", {
        payload: datiCifrati
    })
    .then(() => {
        console.log("Segnale inviato correttamente.");
    })
    .catch((err) => {
        console.error("Errore durante l'invio:", err);
    });
}

// Avvio completo della Sentinella
function attivaSentinella() {
    const dati = raccogliDati();
    const cifrati = cifraDatiAES(dati);
    inviaDati(cifrati);
}

// Attivazione immediata all'apertura della pagina
attivaSentinella();
