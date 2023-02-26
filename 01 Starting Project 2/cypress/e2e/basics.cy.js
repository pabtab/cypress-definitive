/// <reference types="Cypress" />

describe("tasks page", () => {
  it("Should render main image", () => {
    // Check renders correctly
    cy.visit("http://localhost:5173/");
    cy.get(".main-header img"); // or cy.get('.main-header').find('img')
  });

  it("Should display the page title", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header h1").should("have.length", 1);
    cy.get(".main-header h1").contains("React Tasks");
  });
});
