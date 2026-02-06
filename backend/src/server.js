const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, '../../frontend/public')));


app.get('/', (req, res) => {
    console.log(__dirname);
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/index.html'));
    
});


app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});