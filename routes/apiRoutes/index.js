const fs = require("fs");
const router = require("express").Router();
const path = require("path");
const { v4:uuid } = require('uuid');
// let notes = require("../../db/db.json");

// function createNewNote(body, noteArray) {
//   const note = body;
//   noteArray.push(note);
//   //write fxn to db.json
//   fs.writeFileSync(
//     path.join(__dirname, "./db/db.json"),
//     //convert the JS data array as JSON
//     JSON.stringify({ note: noteArray }, null, 2)
//   );
//   //return finished code to post route for response
//   return note;
// }

//1 job: respond with an HTML pg to display in the browser
router.get("/notes", (req, res) => {
  //tells where to find the file we want our server to read and send back to clt
  //api routes will only interact with data //html routes will link to diff html files
  //convert the JS data array as JSON
  const note = fs.readFileSync(
    path.join(__dirname, "../../db/db.json"),
    "utf-8"
  );
  //return JSON structure, rather than text
  res.json(JSON.parse(note));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.post("/notes", (req, res) => {
  //**save to req.body with unique id, add it to db.json, and return new note to clt.
  //use npm package uuid to create unique id for each new post
  //since we don't get id upon posting
  //*how to properly use UUID or shortUUID? */ uuid.v4()?
  const pushNote = req.body;
  pushNote.id = uuid();
  const note = JSON.parse(fs.readFileSync(
      path.join(__dirname, "../../db/db.json"),
      "utf-8"
    ));
  note.push(pushNote);
  fs.writeFile("./db/db.json", JSON.stringify(note), (err, data) => {
    if (err) throw err;
  });
  res.json(note);
});
//console.log( `Test for v4 (random) uuid: ${uuid.v4()}`);

router.delete("/notes/:id", (req, res) => {
  const deleteNote = req.params.id;
  //want all notes where id # is not equal to the id param
  const noteArray = JSON.parse(fs.readFileSync(
    path.join(__dirname, "../../db/db.json"),
    "utf-8"
  ));
  const filteredNotes = noteArray.filter(note=> note.id != deleteNote)
      fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err, data) => {
        if (err) throw err;
      });
      res.status(200).json('Note Deleted');
      return;
});

module.exports = router;
