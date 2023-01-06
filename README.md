# cyEcommerceSample
Ecommerce Sample tests with a mix of simple, medium and complex or tricky scenarios designed using cypress customized framework. 

#E-Commerce Sample Tests

##Brief About the Tests

**This projec includes some of the test cases which could be used on an e-commerce website. I have taken a sample website and its clothing section to execute my cy scripts.**

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

##How to setup
1. Download the project
2. run this command: npm install
3. Try running "npx cypress run"
4. if any issues running above command. Install cypress with : "npm install cypress --save-dev"

