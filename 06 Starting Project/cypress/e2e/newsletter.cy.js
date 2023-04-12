describe("Newsletter", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("SHould display succes message", () => {
    // Intercepts htt request localhost 3000/newsletter
    cy.intercept("POST", "/newsletter*", { status: 201 }).as("subscribe");
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').type("test@test.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    // cy.wait("@subscribe"); // Not necesary
    cy.contains("Thanks for signing up");
  });

  it("Should display validations errors", () => {
    // Intercepts htt request localhost 3000/newsletter
    cy.intercept("POST", "/newsletter*", { message: "Email exists already" }).as("subscribe");
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').type("test@test.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    // cy.wait("@subscribe"); // Not necesary
    cy.contains("Email exists already");
  });

  it("Should successfully create a new contact", () => {
    cy.request({
      method: "POST",
      url: "/newsletter",
      body: { email: "test@test.com" },
      form: true,
    }).then((res) => {
      expect(res.status).to.equal(201);
    });
  });
});
