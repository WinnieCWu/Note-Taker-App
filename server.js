const fs = require('fs');
const path = require('path');
const express = require('express');

//will read the index.js files of each indicated directory
const apiRoutes = require('./routes/apiRoutes/notes.js');
const htmlRoutes = require('./routes/htmlRoutes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

//static middleware must be used to load corresponding files properly
app.use(express.static('public'));
//parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());

//tells the server that when clt navigates to <ourhost>/api, app will use the router from apiRoutes
app.use('/api', apiRoutes);
//with / as endpt, router will serve back the html routes
app.use('/', htmlRoutes);


//1 job: respond with an HTML pg to display in the browser
app.get('/api/notes', (req, res) => {
    //tells where to find the file we want our server to read and send back to clt
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    //**save to req.body with unique id, add it to db.json, and return new note to clt.
    req.body.id = notes.length.toString();
    //add notes to db.json file and notes array in this fxn
    if(!validateNote(req.body)) {
        res.status(400).set('The note is not properly formatted.')
    } else {
        const note = createNewNotes(req.body, notes)
        res.json(note);
    }
});

//
app.delete('/api/notes:id', (req, res) => {
    //or '/api/notes/{id}'
    // const idNote = notes.
    //**read all notes from db.json file, remove note with given id prop, and rewrite notes to db.json file
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});