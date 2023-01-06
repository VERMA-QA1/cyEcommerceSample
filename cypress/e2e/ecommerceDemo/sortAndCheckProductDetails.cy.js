/// <reference types="cypress" />

beforeEach('Visit URL' , () => {
    cy.visit("https://demo.nopcommerce.com/clothing");
})

describe('Sort the products by Price and Check Details of a Product', function() {

    it('Sorting of the products by Lowest Price First and verify', function() {
        // cy.get('select#products-orderby').click();
        cy.scrollTo('center');
        cy.get('select#products-orderby')
            .trigger('click')
            .select("Price: Low to High");
        cy.wait(1000);

        var price0 = 0;
        cy.get('span.price.actual-price')
            .each(($el) => {
                cy.get($el)
                    .invoke('text')
                    .then((text1) => {
                
                var price1 = text1.replace(/[^0-9]/g, "");            
                price1 = Number.parseInt(price1);
                
                cy.wrap(price1)
                    .should('be.gte',price0);

                price0 = price1;
            })
        })
        cy.log("List is in Low to High Price Order")
    })

    
    it('Open a products and verify its details', function() {
        cy.get('div.product-item div.details > h2 > a')
            .contains("Oversized Women T-Shirt")
            .click();

        cy.get('.product-name > h1')
            .should('contain.text', "Oversized Women T-Shirt");

        cy.get('p')
            .should('contain', 'This oversized women t-Shirt needs minimum ironing.');

        cy.get('#add-to-wishlist-button-28')
            .click();

        cy.get('.bar-notification.success > p')
            .should('contain.text', "The product has been added to your ")
            .find('a')
            .should('contain.text', 'wishlist')
            .click();

        cy.get('h1')
            .should('have.text', 'Wishlist');

        cy.get('.product-name')
            .should('have.text', "Oversized Women T-Shirt")
            .click();
    })

})