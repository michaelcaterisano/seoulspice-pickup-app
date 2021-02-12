describe("Order KBBQ With Grill", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.server();
  });

  context("order", () => {
    it("Orders KBBQ with grill", () => {
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
      cy.get("[data-cy=entree-categories]")
        .should("exist")
        .contains("Korean BBQ")
        .click();

      cy.contains("grill", { matchCase: false }).click();

      // choose beef
      cy.get("[data-cy=Proteins]")
        .contains("beef", { matchCase: false })
        .click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // additional items
      cy.get(".fa-plus").each(($el) => {
        cy.wrap($el).click();
      });
      // next
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.wait(1000);

      // extras
      cy.get(".fa-plus").each(($el) => {
        cy.wrap($el).click();
      });
      cy.get("[data-cy=extras-next-button]").click();

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
