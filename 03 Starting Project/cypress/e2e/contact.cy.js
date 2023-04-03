/// <reference types="Cypress" />

describe("contact form", () => {
  before(() => {
    // Runs only once, before all tests
  });
  beforeEach(() => {
    cy.visit("/about");
  });
  afterEach(() => {
    // After every test
  });
  after(() => {
    // After all tests only once
  });

  it("Should submit the form", () => {
    //  Dont run on the browser
    cy.task("seedDatabase", "database.csv", (reutrnValue) => {});

    cy.getById("contact-input-message").type("message");
    cy.getById("contact-input-name").type("pablo");

    cy.getById("contact-btn-submit").as("submitBtn");
    // const btn = cy.get('[data-cy="contact-btn-submit"]'); /// Not recomended and error

    // cy.get("@submitBtn").contains("Send Message").should("not.have.attr", "disabled");
    cy.getById("contact-btn-submit").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
    });
    cy.screenshot();
    cy.getById("contact-input-email").type("test@test.com{enter}");

    // cy.get("@submitBtn").click();
    // cy.get('form button[type="submit"]').click();
    cy.submitForm();

    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.getById("contact-btn-submit").click();
    cy.getById("contact-btn-submit").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.getById("contact-btn-submit").contains("Send Message");
    cy.getById("contact-input-message").blur();
    cy.getById("contact-input-message")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    // THis wont work on run
    // .then((el) => {
    //   expect(el.attr("class")).to.contains("invalid");
    // });

    cy.getById("contact-input-email").focus().blur();
    cy.getById("contact-input-email")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    // .then((el) => {
    //   expect(el.attr("class")).to.contains("invalid");
    // });

    cy.getById("contact-input-name").focus().blur();
    cy.getById("contact-input-name")
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
