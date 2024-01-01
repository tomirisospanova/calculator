// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bmiRoutes = require('./routes/bmiRoutes');
const somePackage = require('some-package'); // Use an npm package related to your topic

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', bmiRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
