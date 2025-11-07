// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

/// <reference types="Cypress" />

// Warning: There are elements from juno that cant be accessed via data-cy
// Those are tagged via the aria-label or its classes and might break in the future.
describe("template spec", () => {
  const amount = 20;
  beforeEach(() => {
    cy.visit("/");
  });
  it("checks that edit exsists", () => {
    cy.get("[data-cy='edit/cores']").should("exist");
  });
  it("saves amount after modal exit", () => {
    cy.get("[data-cy='edit/cores']").click();
    cy.get("[data-cy='addCommitment']").click();
    cy.get("[data-cy='commitmentInput']").clear().type(amount);
    cy.get("[data-cy='commitmentSelect']").click();
    cy.get("[data-cy='commitmentSelectOption/0']").click();
    cy.get("[data-cy='commitmentSave']").click();
    cy.get("[data-cy='modalCancel']").click();
    cy.get("[data-cy='commitmentInput']").should("have.value", amount);
  });

  it("resets commitment after panel close", () => {
    cy.get("[data-cy='edit/cores']").click();
    cy.get("[data-cy='addCommitment']").click();
    cy.get("[data-cy='commitmentInput']").clear().type(amount);
    cy.get("[data-cy='commitmentSelect']").click();
    cy.get("[data-cy='commitmentSelectOption/0']").click();
    cy.get("[aria-label=close]").click();
    cy.get("[data-cy='edit/cores']").click();
    cy.get("[data-cy='addCommitment']").click();
    cy.get("[data-cy='commitmentInput']").should("have.value", 0);
  });
});
