/// <reference types="Cypress" />

describe("tasks managment", () => {
  it("Should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get("dialog.modal").should("not.exist");

    cy.contains("Add Task").click();
    cy.contains("Cancel").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get("dialog.modal").should("not.exist");
  });

  it("Should create a new task", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();

    cy.get("#title").type("Hello");
    cy.get("#summary").type("Pabtab descr");
    cy.get("#category");
    cy.get('[type="submit"]').contains("Add Task").click();

    cy.get(".backdrop").should("not.exist");
    cy.get("dialog.modal").should("not.exist");

    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("Hello");
    cy.get(".task p").contains("Pabtab descr");
  });

  it("Should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();

    cy.get('[type="submit"]').contains("Add Task").click();
    cy.get(".error-message").contains("Please provide values");
  });

  it(" Should filter tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();

    cy.get("#title").type("Hello");
    cy.get("#summary").type("Pabtab descr");
    cy.get("#category").select("urgent");
    cy.get('[type="submit"]').contains("Add Task").click();

    cy.get(".task").should("have.length", 1);

    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0);

    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);

    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 1);
  });

  it("SHould add multiple tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();

    cy.get("#title").type("Hello");
    cy.get("#summary").type("Pabtab descr");
    cy.get("#category");
    cy.get('[type="submit"]').contains("Add Task").click();
    cy.get(".task").should("have.length", 1);

    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get("#title").type("Hello 2");
    cy.get("#summary").type("Pabtab descr 2");
    cy.get("#category");
    cy.get('[type="submit"]').contains("Add Task").click();
    cy.get(".task").should("have.length", 2);

    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get("#title").type("Hello 3");
    cy.get("#summary").type("Pabtab descr 3");
    cy.get("#category");
    cy.get('[type="submit"]').contains("Add Task").click();
    cy.get(".task").should("have.length", 3);

    cy.get(".task").first().contains("Hello");
    cy.get(".task").eq(1).contains("Hello 2");
    cy.get(".task").last().contains("Hello 3");
  });
});
