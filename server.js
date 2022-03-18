const fs = require('fs');
const express = require('express');

//will read the index.js files of each indicated directory
const apiRoutes = require('./routes/apiRoutes/index.js');
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



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});