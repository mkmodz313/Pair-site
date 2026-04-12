const express = require('express');
const app = express();
const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

app.get('/pair', async (req, res) => {
    let phone = req.query.number;
    if (!phone) return res.json({ code: "Number missing" });

    try {
        const { state, saveCreds } = await useMultiFileAuthState('session');
        const conn = makeWASocket({ auth: state, printQRInTerminal: false });

        // Yeh line WhatsApp se pair code mangwati hai
        let code = await conn.requestPairingCode(phone);
        res.json({ code: code });
    } catch (error) {
        res.json({ code: "Service Unavailable" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
