import { dataJSON, simbolosProd } from '../controllers/Instruments.controller'
import fetch from 'node-fetch'

const base_url_ws = "wss://api.remarkets.primary.com.ar/";
const base_url = "https://api.remarkets.primary.com.ar/";
const request = require('request');
const WebSocket = require("ws");
const user = "cayundiego094776";
const password = "qpjhwG9)";

let motherofalldata = [];
let socketRofex;

const saveAlgo = async (p) => {
    motherofalldata.push(p);
}

export const getToken = async (req, res) => {
    try {
        const response = await fetch("https://api.remarkets.primary.com.ar/auth/getToken", {
            method: 'POST',
            headers: {
                "x-Username": "cayundiego094776",
                "x-password": "qpjhwG9)"
            }
        })
        const parsedResponse = response.headers.get("X-Auth-Token");

        return parsedResponse;
    } 
    catch (error) {
        console.log(error, "nopee");
    }
}

const rofex_iniciarWS = (pUsuario, pClave, pCallback) => {
    try {
        request.post(
            base_url + "j_spring_security_check?j_username=" + pUsuario + "&j_password=" + pClave, { form: { key: 'value' } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(response.statusCode)
                } else {
                    if (!response || typeof (response) == "undefined") {
                        pCallback("error");
                    } else {
                        if (typeof (response.headers) == "undefined" || typeof (response.headers['set-cookie']) == "undefined" || !response.headers['set-cookie']) {
                            pCallback("error");
                        } else {
                            var token = response.headers['set-cookie'].toString().split(";")[0];
                            pCallback(token);
                        }
                    }
                }
            });
    } catch (error) {
        pCallback("error");
    }
}

export const iniciarRofex = async (lData, typeVar) => {
    
    lData = dataJSON;
    let pedido;

    switch(typeVar){
        case "getAll" :
            pedido = { "type": "smd", "level": 1, "entries": ["LA", "OP", "CL", "EV"], "products": simbolosProd, "depth": 1 };
            break;
        
        case "getMarketHistory" :
            // TODO: solicitar en entries el market history
            // pedido = { "type": "smd", "level": 1, "entries": ["LA", "OP", "CL", "EV"], "products": simbolosProd, "depth": 1 };
            break;
    }

    return rofex_iniciarWS(user, password, async function (pTk) {
        if (pTk != "error") {                        
            motherofalldata = [];
            socketRofex = new WebSocket(base_url_ws, null, { headers: { Cookie: pTk } });
            socketRofex.on('open', function open() {
            suscribir(pedido);
            });
            socketRofex.on('error', function (e) {
                console.log("error de socket", e);
            });
            socketRofex.on('message', lData => {
                const p = JSON.parse(lData);
                saveAlgo(p);
            });
        } 
        else 
        {
            console.log("Error in login process");
        }
    });
}

function suscribir(datos) {    
    if (socketRofex && socketRofex.readyState == 1) {
        socketRofex.send(JSON.stringify(datos));        
        // console.log("Conectado con socketRofex", JSON.stringify(datos), socketRofex.readyState);
    }
}

export { motherofalldata };