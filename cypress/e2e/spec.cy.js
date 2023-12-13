/// <reference types="Cypress" />

// Warning: All gets with a dot search for a classname in juno
// Those are inaccessible in our application
// They might brick at some point in the future.
describe("template spec", () => {
  const amount = 20;
  beforeEach(() => {
    cy.visit("/");
  })
  it("checks that edit exsists", () => {
    cy.get("[data-cy='edit/instances']").should("exist");
  });
  it("saves amount after modal exit", () => {
    cy.get("[data-cy='edit/instances']").click();
    cy.get("[data-cy='addCommitment']").click();
    cy.get("[data-cy='commitmentInput']").clear().type(amount);
    cy.get("[data-cy='commitmentSelect']").click();
    cy.get("[data-cy='commitmentSelectOption/0']").first().click();
    cy.get("[data-cy='commitmentSave']").click();
    cy.get("[data-cy='modalCancel']").click();
    cy.get("[data-cy='commitmentInput']").should("have.value", amount);
  });

  it("resets commitment after panel close", () => {
    cy.get("[data-cy='edit/instances']").click();
    cy.get("[data-cy='addCommitment']").click();
    cy.get("[data-cy='commitmentInput']").clear().type(amount);
    cy.get("[data-cy='commitmentSelect']").click();
    cy.get("[data-cy='commitmentSelectOption/0']").first().click();
    cy.get(".juno-panel-close").click()
    cy.get("[data-cy='edit/instances']").click();
    cy.get("[data-cy='addCommitment']").click();
    cy.get("[data-cy='commitmentInput']").should("have.value", 0);
  })
});
