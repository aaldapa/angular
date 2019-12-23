import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://firestore-grafica-35d58.firebaseio.com'
})

const baseDatos = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// firebase deploy (desde la consola, posicionados en el proyecto) --> para empaquetar y para hacer el despliegue en firebase

// firebase serve (desde la consola, posicionados en el proyecto) --> para empaquetar y para arrancar y testar desde local
// para compilar a typescript debemos de navegar desde la consola a la carpeta functions y ejecutar npm run build. Esto regenera los .js de la carpeta de libs, que son los que se ejecutan
// para que typescript creo los js de forma automatica debemos de navegar desde la consola a la carpeta functions y ejecutar-> tsc --watch
export const helloWorld = functions.https.onRequest((request, response) => {
 response.json({
     mesaje: 'Hola mundo desde funciones de Firebase!' });
});

//La palabra async permite que la funcion onRequest regrese una promesa en toda la funcion 
// y introducir la palabra await.
// De esta forma se consigue que la funcion que lleva la palabra await precedida se ejecute una vez haya acabado la funcion primera.
export const getGOTY = functions.https.onRequest( async(request, response) => {
    
    
    // const nombreParam = request.query.nombre || 'Sin nombre';    

    //  response.status(201);
     
    //  response.json( {
    //      nombreParam
    // });

    const gotyRef = baseDatos.collection('goty');
    const docsSnap = await gotyRef.get();

    // docsSnap.docs[0].data() Asi se obtiene el dato de un registro concreto
    // Si pasamos el array completo por un map, obtendremos un nuevo array cargado los datos
    const juegos = docsSnap.docs.map( (juego) => juego.data() );

    response.json( juegos );

});

/* 
     ------- EXPRESS ----------
Instalciones para servidor de express (servidor de peticiones REST)
--save-dev para que solo se utilicen en desarrollo y no cuando se empaqueta para produccion
npm install express cors
npm install @types/express --save-dev
npm install @types/cors --save-dev
*/

const app =  express();
app.use( cors({ origin: true}));

app.get('/goty', async (req, res) => {
    //'goty' es el nombre que le hemos dado a la coleccion de documentos
    const gotyRef = baseDatos.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos = docsSnap.docs.map( (juego) => juego.data() );

    res.json( juegos );
});



app.post('/goty/:id', async (req, res) => {

    //Atrapamos el id de los parametros
    const id = req.params.id;
    
    // obtenemos el juegoo con el id recibido
    const gameRef= baseDatos.collection('goty').doc( id );
    //gameRef.get() devuelve una promesa, por eso utilizamos un await, para esperar a recibir los datos
    const gameSnap = await gameRef.get();

    //validacion de que existe el id que se recibe
    if ( !gameSnap.exists ){ 
        res.status(404).json ({ 
            ok: false,
            mensaje: ` No existe un juego con el ID: ${id}`
        });
    } else {

        const juegoActual = gameSnap.data() || { votos: 0 } ;
        await gameRef.update({ 
            votos: juegoActual.votos + 1
        });

        res.status(200).json ({ 
            ok: true,
            mensaje: `Gracias por tu voto a : ${juegoActual.name}`
        });
    }
});

//Para decirle a firebase que hay un servidor de express ºescuchando
export const api = functions.https.onRequest( app );