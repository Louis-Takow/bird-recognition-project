# Bird Recognition Tool - Automated Tests (TypeScript)

This project contains automated tests for the Ornitho visual recognition tool, built using Playwright and TypeScript.

## Prerequisites

1.  **Node.js:** You must have Node.js installed on your system. You can download the "LTS" version from [https://nodejs.org/](https://nodejs.org/).
2.  **Project Files:** You must have the project files, including the test images (`tarin_triste.jpeg`, etc.), in the same directory.

## How to Run the Tests

1.  **Install Dependencies:** Open a terminal in the project's root directory and run the following command. This will download Playwright and all other necessary tools.
    ```bash
    npm install
    ```

2.  **Run Automated Tests:** To execute the entire test suite, run this command from the same terminal:
    ```bash
    npx playwright test
    ```
    The tests will run in the background. You will see the results in the terminal once completed.

3.  **View the Test Report:** After the tests have finished, you can view a detailed HTML report by running:
    ```bash
    npx playwright show-report
    ```
    This report will open in your web browser and will show the results of each test, including steps, execution time, and screenshots for any failed tests.
