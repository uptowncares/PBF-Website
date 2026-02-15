const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, '../../frontend/public')));


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/index.html'));
});

app.get('/about', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/about.html'));
});


app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});