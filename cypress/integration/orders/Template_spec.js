describe("", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.server();
  });

  context("order", () => {
    it("", () => {
      // choose location
      cy.route("POST", "/locations").as("locations");
      cy.get("input").type("20007");
      cy.get("[data-cy=submit]").click();
      cy.wait("@locations");
      cy.get("[data-cy=location-card]")
        .should("exist")
        .eq(0)
        .click();

      /* Order here */

      /*************** CHECKOUT ****************************/
      // decline to order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("No", { matchCase: true })
        .click({ force: true });

      //click cart

      cy.wait(1000);
      cy.get(".cart-icon").click({ force: true });

      // checkout
      cy.get(".is-success")
        .contains("checkout", { matchCase: false })
        .click();

      // order info
      cy.route("POST", "/create-order").as("create-order");
      cy.get("[data-cy=info-name]").type("");
      cy.get("[data-cy=info-email]").type("asdf@gmail.com");
      cy.get("[data-cy=info-phone]").type("2143950129");
      cy.get("[data-cy=info-tip]").type("1");

      cy.get(".is-success")
        .contains("finish and pay", { matchCase: false })
        .click();

      cy.wait("@create-order");
    });
  });
});
