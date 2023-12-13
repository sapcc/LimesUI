/// <reference types="Cypress" />

describe("template spec", () => {
  it("checks that edit exsists", () => {
    cy.visit("/");
    cy.get("[data-cy='edit/instances']").should("exist");
  });
  it("saves amount after modal exit", () => {
    const amount = 20;
    cy.visit("/");
    cy.get("[data-cy='edit/instances']").click();
    cy.get("[data-cy='addCommitment']").click();
    cy.get("[data-cy='commitmentInput']").clear().type(amount);
    cy.get("[data-cy='commitmentSelect']").click();
    cy.get("[data-cy='commitmentSelectOption/0']").first().click();
    cy.get("[data-cy='commitmentSave']").click();
    cy.get("[data-cy='modalCancel']").click();
    cy.get("[data-cy='commitmentInput']").should("have.value", amount);
  });
});
