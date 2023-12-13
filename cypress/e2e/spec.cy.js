/// <reference types="Cypress" />

describe("template spec", () => {
  it("checks that edit exsists", () => {
    cy.visit("/");
    cy.contains("Edit").should('exist')
  })
  it("saves amount after modal exit", () => {
    cy.visit("/");
    cy.contains("Edit").click();
    cy.contains("Add Commitment").click();
    cy.get("input").clear().type("20");
    cy.get(".juno-select-toggle").click();
    cy.get(".juno-select-option").first().click();
    cy.contains("Save").click();
    cy.get(".juno-modal-container").contains("Cancel").click();
    cy.get("input").should('have.value', "20");
  });
});
