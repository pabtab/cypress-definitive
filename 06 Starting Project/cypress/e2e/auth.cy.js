describe("AUth", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should signup", () => {
    cy.visit("/signup");
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type("test@test.com");
    cy.get('[data-cy="auth-password"]').type("1234567890");
    cy.get('[data-cy="auth-submit"]').click();
    cy.location("pathname").should("eq", "/takeaways");
    cy.getCookie("__session").its("value").should("not.be.empty");
  });

  it("should login", () => {
    cy.login();
  });

  it("should logout", () => {
    cy.login();

    cy.contains("Logout").click();

    cy.location("pathname").should("eq", "/");
    cy.getCookie("__session").its("value").should("be.empty");
  });
});
