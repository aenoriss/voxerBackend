import app from './app';

const PORT = 3000;

const main =  () => {
    try {
         app().listen(PORT, () => console.log('Server on port ' + PORT ) );
    }   
    catch (error) {
        console.log(error);
    }
}

main();