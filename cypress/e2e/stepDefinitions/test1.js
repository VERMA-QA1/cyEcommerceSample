import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Visit a URL to open the eCommerce Website', function() {
    cy.visit("www.google.com");
})

When('I can see items on home page', function() {
    cy.get("[name='q']").type("Hello World");
})