//GUI testing using cypress
describe('GUI Testing', () => {
  beforeEach('tier up', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('contain', 'React Shopping Cart')
  })
  it('Add and remove products from the floating cart', () => {
    cy.get('div.shelf-item')
      .should('have.attr', 'data-sku', '12064273040195392')
    cy.xpath('//div[@data-sku="12064273040195392"]/div[.="Add to cart"]')
      .click();
    cy.xpath('//div[@data-sku="18644119330491310"]/div[.="Add to cart"]')
      .click();
    cy.reload();
    cy.xpath('//span[@class="bag bag--float-cart-closed"]').click();
    cy.get('div.shelf-item__details>p')
      .should('have.contain.text', 'Cat Tee Black T-Shirt')
    cy.xpath('//div[@class="shelf-item__del"]').first().click();
    cy.xpath('//div[@class="shelf-item__del"]').click();
  })
  it('Sort products by highest to lowest and lowest to highest price', () => {
    cy.get('div.sort').get('select').select('Lowest to highest').should('have.value', 'lowestprice');
    cy.get('div.sort').get('select').select('Highest to lowest').should('have.value', 'highestprice');
    cy.xpath('//span[@class="bag bag--float-cart-closed"]').click();
    cy.get('p.shelf-empty').should('have.contain.text', 'Add some products in the cart ');
  })
  it('Filter products by available sizes and verify by counting no of products', () => {
    cy.get('input[type=checkbox][value="XS"]').parent('label').click()
    cy.get('div.shelf-item').find('p.shelf-item__title').should('have.length', 1);
    cy.get('input[type=checkbox][value="XS"]').parent('label').click()
    cy.get('input[type=checkbox][value="S"]').parent('label').click()
    cy.get('div.shelf-item').find('p.shelf-item__title').should('have.length', 2);
    cy.get('input[type=checkbox][value="S"]').parent('label').click()
    cy.get('input[type=checkbox][value="M"]').parent('label').click()
    cy.get('div.shelf-item').find('p.shelf-item__title').should('have.length', 1);
    cy.get('input[type=checkbox][value="M"]').parent('label').click()
    cy.get('input[type=checkbox][value="ML"]').parent('label').click()
    cy.get('div.shelf-item').find('p.shelf-item__title').should('have.length', 0);
    cy.get('input[type=checkbox][value="ML"]').parent('label').click()
    cy.get('input[type=checkbox][value="L"]').parent('label').click()
    cy.get('div.shelf-item').find('p.shelf-item__title').should('have.length', 10);
    cy.get('input[type=checkbox][value="L"]').parent('label').click()
    cy.get('input[type=checkbox][value="XL"]').parent('label').click()
    cy.get('div.shelf-item').find('p.shelf-item__title').should('have.length', 10);
    cy.get('input[type=checkbox][value="XL"]').parent('label').click()
    cy.get('input[type=checkbox][value="XXL"]').parent('label').click()
    cy.get('div.shelf-item').find('p.shelf-item__title').should('have.length', 4);
    cy.get('input[type=checkbox][value="XXL"]').parent('label').click()
  })
  it('Filter products by XS sizes and checkout', () => {
    cy.get('input[type=checkbox][value="XS"]').parent('label').click();
    cy.get('.shelf-item')
      .should('be.visible')
      .should('have.length', 1)
      .get('.shelf-item__buy-btn')
      .click();
    cy.contains('.sub-price__val', '$ 10.90')
    cy.get('.buy-btn')
      .should('be.visible')
      .contains('Checkout')
      .click()
    cy.on('window:alert', (alertMessage) => {
      expect(alertMessage).contains('Checkout - Subtotal: $ 10.90')
    })
    cy.get('.float-cart__close-btn')
      .should('be.visible')
      .click()
  })
})