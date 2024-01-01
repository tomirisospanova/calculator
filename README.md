# BMI CALCULATOR

Welcome to the BMI (Body Mass Index) calculator web application! This tool allows users to calculate their BMI based on input parameters such as height, weight, age, gender, and measurement units. The application also provides BMI categorization and stores the calculated BMI along with the category in local storage for future reference. Users can conveniently view their BMI history and individual reports.

## Features

- **BMI Calculation:** Users can input their height, weight, age, gender, and units to calculate their BMI.
- **BMI Categorization:** The application categorizes the BMI result into Underweight, Normal Weight, Overweight, or Obese.
- **Storage:** BMI information is stored in local storage for future reference.
- **BMI History:** Users can view their BMI history, including individual BMI reports.
- **Responsive Design:** The application has a responsive design, making it suitable for various devices.

## How to Use

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/bmi-calculator.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd bmi-calculator
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Run the Server:**
    ```bash
    node app.js
    ```

5. **Open a Web Browser:**
    Visit http://localhost:3000 to use the BMI calculator.

## Directory Structure

- **public:** Contains static files (CSS, client-side JavaScript).
- **views:** HTML files for different views (index.html, history.html).
- **server.js:** Main server file.
- **routes/bmicalculator.js:** Express router for BMI calculations.
- **routes/history.js:** Express router for BMI history.
- **routes/index.js:** Main Express router.
- **README.md:** Project documentation.

## Dependencies

- **Express:** Web framework for Node.js.
- **Body-parser:** Middleware for parsing incoming request bodies.
- **Bootstrap:** Front-end framework for styling.
- **jQuery and Popper.js:** JavaScript libraries for Bootstrap.
- **Playfair Display font from Google Fonts.**

