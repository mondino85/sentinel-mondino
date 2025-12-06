// ===============================
// SENTINELLA MONDINO v1.5
// AES + GEO-IP AUTOMATICA
// ===============================

// Chiave AES
const CHIAVE_AES = "Sentinella-Mondino-Key-2025";

// Funzione cifratura AES
function cifraDatiAES(dati) {
    return CryptoJS.AES.encrypt(JSON.stringify(dati), CHIAVE_AES).toString();
}

// Raccolta dati base
function raccogliDatiBase() {
    return {
        userAgent: navigator.userAgent,
        lingua: navigator.language,
        timestamp: new Date().toISOString(),
        sessionId: crypto.randomUUID()
    };
}

// GEO-IP automatica (nessun popup)
async function geolocalizzazioneIP() {
    try {
        const risposta = await fetch("https://ipapi.co/json/");
        const geo = await risposta.json();

        return {
            geo_type: "IP",
            ip: geo.ip || "unknown",
            city: geo.city || "unknown",
            region: geo.region || "unknown",
            country: geo.country_name || "unknown",
            lat: geo.latitude || null,
            lon: geo.longitude || null
        };

    } catch (e) {
        return { geo_type: "IP", error: "failed" };
    }
}

// Invio dati cifrati a EmailJS
function inviaDati(datiCifrati) {
    emailjs.init({ publicKey: "htX2_6oDOj4VqH1pD" });

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

// Flusso completo Sentinella
async function attivaSentinella() {

    // 1) dati base
    const dati = raccogliDatiBase();

    // 2) aggiungi geo-IP
    const geo = await geolocalizzazioneIP();
    dati["geo"] = geo;

    // 3) cifra tutto
    const datiCifrati = cifraDatiAES(dati);

    // 4) invia
    inviaDati(datiCifrati);
}

// Avvio immediato
attivaSentinella();
