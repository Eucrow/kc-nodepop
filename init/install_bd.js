/**
 * Created by MarcoAntonio on 30/01/2017.
 */

const fs = require('fs');
const path = require('path');

const conn = require('../lib/connectMongoose');

function loadInitialData (filename, callBack) {

    const file = path.join("init", filename);
    console.log(file);


    fs.readFile(file, 'utf8', function(err, data){

        if (err){
            callBack(err);
            return;
        }

        // JSON.parse es síncrono, por tanto para controlar si falla
        // puedo utsar try/catch
        // nunca usar un try/catch en algo asíncrono
        try {
            const ficheroJson = JSON.parse(data);
            callBack(null, ficheroJson);
        } catch(ex) {
            callBack(ex);
            return;
        }
    })
}

conn.once('open', function() {

    conn.collection('anuncios').drop();
    conn.collection('usuarios').drop();


    loadInitialData('Anuncios.json', function(err, docs){

        if (err){
            console.log('Hubo un error: ', err);
            return;
        }

        conn.collection('anuncios').insert(docs.anuncios);
        conn.collection('usuarios').insert(docs.usuarios);

        conn.close();

    })

})

/*Antiguo, funciona pero no usa mongoose*/

// const MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect('mongodb://localhost:27017/nodepop', function (err, db){
//
//     if (err) {
//         console.log(err);
//         process.exit();
//         return;
//     }
//
//     db.collection('anuncios').drop();
//     db.collection('usuarios').drop();
//
//
//     loadInitialData('Anuncios.json', function(err, docs){
//
//         if (err){
//             console.log('Hubo un error: ', err);
//             return;
//         }
//
//         db.collection('anuncios').insert(docs.anuncios);
//         db.collection('usuarios').insert(docs.usuarios);
//
//         db.close();
//
//     })
//
// })




