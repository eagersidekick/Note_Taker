//Getting express ready to use
const express = require('express');
const app = express();

//other dependencies
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json')

//setting up the PORT
const PORT = process.env.PORT || 3001;




app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);