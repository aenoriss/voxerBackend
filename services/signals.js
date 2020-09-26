import fetch from 'node-fetch';
const token = 'EvdjIIAWqHRA47DGjUkF82FQDJGVZdytxRKQfUf7Xv8=';

//GET MarketId & Symbol
const getAll = async (req, res) => {
    try {
        const response = await fetch('https://api.remarkets.primary.com.ar/rest/instruments/all', {
            method: 'GET',
            headers: {
                'x-auth-token': token
            }
        });
        const data = await response.json();
        return data.instruments;

    } catch (error) {
         console.log(error);
         res.status(500).json({
             message: 'The request failed.'
         });
    }
 }

//GET Details
export const marketData = async (req, res) => {
    try {
        let i = 0;
        const instrumentsJSON = getAll();            
        let returnArray = [];

        for(i = 0; i < 10; i++){
            const response = await fetch(`https://api.remarkets.primary.com.ar/rest/marketdata/get?marketId=ROFX&symbol=${instrumentsJSON[i].symbol}&entries=BI,OF,LA,OP,CL,SE,OI&depth=1`, {
                method: 'GET',
                headers: {
                    'x-auth-token': token
                }
            });
            const data = await response.json();
            instrumentsJSON[instrument]['price'] = data['LA'];
            returnArray.push(instrumentsJSON[instrument]);
        }
        res.send(returnArray);

    } catch (error) {
         console.log(error);
         res.status(500).json({
             message: 'The request failed.'
         });
    }
 }

