/**
 * Created by MarcoAntonio on 04/02/2017.
 */
"use strict";

const express = require('express');
const router = express.Router();

const hash = require('hash.js');

const jwt = require('jsonwebtoken');

const localConfig = require('../../localConfig');

const jwtAuth = require('../../lib/jwtAuth');

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario'); // como mongoose ya tiene definido el modelo, se lo pedimos


//registrarse
router.post('/register', function (req, res, next) {

   Usuario.createUser(req.body, function(err){
        // if (err) {
        //     next(err); // le decimos que devuelva el next de error que está en app.js
        //     return;
        // }

       if (err) {
           res.json({
               success: false,
               message: err
           })
           return;
       }

       return res.json({
           ok: true,
           message: res.__('USER_CREATED')
        });
    });


})

//autenticarse: obtenemos un token
router.post('/authenticate', function (req, res, next){
    const clave = req.body.clave;
    const email = req.body.email;

    Usuario.findOne({email: email}, function (err, user) {

        if (err) {
            next(err);
            return;
        }

        if (!user) {
            return res.json({
                ok: false,
                error: {
                    code: 401,
                    message: res.__('USER_NOT_FOUND')
                }
            });
        } else {
            //codificamos la contraseña con el hash
            const claveCodificada = hash.sha256().update(clave).digest('hex');

            //comprobamos que coincida
            if (claveCodificada == user.clave) {
                // hacemos un token
                const token = jwt.sign({email: user.email}, localConfig.jwt.secret, {
                    expiresIn: localConfig.jwt.expiresIn
                });

                res.json({success: true, token: token});

            } else {
                return res.json({
                    ok: false, error: {
                        code: 401,
                        message: res.__('WRONG_PASSWORD')
                    }
                });
            }
        }
    });
});

module.exports = router;