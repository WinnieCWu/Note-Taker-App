const fs = require("fs");
const router = require("express").Router();
const path = require("path");
const uuid = require('uuid');
let notes = require("../../db/db.json");

function createNewNote(body, noteArray) {
  const note = body;
  noteArray.push(note);
  //write fxn to db.json
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    //convert the JS data array as JSON
    JSON.stringify({ note: noteArray }, null, 2)
  );
  //return finished code to post route for response
  return note;
}

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
  notes.push(pushNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
    if (err) throw err;
  });
  res.json(notes);
});
//console.log( `Test for v4 (random) uuid: ${uuid.v4()}`);

router.delete("/notes/:id", (req, res) => {
  const deleteNote = req.params.id;
  notes.pop(deleteNote);
  readFromFile('./db/db.json')
  //**grab the noteId from post route to delete
  .then((data) => JSON.parse(data))
  .then((JSON) => {
      const newNoteArray = JSON.filter(note => note.id !== noteId)
      fs.writeToFile('./db/db.json', newNoteArray)
      res.status(200).json('Note Deleted');
      return;
  // fs.unlink("./db/db.json", JSON.parse(notes).filter(), (err, data) => {
  //   if (err) throw err;
  //   console.log("Successfully deleted note!");
  });
});

module.exports = router;
