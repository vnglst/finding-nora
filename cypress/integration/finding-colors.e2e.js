describe('Clicking right color should finish game', function() {
  it('finds Question, clicks answers, solves game', function() {
    cy.visit('http://localhost:3000/colors')

    cy.get('[data-testid=question]')
  })
})
