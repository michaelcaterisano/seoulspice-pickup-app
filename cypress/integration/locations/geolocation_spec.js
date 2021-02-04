describe("test geolocation", () => {
  it("visits pickup.seoulspice.com", () => {
    cy.visit("http://localhost:8080");

    cy.server();
    cy.route("POST", "/locations").as("locations");

    cy.get(".icon.is-right").click();
    cy.wait("@locations");

    cy.get(".location-card").should("exist");
  });
});
