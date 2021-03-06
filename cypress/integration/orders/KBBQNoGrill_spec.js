describe("Order KBBQ No Grill", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.server();
  });

  context("order", () => {
    it("Orders KBBQ With No Grill", () => {
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

      cy.get(".card-description")
        .contains("without", { matchCase: false })
        .click({ force: true });

      // choose beef
      cy.get("[data-cy=Proteins]")
        .contains("beef", { matchCase: false })
        .click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose cucumber
      cy.get("[data-cy=Veggies]")
        .contains("cucumber", { matchCase: false })
        .click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // decline extras
      cy.get("[data-cy=extras-next-button]").click();
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      cy.wait(1000);
      // decline extras
      cy.get("[data-cy=extras-next-button]").click({ force: true });

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
      cy.get("[data-cy=info-name]").type("KBBQ No Grill");
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
