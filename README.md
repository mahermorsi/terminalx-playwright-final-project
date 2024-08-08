# TerminalX Automation Project

This project involves the automation of the TerminalX website using Playwright and TypeScript. The goal is to design a comprehensive test plan, develop automation infrastructure, and implement various tests to ensure the robustness and reliability of the site.

## Project Overview

### Introduction
In this project, we apply best practices of test automation to the TerminalX website. The tests are designed to cover both API and UI functionalities, ensuring that the site performs as expected under various conditions.

### Scope
The scope of this project includes:
- Designing a test plan and test cases.
- Developing an automation framework using Playwright and TypeScript.
- Implementing and executing API and UI tests.
- Generating test reports using Allure.

### Objectives
- Ensure comprehensive test coverage for the TerminalX website.
- Validate critical functionalities through both manual and automated tests.
- Establish a robust and scalable automation framework.

### Approach
- **Test Plan**: The project begins with the creation of a detailed test plan that outlines the scope, objectives, approach, resources, schedule, and deliverables.
- **Test Cases**: Develop a list of test cases that provide sanity coverage for the TerminalX site. These test cases include at least 5 manual flow tests that will be automated.
- **API & UI Testing**: Tests include API calls for data preparation and UI interactions for performing actions and validations. Additional validations can be done via API.
- **AAA Structure**: Tests adhere to the Arrange, Act, Assert (AAA) structure to ensure clarity and consistency.

## Test Plan

### Test Isolation
- All tests are designed to be independent, ensuring that they do not affect or are not affected by other tests.

### Parallelism
- Tests are designed to run in parallel, reducing overall execution time and increasing efficiency.

### Assertions
- The most accurate assertions are used to validate test outcomes, ensuring precise and reliable results.

### Reporting
- Test results are presented using Allure report, providing detailed insights into the execution and outcomes of each test.

## Infrastructure

- **Layered Architecture**: The code is structured in layers (infrastructure, logic, tests) to maintain a clean and organized codebase.
- **Page Object Model (POM)**: The POM pattern is used to separate the test code from the browser and page interactions.
- **Playwright Integration**: Playwright's browser and page instances are abstracted away from the test layer to ensure modularity and maintainability.

## GIT Workflow

- **Pull Requests & Code Reviews**: All code changes are managed through pull requests, ensuring that each change is reviewed before being merged.
- **Informative Commit Messages**: Commit messages are descriptive and informative, making it easy to track changes and understand the purpose of each commit.

## Stability

- **Consistent Test Passes**: Tests are designed to pass consistently, with failures only occurring due to actual bugs in the system. Flaky tests are minimized.

## Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system.
- **Playwright**: Playwright should be installed as a dependency in your project.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/terminalx-automation.git
    cd terminalx-automation
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the tests**:
    ```bash
    npx playwright test
    ```

4. **Generate Allure Report**:
    ```bash
    npx allure generate allure-results --clean && npx allure open
    ```


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries, please contact [Maher Morsi](mailto:mahermorsi@gmail.com).
