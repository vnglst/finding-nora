describe('Clicking N should turn button green', function() {
  it('finds N, clicks it and it should turn green', function() {
    cy.visit('http://localhost:3000/')

    cy.get('.grid')
      .contains('N')
      .should('not.have.class', 'correct')

    cy.get('.grid')
      .contains('N')
      .click()
      .should('have.class', 'correct')
  })
})

describe('First clicking O should turn button orange (almost correct)', function() {
  it('finds O, clicks it and it should turn orange', function() {
    cy.visit('http://localhost:3000/')

    cy.get('.grid')
      .contains('O')
      .should('not.have.class', 'correct')

    cy.get('.grid')
      .contains('O')
      .click()
      .should('have.class', 'almost-correct')
  })
})
