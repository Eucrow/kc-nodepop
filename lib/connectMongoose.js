/**
 * Created by MarcoAntonio on 30/01/2017.
 */
"use strict";

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nodepop');

const conn = mongoose.connection;


conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    // we're connected!
});

