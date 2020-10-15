const db = require('../Database/connection');

// Test de conexión, devuelve true (conectado) o false (desconectado).
export var status = function() {
    try 
    {
        let status = false;
        
        if(await db.authenticate()) { status = true; }

        return status;        
    } 
    catch(error){
        console.log("Error en la autenticación: " + error);
    }
}