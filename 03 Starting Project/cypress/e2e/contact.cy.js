/// <reference types="Cypress" />

describe("contact form", () => {
  it("Should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("message");
    cy.get('[data-cy="contact-input-name"]').type("pablo");

    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    // const btn = cy.get('[data-cy="contact-btn-submit"]'); /// Not recomended and error

    // cy.get("@submitBtn").contains("Send Message").should("not.have.attr", "disabled");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
    });

    cy.get('[data-cy="contact-input-email"]').type("test@test.com{enter}");
    // cy.get("@submitBtn").click();

    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-message"]').blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    // THis wont work on run
    // .then((el) => {
    //   expect(el.attr("class")).to.contains("invalid");
    // });

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    // .then((el) => {
    //   expect(el.attr("class")).to.contains("invalid");
    // });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      // .should("have.attr", "class")
      // .and("match", /invalid/);
      // .then((el) => {
      //   expect(el.attr("class")).to.contains("invalid");
      // });
      .should((el) => {
        expect(el.attr("class")).not.be.undefined;
        expect(el.attr("class")).to.contains("invalid");
      });
  });
});
