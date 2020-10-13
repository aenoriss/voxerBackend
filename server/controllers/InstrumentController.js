import fetch from 'node-fetch'

const token = '1ff62accbf7df9289c6f059f0e86d3479bf9138286a87a4d1b97c9ce6bd222a1'; //Token fijo
const totalCoins = 30;

// Devuelve TOP 30 coins.
export const getCoins = async (req, res) => {
    const r = await fetchCoins(req, res);
    res.send(r);
}

export const fetchCoins = async () => {
    try
    {        
        let apiURL = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD";
        let returnArray = [];

        const response = await fetch(apiURL, {
            method: 'GET',            
        });

        const coins = await response.json();


        coins['Data'].forEach(element => {
            returnArray.push(element['RAW']);
        });

        return returnArray;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el getCoin'
        });
    }
}

// A todas las coins en memoria, les agrega Full Data.
export const getPrices = async (req, res) => {
    try
    {
        let coins = await fetchCoins();        
        let symbols = [];
        let prices = [];
        
        coins.forEach(elements => {
            symbols.push(elements['USD']['FROMSYMBOL']);
        });
        
        let apiURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms='${symbols}'&tsyms=USD`;

            let response = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'authorization' : token
                }
            });
            prices.push(await response.json());   
        
        res.send(prices);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el getPrices'
        });
    }    
}

// Devuelve el TOP y BOTTOM 5
export const getTopAndBottom = async (req, res) => {
    try
    {
        if (globalCoins != []) {                           
            let booleanParam = req.query.booleanParam;
            let TABArray = [];

            globalCoins.sort((a, b) => (a['USD']['CHANGEPCTDAY'] > b['USD']['CHANGEPCTDAY']) ? 1 : ((b['USD']['CHANGEPCTDAY'] > a['USD']['CHANGEPCTDAY']) ? -1 : 0));
            
            console.log(booleanParam);

            if(booleanParam == 'False'){
                for(let i = 0; i < 5; i++){
                    TABArray.push(globalCoins[i]);
                }
            } 
            else 
            {
                if(booleanParam == "True"){
                    for(let j = globalCoins.length - 1; j > (globalCoins.length - 6); j--){
                        TABArray.push(globalCoins[j]);
                    }
                }   
            }
            res.send(TABArray);        
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el getPrices'
        });
    }    
}

