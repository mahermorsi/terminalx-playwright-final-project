**Intro**
We have talked a lot about Playwright now it’s time to put it all together! 
In this project we will write a test plan, develop automation infrastructure, and implement all kinds of test. 
We will use best practices of test automation and of the tools we learned. 
We will be testing the following site: https://www.terminalx.com 
You can choose your own site to perform test on assuming it answers the following criteria: 
You need to be logged in, 
You can make api calls and see their effect in the website, 
You have enough content to test.

**Test Plan**
The first part of the final project is designing a test plan.
This plan should include the test plan document with the following data:
Introduction, 
Scope, 
Objectives, 
Approach, 
Resources, 
Schedule, 
Deliverables, 
The second document is the list of test cases which should provide sanity coverage for the product you are testing.
You should have at least 5 manual “flow” tests that will later be broken down into automatic tests


**API & UI**
Your tests should include api calls for data preparation.
Actions under tests should be performed in the UI. 
Validations should be done in the UI. 
You can add extra validations via API. 

**AAA**
You should adhere to the Arrange, Act, Assert structure
Test isolation (independence)
All tests should be independent and not affect or be affected by other tests

**Parallelism**
Your tests should run in parallel. 

**Assertions**
Use the most accurate assertions. 

**Reporting**
Test results should be presented using allure report. 
infrastructure. 
Code should be structured in layers (infra, logic, tests). 
Playwright’s browser and page should not be revealed to the tests layer. 
Use POM. 

GIT**
**Use pull requests and have code reviews. 
Use informative commit messages. 

**Stability**
Make sure your tests pass consistently, no flaky tests! 
Tests may fail if there are actual bugs in the system.
