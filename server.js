//Getting express ready to use
const express = require('express');
const app = express();

//other dependencies
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json')

//setting up the PORT
const PORT = process.env.PORT || 3001;

//gives every note its own id
const uuid = require('./helpers/uuid');

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//API route that returns all notes as JSON objects
app.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + '/db/db.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    });
});

//API route that adds a new note to the JSON object and gives it a unique ID
app.post('/api/notes', (req, res) => {
    const userNote = req.body
    userNote.id = uuid()
    db.push(userNote)
    SaveNotes('./db/db.json', db);
});

//API routes that filters to delete notes
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    fs.readFile(__dirname + '/db/db.json', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        const filteredNotes = notes.filter((note) => note.id !== id);
        SaveNotes('./db/db.json', filteredNotes);
    });
});

//savenotes function for API routes
function SaveNotes(destination, content) {
    fs.writeFileSync(destination, JSON.stringify(content), (err) =>
        err
            ? console.error(err)
            : console.info(`\nData written to ${destination}`));
}


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);