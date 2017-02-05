/**
 * Created by MarcoAntonio on 04/02/2017.
 */
"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio'); // como mongoose ya tiene definido el modelo, se lo pedimos


router.get('/', function(req, res, next){

    // const name = req.query.name;
    // const age = req.query.age;
    // const limit = parseInt(req.query.limit);
    // const skip = parseInt(req.query.skip);
    // const fields = req.query.fields;
    // const sort = req.query.sort;

    const nombre = req.query.nombre;
        // const venta = req.query.venta;
        // const precio = req.query.precio;
        // const foto = req.query.foto;
        // const tags = req.query.tags;


    // creo un filtro vacío
    const filter = {};

    if (nombre) {
        filter.nombre = nombre;
    }

    // Anuncio.list(filter, limit, skip, fields, sort, function(err, docs){
    Anuncio.list(function(err, docs){
        if (err){
            next(err); // le decimos que devuelva el next de error que está en app.js
            return;
        }
        res.json({success: true, data: docs}); // los nombres, los que el autor decida
    });
});

module.exports = router;
