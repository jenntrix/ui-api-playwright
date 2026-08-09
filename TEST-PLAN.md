# Test Plan

## Objective

Validate the main UI workflows of the OrangeHRM Demo application and the required Disney API scenarios using automated tests with Playwright.

The goal is to verify critical user flows, API behavior, error handling, and maintain reliable and independent automated tests.

---

## Scope

### UI Testing - OrangeHRM

The UI test scope covers the Login and PIM modules.

The following scenarios are automated:

1. Valid login
2. Invalid login
3. Add a new employee with valid mandatory data
4. Add employee without mandatory fields
5. Search for an employee by unique employee ID
6. Update an employee's personal information
7. Cancel employee creation and verify that no record is created

The UI coverage includes a mix of happy paths, negative scenarios, and an edge case.

### API Testing - Disney API

The API test scope covers the Disney Characters API.

The automated scenarios include:

- Retrieve characters successfully
- Validate character response structure and data types
- Validate pagination using page and pageSize
- Filter characters by the TV show "Jake and the Never Land Pirates"
- Filter characters by the video game "Kingdom Hearts III"
- Validate an invalid endpoint
- Validate a non-existent character ID
- Validate a malformed request
- Validate response behavior for error scenarios

---

## Out of Scope

The following areas are not included:

- Full regression testing of OrangeHRM
- OrangeHRM modules outside Login and PIM
- Cross-browser testing
- Mobile or responsive testing
- Performance and load testing
- Security testing
- Disney API endpoints or filters not required by the challenge

---

## UI Test Case Selection Rationale

The seven UI test cases were selected based on business importance, risk, and coverage of different types of behavior.

### TC-UI-001 - Valid Login

Validates that a user with valid credentials can access the application and the dashboard is displayed.

Login is a critical workflow because access to the rest of the application depends on it.

### TC-UI-002 - Invalid Login

Validates that invalid credentials are rejected and the correct error message is displayed.

This covers an important negative authentication scenario.

### TC-UI-003 - Add a New Employee

Validates that a new employee can be created using valid mandatory information and verifies that the employee's Personal Details page displays the generated first and last name.

This covers a critical happy path and verifies that employee records can be successfully created.

### TC-UI-004 - Add Employee Without Mandatory Fields

Validates that submitting the Add Employee form without the mandatory first and last name fields displays two required-field validation messages.

This negative scenario verifies that incomplete employee records cannot be submitted.

### TC-UI-005 - Search Employee by ID

Validates that an existing employee can be found using a unique employee ID.

Search is important because users need to locate existing records before viewing or modifying them.

### TC-UI-006 - Update Employee Information

Validates that existing employee information can be modified and saved successfully.

This covers another important employee-management workflow.

### TC-UI-007 - Cancel Employee Creation

Validates that canceling the employee creation process does not create an employee record.

This was selected as an edge case because it verifies that an interrupted workflow does not leave unwanted data in the system.

## API Test Coverage

### TC-API-001 - Retrieve Characters Successfully
Validates that the characters endpoint returns HTTP 200, a successful JSON response, and the expected top-level `info` object and `data` array.

### TC-API-002 - Validate Character Response Structure
Validates that characters are returned and verifies the expected fields and data types of the first character in the response.

### TC-API-003 - Validate Pagination
Validates pagination for page 1 with a page size of 10, including the number of returned records and the pagination metadata for previous and next page navigation.

### TC-API-004 - Filter by TV Show
Validates that filtering by "Jake and the Never Land Pirates" returns characters and that every returned character contains the specified TV show in its `tvShows` array.

### TC-API-005 - Filter by Video Game
Validates that filtering by "Kingdom Hearts III" returns characters and that every returned character contains the specified game in its `videoGames` array.

### TC-API-006 - Invalid Endpoint
Validates that requesting an invalid endpoint returns HTTP 404, is reported as an unsuccessful response, and contains a non-empty response body.

### TC-API-007 - Non-existent Character ID
Validates that filtering characters with a non-existent numeric ID returns HTTP 200 with an empty result set.

### TC-API-008 - Malformed Character ID
Validates that sending a non-numeric value as the character ID filter returns HTTP 400 and an unsuccessful response.

---

## Test Independence

Each automated test is designed to run independently and does not depend on the execution order or result of another test.

A new browser context is provided by Playwright for each UI test.

Tests perform their own login when authentication is required.

Test data is generated or obtained within the test flow instead of relying on data created by a previously executed test.

API tests also create their own requests and do not share response data between test cases.

---

## Test Strategy

UI tests use Playwright with a Page Object Model approach to separate page locators, reusable actions, and test scenarios.

Assertions validate specific expected behavior such as:

- Successful or unsuccessful authentication
- Required field validation
- Successful employee creation
- Search results
- Successful employee updates
- Prevention of record creation after cancellation

API tests validate:

- HTTP status codes
- Successful and unsuccessful responses
- JSON response structure
- Expected field data types
- Pagination behavior
- Filtered results
- Error responses

---

## Assumptions and Trade-offs

### Assumptions

- The OrangeHRM Demo application is available and accessible during test execution.
- The credentials provided by the OrangeHRM Demo application are valid.
- Existing demo data may change because the application is publicly shared.
- The Disney API is available and returns data according to its current public behavior.
- Internet connectivity is available during test execution.

### Trade-offs

- Testing is limited to seven UI cases as required by the challenge, so only high-value Login and PIM scenarios were selected.
- The UI suite focuses on Chromium instead of cross-browser coverage to keep the solution focused and reliable.
- API coverage focuses only on the endpoints and scenarios requested by the challenge instead of testing the complete Disney API.
- The tests prioritize functional validation over performance, security, and full regression coverage.