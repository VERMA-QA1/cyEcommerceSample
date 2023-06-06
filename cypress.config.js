const { defineConfig } = require("cypress");
const createBundler  = require("@bahmutov/cypress-esbuild-preprocessor");
const  addCucumberPreprocessorPlugin   = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin  = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;



module.exports = defineConfig({
  env: {
    demo: ""
  },
  execTimeout: 10000,
  pageLoadTimeout: 10000,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  retries: {
    runMode: 0,
    openMode: 0
  },
  video: false,
  screenshotOnRunFailure: true,
  
  fixturesFolder: 'cypress/fixtures',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Sample Test Result - Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    specPattern: "cypress/e2e/featureFiles/*.feature",
    // baseUrl: null,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    //   require('cypress-mochawesome-reporter/plugin')(on);

    // },
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
});
