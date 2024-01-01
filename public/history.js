document.addEventListener('DOMContentLoaded', function () {

    function fetchBMIHistory() {
       
        fetch('/bmihistory')
            .then(response => response.json())
            .then(historyData => displayBMIHistory(historyData))
            .catch(error => console.error('Error fetching BMI history:', error));
    }

   
    function displayBMIHistory(historyData) {
        const historyContent = document.getElementById('historyContent');

        if (historyData.length > 0) {
            historyContent.innerHTML = '<ul>';
            historyData.forEach(entry => {
                historyContent.innerHTML += `<li><strong>${entry.timestamp}</strong>: BMI ${entry.bmi}, ${entry.category}</li>`;
            });
            historyContent.innerHTML += '</ul>';
        } else {
            historyContent.innerHTML = '<p>No BMI history available.</p>';
        }
    }


    fetchBMIHistory();
});
