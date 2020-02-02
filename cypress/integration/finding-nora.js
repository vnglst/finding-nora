// TODO: First find a way to mock randomness to enable e2e tests
describe("Basic Happy flows", function() {
  it("Should render a grid with letter N O R A in it", function() {
    cy.visit("http://localhost:3000/");

    cy.get(".grid").contains("N");
    cy.get(".grid").contains("O");
    cy.get(".grid").contains("R");
    cy.get(".grid").contains("A");
  });
});
