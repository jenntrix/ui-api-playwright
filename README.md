# UI & API Playwright Automation

Automated test suite created with Playwright and JavaScript for:

- **UI testing:** OrangeHRM Demo
- **API testing:** Disney API

The project covers the required UI and API scenarios and runs the complete test suite through GitHub Actions.

## Prerequisites

- Node.js 22
- npm
- Chromium

## Setup

1. Clone the repository and go to the project folder.

2. Install the project dependencies:

```bash
npm ci
```

3. Install the Playwright Chromium browser:

```bash
npx playwright install chromium
```

4. Create a `.env` file in the project root:

```env
BASE_URL=
BASE_USERNAME=
BASE_PASSWORD=
API_BASE_URL=
```

The `.env` file is excluded from Git through `.gitignore`.

For GitHub Actions, the same values are configured as GitHub repository secrets.

## Run Tests

Run the complete UI and API test suite:

```bash
npm test
```

Run only the OrangeHRM UI tests:

```bash
npm run test:ui
```

Run only the Disney API tests:

```bash
npm run test:api
```

Run tests in debug mode:

```bash
npm run test:debug
```

## Reports

The project uses the Playwright HTML Reporter and Allure.

Open the Playwright HTML report:

```bash
npm run report:playwright
```

Generate and open the Allure report using existing test results:

```bash
npm run report:allure
```

In CI, the Playwright HTML report is uploaded as a GitHub Actions artifact after the test run.

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   ├── actions/
│   │   ├── a_login.js
│   │   └── a_pim.js
│   ├── apiClients/
│   │   └── apiClients.js
│   ├── apiServices/
│   │   └── apiServices.js
│   ├── pages/
│   │   ├── p_login.js
│   │   └── p_pim.js
│   └── specs/
│       ├── api-disney/
│       │   └── apitest.spec.js
│       └── ui-orangehrm/
│           └── tests.spec.js
├── playwright.config.js
├── TEST-PLAN.md
├── package.json
└── README.md
```

### Test Organization

**UI tests**

The OrangeHRM tests use a Page Object Model-based structure:

- `pages/` contains page locators.
- `actions/` contains reusable UI actions and workflows.
- `specs/ui-orangehrm/` contains the UI test scenarios.

**API tests**

The Disney API tests separate request handling from endpoint-specific behavior:

- `apiClients/` contains the reusable base API request client.
- `apiServices/` contains Disney API service methods.
- `specs/api-disney/` contains the API test scenarios and assertions.

This separation keeps the test code easier to read, reuse, and maintain.

## Tools and Dependencies

| Tool / Dependency | Version |
|---|---:|
| Node.js | 22 |
| Playwright Test | 1.61.1 |
| JavaScript | ES Modules |
| Faker | 10.5.0 |
| dotenv | 17.4.2 |
| Allure Playwright | 3.10.2 |
| Allure Commandline | 2.43.0 |
| ESLint | 10.8.1 |
| GitHub Actions | CI pipeline |

## CI Pipeline

GitHub Actions is configured in:

```text
.github/workflows/playwright.yml
```

The pipeline runs on:

- Pushes to `main`
- Pull requests targeting `main`

The workflow:

1. Checks out the repository.
2. Sets up Node.js 22.
3. Installs dependencies with `npm ci`.
4. Installs Chromium and its required system dependencies.
5. Runs the complete UI and API test suite.
6. Uploads the Playwright HTML report as a pipeline artifact.

If any Playwright test fails, the test command returns a failure status and the GitHub Actions job fails.

## Test Plan

The test scope, UI test case selection rationale, test independence, assumptions, and trade-offs are documented in:

```text
TEST-PLAN.md
```
