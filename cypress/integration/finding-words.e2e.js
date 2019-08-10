describe("Clicking N should turn button green", function() {
  it("finds N, clicks it and it should turn green", function() {
    cy.visit("http://localhost:3000/");

    cy.get(".grid")
      .contains("N")
      .should("not.have.class", "green");

    cy.get(".grid")
      .contains("N")
      .click()
      .should("have.class", "green");
  });

  it("finds O R A, clicks them", function() {
    cy.get(".grid")
      .contains("O")
      .click()
      .should("have.class", "green");

    cy.get(".grid")
      .contains("R")
      .click()
      .should("have.class", "green");

    cy.get(".grid")
      .contains("A")
      .click()
      .should("have.class", "green");
  });

  it("clicks new game button, starts new game", function() {
    cy.get(".overlay-content > .button").click();

    cy.get(".grid")
      .contains("N")
      .should("not.have.class", "green");

    cy.get(".grid")
      .contains("N")
      .click()
      .should("have.class", "green");
  });
});

describe("First clicking O should turn button orange", function() {
  it("finds O, clicks it and it should turn orange", function() {
    cy.visit("http://localhost:3000/");

    cy.get(".grid")
      .contains("O")
      .should("not.have.class", "green");

    cy.get(".grid")
      .contains("O")
      .click()
      .should("have.class", "orange");
  });
});

describe("First clicking O should turn button orange", function() {
  it("finds O, clicks it and it should turn orange", function() {
    cy.visit("http://localhost:3000/");

    cy.get(".grid")
      .contains("O")
      .should("not.have.class", "green");

    cy.get(".grid")
      .contains("O")
      .click()
      .should("have.class", "orange");
  });
});
