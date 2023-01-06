/// <reference types="cypress" />

beforeEach('Visit URL' , () => {
    cy.visit("https://demo.nopcommerce.com/clothing");
})

describe('Logo lands to Home Page and Verify Cart Added items', function() {
    
    it('Click on Logo to Navigate to Application Home Page', function() {
        cy.get('.header-logo > a > img')
            .click();
        cy.url()
            .should('eq', "https://demo.nopcommerce.com/");
        
    })

    it('Add 5 Quantity of an item to Cart and Verify the Total Price', function() {
        var product1 = "Custom T-Shirt";
    
        cy.get('div.product-item div.details > h2 > a')
            .contains(product1)
            .click();

        cy.get('.product-name > h1')
            .should('contain.text', product1);

        cy.get('#price-value-29')
            .invoke('text')
            .then((price) => {
                cy.wrap(price).as('price1');
            });
        cy.log("Price of Product fetched");

        cy.get('#product_attribute_12')
            .type("Amit Automation");

        cy.get('#product_enteredQuantity_29')
            .clear()
            .type('5');
        
        cy.get('#add-to-cart-button-29')
            .click();

        cy.get('.bar-notification.success > p > a')
            .should('have.text', "shopping cart")
            .click();

        cy.get('table.cart tbody > tr')
            .each(($product, index, $list) => {
                cy.get($product)
                    .find('td:nth-child(3) > a')
                    .invoke('text')
                    .then((prodName) => {
                        cy.log(prodName)
                        if(prodName === product1) { 
                            cy.wrap($product)
                            .find('td:nth-child(6)')
                            .invoke('text')
                            .then((totalPrice) => {
                                totalPrice = totalPrice.replace(/[^0-9,.]/g, "");
                                cy.wrap(totalPrice)
                                    // .invoke('valueOf')
                                    .as('totalPrice2');
                            });
                        }
                });
        });
        
        cy.get('@price1')
            .then((price1) => {

            price1 = price1.replace(/[^0-9,.]/g, "");
            price1 = price1 * 5.0;

            cy.get('@totalPrice2')
                .then((price2) => {                
                    expect(Number.parseInt(price1), "Value of 5 items multiplied").is.eq(Number.parseInt(price2), "Cart Total of that item with 5 Qty");
                    cy.log("Value Matches");
            });   
        
        });
        
    })

})