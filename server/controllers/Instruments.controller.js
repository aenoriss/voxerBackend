import { getToken, iniciarRofex, motherofalldata } from '../controllers/connection.controller'
import fetch from 'node-fetch'

let dataMarketHistory = [];
let simbolosProd = [];
let dataJSON = [];
let auxArray = [];
let array = [];
let token;

/* BI: Bid 
OF: Offer 
LA: Last, último precio operado 
OP: Open, precio de apertura 
CL: Close, precio de cierre 
SE: Settlement
OI: Open Interest */

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
    try {
        getAll().then(() => {
            if (motherofalldata != []) {
                setTimeout(() => {
                    array = motherofalldata;

                    array.sort((a, b) => (a.instrumentId.symbol > b.instrumentId.symbol)
                        ? 1 : ((b.instrumentId.symbol > a.instrumentId.symbol) ? -1 : 0));

                    array.forEach(item => {
                        if (item.marketData["LA"] != null && item.marketData["OP"] != null) {

                            const objetito = {
                                ticker: "BTC", // Arreglar esta poronga ---> aca se podria comparar con un array ya cargado y poner el que corresponda
                                symbol: item.instrumentId.symbol,
                                timestamp: item.timestamp,
                                instrumentId: item.instrumentId.marketId,
                                lastPrice: item.marketData["LA"].price,
                                rend: item.marketData["LA"].price / item.marketData["OP"],
                                closing: item.marketData["CL"] != null ? item.marketData["CL"].price : null,
                                volumen: item.marketData["EV"] != null ? item.marketData["EV"] : null,
                            }
                            auxArray.push(objetito); //console.log(getMarketHistory(item.symbol), "locoooo")
                        }
                    });

                    res.send(auxArray);
                    
                }, [8000]);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The request failed.'
        });
    }
}

// GetMarketHistory
export const getMarketHistory = async (req, res, symbolVar) => {
    try {
        token = await getToken();
        //console.log(typeof req.query);
        symbolVar = req.query.symbolVar;
        var date = new Date();
        let dateVar = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let dateFromVar = date.getFullYear() - 1 + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        dateVar.toString();
        dateFromVar.toString();

        const response = await fetch(`https://api.remarkets.primary.com.ar/rest/data/getTrades?marketId=ROFX&symbol=${symbolVar}&dateFrom=${dateFromVar}&dateTo=${dateVar}&environment=REMARKETS`, {
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


// GET Winners & Losers | winOrLose = bool
export const getWinnersAndLosers = async (req, res, winOrLose) => {
    try {

        
        // comentaod hasta que funcione la API

        /*
        getInstruments().then(() => {       //ver si funciona el get instruments, sino usar getAll y agregar la creacion del obj
            if (array != []) {
                setTimeout(() => {
                   
                    array.sort((a, b) => (a.rend > b.rend)
                    ? 1 : ((b.rend > a.rend) ? -1 : 0));
            
                    let WORArray = [];
            
                    if(winOrLose){
                        for(let i = 0; i < 5; i++){
                            WORArray.push(array[i]);
                        }
                    } 
                    else 
                    {
                        for(let i = array.length(); i > (array.length() - 5); i--){
                            WORArray.push(array[i]);
                        }
                    }
                    res.send(WORArray);
                }, [8000]);
            }
        });*/



        /// winers and losers esta mockeado hasta que funcione la API

        const mockeoDelOrto = [
            {
                ticker: "BTC",
                symbol: "aaaaa",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 1,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: -50,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "bbbbb",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 2,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "ccccc",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 3,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "ddddd",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 4,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "eeeee",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 5,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "fffff",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 6,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "ggggg",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 7,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "hhhhh",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 8,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "iiiii",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 9,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
            {
                ticker: "BTC",
                symbol: "jjjjj",
                timestamp: 8000000 + Math.random() * (90 - 5) + 5,
                instrumentId: 10,
                lastPrice: Math.random() * (90 - 5) + 5,
                rend: Math.random() * (90 - 5) + 5,
                closing: Math.random() * (90 - 5) + 5,
                volumen: Math.random() * (90 - 5) + 5,
            },
        ];

        mockeoDelOrto.sort((a, b) => (a.rend > b.rend)
        ? 1 : ((b.rend > a.rend) ? -1 : 0));

        let WORArray = [];

        if(winOrLose){
            for(let i = 0; i < 5; i++){
                WORArray.push(mockeoDelOrto[i]);
            }
        } 
        else 
        {
            for(let i = mockeoDelOrto.length(); i > (mockeoDelOrto.length() - 5); i--){
                WORArray.push(mockeoDelOrto[i]);
            }
        }

        res.send(WORArray);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The request failed.'
        });
    }
};

export { dataJSON, simbolosProd };