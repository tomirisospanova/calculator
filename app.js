const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    next();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
