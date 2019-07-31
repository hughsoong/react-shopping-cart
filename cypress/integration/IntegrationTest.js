describe('Presence Of Elements on HomePage', function () {
  before('tier up', function () {
    cy.visit('http://localhost:3000')
    cy.title().should('contain', 'React Shopping Cart')
  })
  it('All T-shirt sizes should be  visible', function () {
    cy.get('.filters-available-size')
      .should('have.length', 7)
      .should('not.be.checked')
  })

  it('All products with all sizes should be visible', function () {
    cy.get('.shelf-item')
      .should('have.length', 16)
  })

  it('Pricing filter dropdown should be visible', function () {
    cy.get('.sort select')
      .should('be.visible')
      .contains('Select')
  })

  it('Github star button should be visible', function () {
    cy.get('.star-button-container')
      .should('be.visible')
      .contains('Leave a star on Github if this repository was useful :)')
  })

  it('Each product price should have $ sign as prefix ', function () {
    cy.get('.shelf-item__price').each(($val) => {
      const value = $val.text()
      cy.log(value)
      value.startsWith('$')
    })
  })
})