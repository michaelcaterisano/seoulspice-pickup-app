describe("makes a random order", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.server();
  });

  context("random order", () => {
    it("makes a random order", () => {
      // choose location
      cy.route("POST", "/locations").as("locations");
      cy.get("input").type("20007");
      cy.get("[data-cy=submit]").click();
      cy.wait("@locations");
      cy.get("[data-cy=location-card]")
        .should("exist")
        .eq(0)
        .click();

      /* ORDER BOWL SIGNATURE*/
      cy.contains("bowl", { matchCase: false }).click({ force: true });
      cy.get(".signature-card")
        .contains("southwest", { matchCase: false })
        .click({
          force: true,
        });

      // choose base
      cy.contains("white rice", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // extra proteins
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // choose protein
      cy.get("[data-cy='Extra Proteins']")
        .contains("beef", { matchCase: false })
        .click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose extras
      cy.get(".fa-plus").each(($el) => {
        cy.wrap($el).click({ force: true });
      });
      cy.get("[data-cy=extras-next-button]").click({ force: true });

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /*ORDER BOWL SIGNATURE (NO OPTIONS)*/
      cy.contains("bowl", { matchCase: false }).click({ force: true });
      cy.get(".signature-card")
        .contains("southwest", { matchCase: false })
        .click({
          force: true,
        });

      // choose base
      cy.contains("white rice", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // extra proteins
      cy.wait(1000);
      cy.get(".button")
        .contains("No", { matchCase: true })
        .click({ force: true });

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
      cy.get("[data-cy=info-name]").type("Bowl Signature");
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
