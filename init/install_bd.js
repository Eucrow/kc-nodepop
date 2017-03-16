/**
 * Created by MarcoAntonio on 30/01/2017.
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const conn = require('../lib/connectMongoose');

require('../models/Anuncio');
require('../models/Usuario');

function loadInitialData(filename, callBack) {

    const file = path.join('init', filename);


    fs.readFile(file, 'utf8', function (err, data) {

        if (err) {
            callBack(err);
            return;
        }

        // JSON.parse es síncrono, por tanto para controlar si falla
        // puedo utsar try/catch
        // nunca usar un try/catch en algo asíncrono
        try {
            const ficheroJson = JSON.parse(data);
            callBack(null, ficheroJson);
        } catch (ex) {
            callBack(ex);
            return;
        }
    });

}

conn.once('open', function () {

    // This doesn't work in the right way:
    // conn.collection('anuncios').drop()
    // conn.collection('usuarios').drop()

    // removing old data in Usuarios
    const Usuario = mongoose.model('Usuario');

    Usuario.remove({}, function(err) {
        if (err) {
            return (err)
        }
        console.log('Usuarios collection removed')
    });

    // removing old data in Anuncios
    const Anuncio = mongoose.model('Anuncio');

    Anuncio.remove({}, function(err) {
        if (err) {
            return (err);
        }
        console.log('Anuncios collection removed')
    });


    loadInitialData('Anuncios.json', function (err, docs) {

        if (err) {
            return (err);
        }

        conn.collection('anuncios').insert(docs.anuncios);
        conn.collection('usuarios').insert(docs.usuarios);

        conn.close();

    });

});




