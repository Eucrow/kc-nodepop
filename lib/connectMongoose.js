/**
 * Created by MarcoAntonio on 30/01/2017.
 */
"use strict";

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;  // this is for avoid the warning DeprecationWarning: Mongoose:
                                    // mpromise (mongoose's default promise library) is deprecated,
                                    // plug in your own promise library instead:
                                    // but I don't understand why ¿?¿?¿?
mongoose.connect('mongodb://localhost:27017/nodepop');

const conn = mongoose.connection;


conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    console.info('Conectado a mongodb.');
});

module.exports = conn;
