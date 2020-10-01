import { getToken, iniciarRofex, motherofalldata } from '../controllers/connection.controller'
import fetch from 'node-fetch'

let dataMarketHistory = [];
let simbolosProd = [];
let dataJSON = [];
let auxArray = [];
let array = [];
let token;

/*
BI: Bid 
OF: Offer 
LA: Last, último precio operado 
OP: Open, precio de apertura 
CL: Close, precio de cierre 
SE: Settlement
OI: Open Interest 
*/

//GetAll (MarketId & Symbol)
const getAll = async (req, res) => {
    try {
        token = await getToken();
        const response = await fetch('https://api.remarkets.primary.com.ar/rest/instruments/all', {
            method: 'GET',
            headers: {
                'x-auth-token': token
            }
        });
        dataJSON = await response.json();

        dataJSON.instruments.forEach(item => {
            simbolosProd.push({ "symbol": item.instrumentId.symbol, marketId: item.instrumentId.marketId })
        })
        return await iniciarRofex(dataJSON, "getAll");

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The request failed.'
        });
    }
}

//GetAll + Join Instruments
export const getInstruments = async (req, res) => {
    getAll().then(() => {
        if (motherofalldata != []) {
            setTimeout(() => {
                array = motherofalldata;

                // charlar el de symbol porque CREO que va a dar cosas rancias con los symbols que manejamos
                //const sortedArrayGeneral = array.sort((a,b) => (a["symbol"] > b["symbol"]) ? 1 : ((b)=["symbol"] > a["symbol"]) ? -1 : 0));

                //const sortedArrayPopular = array.sort((a,b) => (a["volumen"] > b["volumen"]) ? 1 : ((b)=["volumen"] > a["volumen"]) ? -1 : 0));

                array.forEach(item => {
                    if (item.marketData["LA"] != null && item.marketData["OP"] != null) {
                        
                        const objetito = {
                            ticker: "BTC", // Arreglar esta poronga ---> aca se podria comparar con un array ya cargado y poner el que corresponda
                            symbol: item.instrumentId.symbol,
                            timestamp: item.timestamp,
                            instrumentId: item.instrumentId.marketId,
                            lastPrice : item.marketData["LA"].price,
                            rend : item.marketData["LA"].price / item.marketData["OP"],
                            closing: item.marketData["CL"] != null ? item.marketData["CL"].price : null,
                            volumen : item.marketData["EV"] != null ? item.marketData["EV"] : null, 
                        }

                        auxArray.push(objetito);
                    }
                });
                res.send(auxArray);
            }, [8000]);
        }
    });
}

// GetMarketHistory

let symbol = "PAMPOct20";

export const getMarketHistory = async (req, res, symbolVar) => {
    try 
    {   
        token = await getToken();

        var date = new Date();
        let dateVar = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        let dateFromVar = date.getMonth() - 12;
        dateVar.toString();
        dateFromVar.toString();
        symbolVar = symbol;

        const response = await fetch(`https://api.remarkets.primary.com.ar/rest/data/getTrades?marketId=ROFX&symbol='${symbolVar}'&date=${dateVar}&dateFrom=${dateFromVar}&dateTo=${dateVar}&environment=REMARKETS`, {
            method: 'GET',
            headers: {
                'x-auth-token': token
            }
        });
        
        dataMarketHistory = await response.json();         
        res.send(dataMarketHistory);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The request failed.'
        });
    }
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

export { dataJSON, simbolosProd };