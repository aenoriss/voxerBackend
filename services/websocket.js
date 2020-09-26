const request = require('request');
const WebSocket = require("ws");

let socketRofex;
const base_url = "https://api.remarkets.primary.com.ar/";
const base_url_ws = "wss://api.remarkets.primary.com.ar/";


// let simbolosProd = [{ symbol: "MERV - XMEV - GGAL - 48hs", marketId: "ROFX" }];

// let pedido = {"type": "smd", "level": 1, "entries": ["BI", "OF"],
//     "products": simbolosProd, "depth": 10 };


let simbolosProd = [{ symbol: "RFX20Dic20", marketId: "ROFX" }];

let pedido = {"type": "smd", "level": 1, "entries": ["BI", "OF", "LA", "OP", "CL"],
    "products": simbolosProd, "depth": 1 };


const rofex_iniciarWS = (pUsuario, pClave, pCallback) => {
    try {
        request.post(
            base_url + "j_spring_security_check?j_username=" + pUsuario + "&j_password=" + pClave, { form: { key: 'value' } },
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(response.statusCode)
                } else {
                    if (!response || typeof(response) == "undefined") {
                        pCallback("error");
                    } else {
                        if (typeof(response.headers) == "undefined" || typeof(response.headers['set-cookie']) == "undefined" || !response.headers['set-cookie']) {
                            pCallback("error");
                        } else {
                            var token = response.headers['set-cookie'].toString().split(";")[0];
                            pCallback(token);
                        }}}});
    } catch (error) {
        pCallback("error");
    }
}

 const iniciarRofex = (user, password) => {
        rofex_iniciarWS(user, password, function(pTk) {
            if (pTk != "error") {
                socketRofex = new WebSocket(base_url_ws, null, { headers: { Cookie:   pTk } });
                socketRofex.on('open', function open() {
                    suscribir(pedido);});
                socketRofex.on('error', function(e) {
                    console.log("error de scoket", e);
                });
                socketRofex.on('message', function(data, flags) {
                    try {
                        var p = JSON.parse(data);
                        //ACA ES DONDE MOSTRAMOS LA INFO
                        console.log("socketRofex on message",p,  p.marketData);
                    } catch (error) {
                        console.log(error);}
                });
            } else {
                console.log("Error in login process");
                // console.log(pLogin);
            }});
}

function suscribir(datos){
    if (socketRofex && socketRofex.readyState == 1) {
        socketRofex.send(JSON.stringify(datos));
        console.log("Conectado con socketRofex", JSON.stringify(datos), socketRofex.readyState);}
   }