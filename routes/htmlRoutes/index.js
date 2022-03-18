const path = require("path");
const router = require("express").Router();

// //1 job: respond with an HTML pg to display in the browser
// router.get("/", (req, res) => {
//   //tells where to find the file we want our server to read and send back to clt
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
