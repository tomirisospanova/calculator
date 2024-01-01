function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const units = document.getElementById('units').value;

    fetch('/bmicalculator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `height=${height}&weight=${weight}&age=${age}&gender=${gender}&units=${units}`,
    })
    .then(response => response.json())
    .then(data => {

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h4>BMI Result:</h4>
            <p><strong>BMI:</strong> ${data.bmi}</p>
            <p><strong>Category:</strong> ${data.category}</p>
            <p>${data.message}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
