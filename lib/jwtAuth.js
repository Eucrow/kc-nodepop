/**
 * Created by MarcoAntonio on 12/03/2017.
 */
"use strict";

const jwt = require('jsonwebtoken');

const localConfig = require('../localConfig');

// middleware de autenticación
module.exports  = function () {
  return function (req, res, next) {
      //recuperamos el token del cuarpo de la req, de la query o de la cabecera
      const token = req.body.token || req.query.token || req.get('x-access-token');

      // comprueba que se haya enviado algún token
      if (!token) {
          return next(new Error('No se ha enviado ningún token'));
      }

      // y si se ha enviado, se verifica
      jwt.verify(token, localConfig.jwt.secret, function (err, decodedToken){

          if (err) {
              return next(new Error('Token inválido'));
          }

         req.decoded = decodedToken;
         next();
      });
  }
};