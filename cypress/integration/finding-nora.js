describe("Basic Happy flow", function() {
  it("Should be possible to finish game with N O R A", function() {
    cy.visit("http://localhost:3000/");

    cy.get(".grid")
      .contains("N")
      .click();

    cy.get(".grid")
      .contains("O")
      .click();

    cy.get(".grid")
      .contains("R")
      .click();

    cy.get(".grid > :nth-child(20)").click(); // A

    cy.get(".overlay-content")
      .contains("Play again?")
      .click();
  });

  it.only("Should be possible change name, click all letters and finish the game", function() {
    cy.visit("http://localhost:3000/");

    cy.get('[aria-label="Settings"]').click();

    cy.get(".my-input")
      .click()
      .clear()
      .type("MAMAPAPA");

    cy.get(".overlay-content")
      .contains("Save")
      .click();

    cy.get(".grid-item").each(function($el, index, $list) {
      cy.wrap($el).click();
    });

    cy.get("[data-testid=grid-item-3-0]").click();
    cy.get("[data-testid=grid-item-3-1]").click();
    cy.get("[data-testid=grid-item-2-1]").click();
    cy.get("[data-testid=grid-item-1-1]").click();
    cy.get("[data-testid=grid-item-1-2]").click();
    cy.get("[data-testid=grid-item-1-3]").click();
    cy.get("[data-testid=grid-item-1-4]").click();

    cy.get(".overlay-content")
      .contains("Play again?")
      .click();
  });
});
