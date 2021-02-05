describe("test geolocation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.server();
  });

  context("get user geolocation", () => {
    it("gets user location", () => {
      cy.intercept(
        { method: "POST", url: "/locations" },
        { fixture: "locations.json" }
      ).as("locations");
      cy.get(".icon.is-right").click();
      cy.wait("@locations");
      cy.get("[data-cy=location-card]").should("exist");
    });
  });

  // context("type user location manually", () => {
  //   it("types location into form field", () => {
  //     cy.get("input").type("20007");
  //     cy.get("[data-cy=submit]").click();
  //     cy.wait("@locations");
  //     cy.get("[data-cy=location-card]")
  //       .should("exist")
  //       .eq(0)
  //       .click();
  //     cy.get("[data-cy=entree-categories]").should("exist");
  //   });
  // });
});
