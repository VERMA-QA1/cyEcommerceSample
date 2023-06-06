# cyEcommerceSample
Ecommerce Sample tests with a mix of simple, medium and complex or tricky scenarios designed using cypress customized framework. 

# E-Commerce Sample Tests

## Brief About the Tests

** This projec includes some of the test cases which could be used on an e-commerce website. I have taken a sample website and its clothing section to execute my cy scripts. **

https://demo.nopcommerce.com/clothing

Tests are the mixture of simple, medium and complex scenarios, which are tricky to implement using cypress compatibilities.


There are 3 Test files, each having 2 tests. This can be run with Cypress Test Runner using 'npx cypress open' command Or run through command line using 'npx cypress run' command.

Moreover, as required, it can be run in parallel on 2 browsers with the commands (saved in Package.json):

    "cy:runSpec" : "npx cypress run --spec 'cypress\\e2e\\ecommerceDemo\\*' --headed",
    "cy:runBrowsers": "npm run cy:runSpec -- --browser chrome | npm run cy:runSpec -- --browser edge"

Additionally i had also used cypress-parallel package. but the above approach is easier.

However running in parallel on my local causes problems related to "not enough resources" on my system. So the execution gets halted during the test getting executed.

These are plain test cases having cypress' default framework, without POM or BDD Cucumber implementation to these.

Moachawesome HTML reports has been implemented and created for the tests. HTML Report files are there in reports or reports-CrossBrowser folder, along with Videos.

## How to setup
1. Download the project
2. run this command: npm install
3. Try running "npx cypress run"
4. if any issues running above command. Install cypress with : "npm install cypress --save-dev"

# Some Setup Tips
1. Install Node.js
2. Confirm with commands -> node -version and npm -version
3. Open a folder in VS Code
4. Start with this command -> npm init
5. Install cypress with this command:
    "npm install cypress --save-dev"
6. Install Cypress MOchawesome reporter:
    "npm install cypress-mochawesome-reporter --save-dev"
7. Install Cypress cucumber preprocessor:
    "npm install @badeball/cypress-cucumber-preprocessor --save-dev"
8. Install Cypress esBuild:
    "npm install @bahmutov/cypress-esbuild-preprocessor esbuild --save-dev"
9. Install Cypress PArallel for parallel execution:
    "npm install cypress-parallel --save-dev"
10. Add below settings to Package.json:
    <sub>"cypress-cucumber-preprocessor": {
        "stepDefinitions": "cypress/e2e/stepDefinitions/*.{js,ts}",
        "nonGlobalStepDefinitions": true,
        "json": {
        "enabled": false,
        "output": "reports/jsonReport/test1.json"
        }
  }</sub>

11. Add below code for Cucumber setup:
At Top
<sub>const { defineConfig } = require("cypress");
const createBundler  = require("@bahmutov/cypress-esbuild-preprocessor");
const  addCucumberPreprocessorPlugin   = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin  = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
</sub>
within e2e:
<sub>
 e2e: {
    specPattern: "cypress/e2e/featureFiles/*.feature",
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    }
    
  },
</sub>

12. Add folders for features and stepdefinitions under e2e folder