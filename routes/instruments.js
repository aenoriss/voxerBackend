var express = require('express');
var router = express.Router();
var fetch = require('../node_modules/node-fetch');
let token;
const request = require('request');
const WebSocket = require("ws");
let socketRofex;
const base_url = "https://api.remarkets.primary.com.ar/";
const base_url_ws = "wss://api.remarkets.primary.com.ar/";
let simbolosProd = [];

let motherofalldata = [];
let array = [];
///////////////////////


const saveAlgo = async (p) => {
    motherofalldata.push(p);
    // console.log(motherofalldata)
}


/* GET users listing. */
router.get('/', async function (req, res, next) {

    let wasd ="asdasd"
    getAll().then( respuesta => {
        if(motherofalldata != []){
            array= motherofalldata;
            setTimeout(()=>{
                res.send(motherofalldata)
            },[7000]);
        }   
    }   );
    

});

// const token = 'EvdjIIAWqHRA47DGjUkF82FQDJGVZdytxRKQfUf7Xv8=';

const getToken = async (req, res) => {
    try {
        const response = await fetch("https://api.remarkets.primary.com.ar/auth/getToken", {
            method: 'POST',
            headers: {
                "x-Username": "cayundiego094776",
                "x-password": "qpjhwG9)"
            }
        })
        
        const parsedResponse = response.headers.get("X-Auth-Token");
        // console.log(parsedResponse, "TOKEEEEN")
        return parsedResponse;

    } catch (error) {
        console.log(error,"nopee");
    }
}

//GET MarketId & Symbol
const getAll = async (req, res) => {
    try {
        token = await getToken();
        const response = await fetch('https://api.remarkets.primary.com.ar/rest/instruments/all', {
            method: 'GET',
            headers: {
                'x-auth-token': token
            }
        });
        const data = await response.json();
        console.log(data.instruments,"dataaa xddd")
        console.log(data.instruments);
        data.instruments.forEach( item => {
         
            simbolosProd.push({"symbol":item.instrumentId.symbol, marketId: item.instrumentId.marketId})
           
        })
        // let i=0;
        // for (const item of data.instruments) {
        //     i++;
        //     if( i < 5){
        //         simbolosProd.push({"symbol":item.instrumentId.symbol, marketId: item.instrumentId.marketId})
        //        }
        
        
        return await iniciarRofex("cayundiego094776", "qpjhwG9)");
        // console.log(res)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The request failed.'
        });
    }
}

const rofex_iniciarWS =  (pUsuario, pClave, pCallback) => {
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


 const iniciarRofex = async (user, password) => {

     return  rofex_iniciarWS(user, password, async function(pTk) {

            if (pTk != "error") {
                socketRofex = new WebSocket(base_url_ws, null, { headers: { Cookie:   pTk } });
                socketRofex.on('open', function open() {
                    let pedido = {"type": "smd", "level": 1, "entries": ["BI", "OF", "LA", "OP", "CL"],"products": simbolosProd, "depth": 1 };
                    suscribir(pedido);});
                socketRofex.on('error', function(e) {
                    console.log("error de socket", e);
                });
                ////////////////////////////////////////////
                ////////////////////////////////////////////////
                socketRofex.on('message', data => {
                    const p = JSON.parse(data);
                    // console.log(p)
                    saveAlgo(p);
                });
          
          
            } else {
                console.log("Error in login process");
                // console.log(pLogin);
            }
            
        });
            
}

function suscribir(datos){
    if (socketRofex && socketRofex.readyState == 1) {
        socketRofex.send(JSON.stringify(datos));
        // console.log("Conectado con socketRofex", JSON.stringify(datos), socketRofex.readyState);
    }
   }

module.exports = router;
