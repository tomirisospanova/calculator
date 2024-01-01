const BMI_HEADS = document.querySelectorAll('.bmi-head');
const BMI_USC = document.getElementById('bmi-usc');
const BMI_SI = document.getElementById('bmi-si');
const CALC_BTN = document.getElementById('calc-btn');
const CLR_BTN = document.getElementById('clr-btn');
let activeForm;

window.addEventListener('DOMContentLoaded', () => {
    BMI_USC.classList.add('show-bmi');
    activeForm = "bmi-usc";

    const savedBMIInfo = JSON.parse(localStorage.getItem('bmiInfo'));
    if (savedBMIInfo) {
        populateForm(savedBMIInfo);
    }
});

CALC_BTN.addEventListener('click', () => {
    let BMIInfo = getUserInput();
    if (BMIInfo) {
        localStorage.setItem('bmiInfo', JSON.stringify(BMIInfo));

        fetch('/calculate-bmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(BMIInfo),
        })
            .then(response => response.json())
            .then(data => printBMIResult(data))
            .catch(error => console.error('Error:', error));
    }
});

CLR_BTN.addEventListener('click', () => {
    let forms = [...document.forms];
    forms.forEach(form => form.reset());
    clearBMIInfo();
});

function clearBMIInfo() {
    document.getElementById('bmi-value').innerHTML = "";
    document.getElementById('bmi-category').innerHTML = "";
    document.getElementById('bmi-gender').innerHTML = "";

    localStorage.removeItem('bmiInfo');
}

BMI_HEADS.forEach(bmiHead => {
    bmiHead.addEventListener('click', () => {
        if (bmiHead.id === "bmi-usc-head" || bmiHead.id === "bmi-si-head") {
            removeActiveClass();
            clearBMIInfo();
            bmiHead.classList.add('active-head');
            activeForm = (bmiHead.id === "bmi-usc-head") ? "bmi-usc" : "bmi-si";
            showBMIForm(activeForm);
        }
    });
});

function removeActiveClass() {
    BMI_HEADS.forEach(bmiHead => {
        bmiHead.classList.remove('active-head');
    });
}

function getUserInput() {
    let status;
    let age, gender, height, weight;

    if (activeForm === "bmi-usc") {
        age = document.getElementById('age1').value;
        gender = document.querySelector('#bmi-usc input[name="gender"]:checked').value;
        let heightFeet = document.getElementById('feet').value;
        let heightInches = document.getElementById('inches').value;
        weight = document.getElementById('pounds').value;

        status = checkInputStatus([age, heightFeet, heightInches, weight]);

        if (status) {
            height = parseFloat(heightFeet) * 12 + parseFloat(heightInches);
        }
    }

    if (activeForm === "bmi-si") {
        age = document.getElementById('age2').value;
        gender = document.querySelector('#bmi-si input[name="gender"]:checked').value;
        height = document.getElementById('cm').value;
        weight = document.getElementById('kg').value;

        status = checkInputStatus([age, height, weight]);
    }

    if (status) {
        return calculateBMI({ gender, age, height, weight });
    }

    document.querySelector('.alert-error').style.display = "block";
    setTimeout(() => {
        document.querySelector('.alert-error').style.display = "none";
    }, 1000);

    return null;
}

function showBMIForm(formId) {
    if (formId === "bmi-usc") {
        BMI_SI.classList.remove('show-bmi');
        BMI_USC.classList.add('show-bmi');
    } else if (formId === "bmi-si") {
        BMI_USC.classList.remove('show-bmi');
        BMI_SI.classList.add('show-bmi');
    }
}

function calculateBMI(values) {
    let BMI;
    if (activeForm === 'bmi-usc') {
        BMI = (703 * (values.weight / Math.pow(values.height, 2))).toFixed(2);
    } else {
        BMI = (values.weight / Math.pow(values.height, 2)).toFixed(2);
    }
    return { gender: values.gender, BMI };
}

function printBMIResult(BMIInfo) {
    document.getElementById('bmi-value').innerHTML = `${BMIInfo.BMI} kg/m<sup>2</sup>`;

    let bmiCategory;
    if (BMIInfo.BMI < 18.5) {
        bmiCategory = "Underweight";
    } else if (BMIInfo.BMI >= 18.5 && BMIInfo.BMI <= 24.9) {
        bmiCategory = "Normal Weight";
    } else if (BMIInfo.BMI >= 25 && BMIInfo.BMI <= 29.9) {
        bmiCategory = "Overweight";
    } else {
        bmiCategory = "Obesity";
    }

    document.getElementById('bmi-category').innerHTML = `${bmiCategory}`;
    document.getElementById('bmi-gender').innerHTML = BMIInfo.gender;
}