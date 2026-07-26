This file lists every command used to set up the test automation project (Playwright + Cucumber + Allure) inside  playwright folder.

1. Initialize the project
npm init -y

2. Install Cucumber, Playwright, and TypeScript

npm install --save-dev @playwright/test
npm install --save-dev @cucumber/cucumber ts-node typescript
npm install --save-dev @types/node

3. Download the browser binaries Playwright needs (Chromium, Firefox, WebKit)
npx playwright install

4. Install environment variable support

npm install -D dotenv


5. Install Allure reporting

npm install --save-dev allure-cucumberjs allure-commandline


6. Running the tests and generating the report
- npm test : run all scenarios
- npm run test:dry : check that every Gherkin step has a matching stepdef
- npm run report:generate : turn the test results (.json) into an HTML report
- npm run report:open : open that report in your browser
