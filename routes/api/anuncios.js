/**
 * Created by MarcoAntonio on 04/02/2017.
 */
"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio'); // como mongoose ya tiene definido el modelo, se lo pedimos


router.get('/', function(req, res, next){

    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio_min = req.query.precio_min;
    const precio_max = req.query.precio_max;
    const tags = req.query.tags;

console.log(req.query);

    // creo un filtro vacío
    const filter = {};

    if (nombre) {
        //filter.nombre = nombre;
        filter.nombre = new RegExp(nombre);
    }

    if (venta) {
        filter.venta = venta;
    }

    if (precio_min && precio_max) {
        filter.precio = {}
        if (precio_min <= precio_max) {
            filter.precio.$gt = precio_min;
            filter.precio.$lt = precio_max;
        }
    } else if (precio_min) {
        filter.precio = {}
        filter.precio.$gt = precio_min;
    } else if (precio_max) {
        filter.precio = {}
        filter.precio.$lt = precio_max;
    }

    if (tags) {
        filter.tags = tags;
    }

    // Anuncio.list(filter, limit, skip, fields, sort, function(err, docs){
    Anuncio.list(filter, function(err, docs){

        console.log(filter);

        if (err){
            next(err); // le decimos que devuelva el next de error que está en app.js
            return;
        }
        res.json({success: true, data: docs});
    });
});

// ruta para listar tags:
router.get('/tags', function (req, res) {
    res.json({ ok: true, allowedTags: Anuncio.allowedTags() });
});

module.exports = router;
