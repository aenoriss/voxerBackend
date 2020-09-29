import fetch from 'node-fetch'
let token;
const request = require('request');
const WebSocket = require("ws");
let socketRofex;
const base_url = "https://api.remarkets.primary.com.ar/";
const base_url_ws = "wss://api.remarkets.primary.com.ar/";
let simbolosProd = [];
let motherofalldata = [];
let array = [];
let auxArray = [];
///////////////////////

const saveAlgo = async (p) => {
    motherofalldata.push(p);
    // console.log(motherofalldata)
}

/* GET users listing. 
export const getInstrumentsProbando = async (req, res) => {
    getInstruments().then(() => {
        array.map((item, index) => {
            // console.log(item.marketData)
        })
    }
    )
}
*/

/*
BI: Bid 
OF: Offer 
LA: Last, último precio operado 
OP: Open, precio de apertura 
CL: Close, precio de cierre 
SE: Settlement
OI: Open Interest 
*/


export const getInstruments = async (req, res) => {
    getAll().then(() => {
        if (motherofalldata != []) {
            setTimeout(() => {
                array = motherofalldata;

                array.forEach(item => {
                    if (item.marketData.LA != null && item.marketData.OP != null) {
                        const objetito = {
                            ticker: "BTC", // Arreglar esta poronga
                            symbol: item.instrumentId.symbol,
                            timestamp: item.timestamp,
                            instrumentId: item.instrumentId.marketId,
                            lastPrice : item.marketData["LA"].price,
                            rend : item.marketData["LA"].price / item.marketData["OP"],
                            closing: item.marketData["CL"] != null ? item.marketData["CL"].price : null,
                            
                            
                        }
                        auxArray.push(objetito);
                        console.log(objetito.rend)
                    }
                });
                res.send(auxArray)
            }, [3000]);
        }

        /*setTimeout(() => {
                array = motherofalldata;
                array.map( item => {
                    if(item.marketData.CL != null && item.marketData.LA != null && item.marketData.OP != null ){
                        const objetito = {
                            ticker: "BTC",
                            symbol : item.instrumentId.symbol,
                            timestamp : item.timestamp,
                            instrumentId: item.instrumentId.marketId,
                            marketData: item.marketData.CL,
                        }
                        array.push(objetito);
                        console.log(objetito)
                    }
                    
                } )
                res.send(auxArray)
            }, [3000]);*/
    });
}



/*
    const aux = [];
    const marketObj = {
        "symbol": 'symbol',
        "precio_Actual": 0,
        "rendimento": 0,    //precio actual / precio apertura
    }

    //Esto en teoria ordenaria el array de forma creciente 

    
    var sorted = [];                                 //a y b son 2 variables obligatorias, serian 2 objs del array
    sorted = aux.sort(function (a, b) {              //va tomando de a 2 valores
        return a.rend - b.rend;                      //retorna negativo "a" es menor, positivo si b es menor, 0 si son iguales
    })
*/





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
        console.log(error, "nopee");
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
        //console.log(data.instruments,"dataaa xddd")
        //console.log(data.instruments);
        data.instruments.forEach(item => {

            simbolosProd.push({ "symbol": item.instrumentId.symbol, marketId: item.instrumentId.marketId })

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

// GET Winners & Losers
// winOrLose = bool

/*
router.get('/winnersAndLosers', async function (req, res, next, winOrLose) {    

    const mockeoDelOrto = [
        {
            name : "a",
            price : 2,
            opPrice : 1,
            rend : opPrice / price,
        },
        {
            name : "b",
            price : 3,
            opPrice : 2,
            rend : opPrice / price,
        },
        {
            name : "c",
            price : 1,
            opPrice : 3,
            rend : opPrice / price,
        },
        {
            name : "d",
            price : 7,
            opPrice : 4,
            rend : opPrice / price,
        },
        {
            name : "e",
            price : 6,
            opPrice : 5,
            rend : opPrice / price,
        },
        {
            name : "f",
            price : 5,
            opPrice : 6,
            rend : opPrice / price,
        },
        {
            name : "g",
            price : 9,
            opPrice : 7,
            rend : opPrice / price,
        },
        {
            name : "h",
            price : 3,
            opPrice : 8,
            rend : opPrice / price,
        },
        {
            name : "i",
            price : 7,
            opPrice : 9,
            rend : opPrice / price,
        },
        {
            name : "j",
            price : 5,
            opPrice : 10,
            rend : opPrice / price,
        },
    ];

    getAll().then( respuesta => {
        if(mockeoDelOrto != []){  

            arr = mockeoDelOrto;

            const bubbleSort = arr => {
                const l = arr.length;
                for (let i = 0; i < l; i++ ) {
                    for (let j = 0; j < l - 1 - i; j++ ) {
                        if ( arr[ j ].rend > arr[ j + 1 ].rend ) {
                            [ arr[ j ].rend, arr[ j + 1 ].rend ] = [ arr[ j + 1 ].rend, arr[ j ].rend ];
                        }
                    }
                }
            
                return arr;
            };
            

            /*if(winOrLose){ 
                mockeoDelOrto.forEach(element => {                    
                }); 
            } else {
            }
            console.log(bubbleSort)
            setTimeout(()=>{                
                res.send("asd")
            },[3000]);
        }   
    }   );    
});
*/


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


const iniciarRofex = async (user, password) => {

    return rofex_iniciarWS(user, password, async function (pTk) {

        if (pTk != "error") {
            socketRofex = new WebSocket(base_url_ws, null, { headers: { Cookie: pTk } });
            socketRofex.on('open', function open() {
                let pedido = { "type": "smd", "level": 1, "entries": ["BI", "OF", "LA", "OP", "CL"], "products": simbolosProd, "depth": 1 };
                suscribir(pedido);
            });
            socketRofex.on('error', function (e) {
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

function suscribir(datos) {
    if (socketRofex && socketRofex.readyState == 1) {
        socketRofex.send(JSON.stringify(datos));
        // console.log("Conectado con socketRofex", JSON.stringify(datos), socketRofex.readyState);
    }
}