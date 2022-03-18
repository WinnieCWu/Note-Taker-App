const fs = require("fs");
const router = require("express").Router();
const path = require("path");

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  //write fxn to db.json
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    //convert the JS data array as JSON
    JSON.stringify({ note: notesArray }, null, 2)
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

router.get("*", (req, res) => {
  
});

router.post("/notes", (req, res) => {
  //**save to req.body with unique id, add it to db.json, and return new note to clt.
  req.body.id = note.length.toString();
  //add notes to db.json file and notes array in this fxn
  if (!validateNote(req.body)) {
    res.status(400).set("The note is not properly formatted.");
  } else {
    const note = createNewNotes(req.body, note);
    res.json(note);
  }
});

//
router.delete("/notes:id", (req, res) => {
  //or '/api/notes/{id}'
  // const idNote = notes.
  //**read all notes from db.json file, remove note with given id prop, and rewrite notes to db.json file
});

module.exports = router;
