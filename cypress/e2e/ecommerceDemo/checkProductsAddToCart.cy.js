/// <reference types="cypress" />

beforeEach('Visit URL' , () => {
        cy.visit("https://demo.nopcommerce.com/clothing");
    })

describe('Print product names AND Add discounted Product to Cart', () => {
    it('Print product names on loading page', () => {
        cy.get('div.item-grid div.item-box')
            .each(($el, index, $list) => {
                cy.wrap($el)
                    .find('div > div.details > h2 > a')
                    .should('be.visible');

                cy.wrap($el)
                    .find('div > div.details > h2 > a')
                    .invoke('text')
                    .then((text1) => {
                        cy.log(text1);
                })
        })
    })
    
    it('Add discounted Product to Cart', function() {
        
        cy.get('div.item-grid div.item-box div.product-item div.details')
            .each(($el) => {
                cy.wrap($el)
                    .find('div.add-info > div.prices > span')
                    .then(($span) => {
                        if($span.hasClass('price old-price')) {                            
                            cy.wrap($el)
                                .find('div.buttons > button:nth-child(1)')
                                .click({force:true});
                            cy.wait(2000);
                            cy.log("Add to Cart - Clicked");

                            cy.wrap($el)
                                .find(' h2 > a')
                                .invoke('text')
                                .then((text1) => {
                                    cy.log(text1);
                                    let nameOfItem = text1;
                                   
                                    cy.wrap(nameOfItem)
                                        .as('nameOfItem');
                            })
                            cy.get('@nameOfItem')
                                .then((itemName) => {
                                    cy.log("name Of Item IS 22::" + itemName);
                            })
                        }
            })
            
        })
        cy.get('@nameOfItem').then((itemName) => {
            cy.log("name Of Item IS 33::" + itemName);
            cy.get('.cart-label')
                .click();
            cy.get('.product-name')
                .invoke('text')
                .then((ProductName) => {
                    expect(ProductName)
                        .to.be.eq(itemName, "Procut Name Matches");
            })
        })
    })
})