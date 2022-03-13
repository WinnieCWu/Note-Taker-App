const fs = require('fs');
const router = require('express').Router();

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    //write fxn to db.json
    fs.writeFileSync (
        path.join(__dirname, './db/db.json'),
        //convert the JS data array as JSON
        JSON.stringify({notes: notesArray}, null, 2)
    );
    //return finished code to post route for response
    return note;
}


module.exports = router;