import fetch from 'node-fetch'

const token = '1ff62accbf7df9289c6f059f0e86d3479bf9138286a87a4d1b97c9ce6bd222a1'; //Token fijo
const totalCoins = 30;

// Preguntarle a quiroga que hace
const fetchCoins = async (req, res) => {
    try
    {        
        let apiURL = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD";
        let returnArray = [];

        const response = await fetch(apiURL, {
            method: 'GET',            
        });

        const coins = await response.json();

        coins['Data'].forEach(element => {
            returnArray.push(element);
        });

        return returnArray;    

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el fetchCoins'
        });
    }
}

// Devuelve TOP 30 coins.
export const getCoins = async (req, res) => {
    try
    {
        const coins = await fetchCoins(req, res);
        res.send(coins);

    } catch (error) {
    console.log(error);
    res.status(500).json({
        message: 'Error en el getCoins'
    });
    }
}

// Devuelve el TOP y BOTTOM 5
export const getTopAndBottom = async (req, res) => {
    try
    {            
        const coins = await fetchCoins(req,res)
        
        let booleanParam = req.query.booleanParam;
        let TABArray = [];

        console.log(coins)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")

        coins.sort((a, b) => (a["RAW"]['USD']['CHANGEPCTDAY'] > b["RAW"]['USD']['CHANGEPCTDAY']) ? 1 : ((b["RAW"]['USD']['CHANGEPCTDAY'] > a["RAW"]['USD']['CHANGEPCTDAY']) ? -1 : 0));
        
        console.log(booleanParam);

        if(booleanParam == 'win'){
            for(let j = 0; j < 5; j++){
                TABArray.push(coins[coins.length - j]);
            }
        } 
        else {
            for(let i = 0; i < 5; i++){
                TABArray.push(coins[i]);
            }
        }   
        console.log(TABArray)

        res.send(TABArray);        
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el getTopAndBottom'
        });
    }  
}
