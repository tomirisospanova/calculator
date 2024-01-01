const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

router.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'history.html'));
});

router.post('/bmicalculator', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const age = parseInt(req.body.age);
    const gender = req.body.gender;
    const units = req.body.units;

    let bmi;

    if (units === 'metric') {
        bmi = weight / ((height / 100) ** 2);
    } else if (units === 'imperial') {
        const heightInInches = height * 12;
        bmi = (weight / (heightInInches ** 2)) * 703;
    }

    let category;

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    const bmiInfo = {
        bmi: bmi.toFixed(2),
        category,
    };
    res.locals.bmiInfo = bmiInfo;

    res.locals.bmiHistory = res.locals.bmiHistory || [];
    res.locals.bmiHistory.push(bmiInfo);

    res.send({
        bmi: bmi.toFixed(2),
        category,
        message: 'BMI calculation successful',
        bmiInfo,
    });
});

router.get('/bmireport', (req, res) => {
    const storedBMIInfo = res.locals.bmiInfo;

    if (storedBMIInfo) {
        res.send(`
            <h2>BMI Report</h2>
            <p><strong>BMI:</strong> ${storedBMIInfo.bmi}</p>
            <p><strong>Category:</strong> ${storedBMIInfo.category}</p>
        `);
    } else {
        res.send('BMI information not available.');
    }
});

router.get('/bmihistory', (req, res) => {
    const bmiHistory = res.locals.bmiHistory || [];

    if (bmiHistory.length > 0) {
        res.send(bmiHistory);
    } else {
        res.send('BMI history not available.');
    }
});

module.exports = router;
