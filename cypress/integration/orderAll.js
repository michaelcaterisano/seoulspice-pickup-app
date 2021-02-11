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
        .click();

      /* ORDER KBBQ WITH GRILL */

      cy.get("[data-cy=entree-categories]")
        .should("exist")
        .contains("Korean BBQ")
        .click();

      cy.contains("grill", { matchCase: false }).click();

      // choose beef
      cy.contains("beef", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click();

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

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /* ORDER KBBQ WITH GRILL (NO OPTIONS)*/

      cy.get("[data-cy=entree-categories]")
        .should("exist")
        .contains("Korean BBQ")
        .click();

      cy.contains("grill", { matchCase: false }).click();

      // choose beef
      cy.contains("beef", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click();

      // decline extras
      cy.get("[data-cy=extras-next-button]").click();
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      cy.wait(1000);
      // decline extras
      cy.get("[data-cy=extras-next-button]").click({ force: true });
      // order another entree
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /* ORDER KFEAST FOR 2 */

      cy.contains("korean feast for 2", { matchCase: false }).click();

      // choose options
      cy.contains("white rice", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("beef", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("cucumber", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("scallions", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.get(".fa-plus").each(($el) => {
        cy.wrap($el).click({ force: true });
      });
      cy.get("[data-cy=extras-next-button]").click();

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /* ORDER KFEAST FOR 2 (NO OPTIONS) */

      cy.contains("korean feast for 2", { matchCase: false }).click();

      // choose options
      cy.contains("white rice", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      // decline protein
      cy.get(".button")
        .contains("next", { matchCase: false })
        .click({ force: true });

      cy.wait(1000);

      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // decline veggies
      cy.get(".button")
        .contains("next", { matchCase: false })
        .click({ force: true });

      cy.wait(1000);

      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline toppings
      cy.get(".button")
        .contains("next", { matchCase: false })
        .click({ force: true });

      cy.wait(1000);

      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // decline extras
      cy.get("[data-cy=extras-next-button]").click({ force: true });
      cy.wait(1000);

      // order another entree
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /* ORDER KFEAST FOR 4*/

      cy.contains("korean feast for 4", { matchCase: false }).click();

      // choose options
      cy.contains("white rice", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("beef", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("cucumber", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("scallions", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.get(".fa-plus").each(($el) => {
        cy.wrap($el).click({ force: true });
      });
      cy.get("[data-cy=extras-next-button]").click({ force: true });

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /* ORDER KFEAST FOR 4 (NO OPTIONS) */

      cy.contains("korean feast for 4", { matchCase: false }).click();

      // choose options
      cy.contains("white rice", { matchCase: false }).click();
      cy.contains("next", { matchCase: false }).click({ force: true });

      // decline protein
      cy.get(".button")
        .contains("next", { matchCase: false })
        .click({ force: true });

      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // decline veggies
      cy.get(".button")
        .contains("next", { matchCase: false })
        .click({ force: true });

      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline toppings
      cy.get(".button")
        .contains("next", { matchCase: false })
        .click({ force: true });

      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline extras
      cy.get("[data-cy=extras-next-button]").click();

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /*ORDER BOWL BUILD YOUR OWN*/
      cy.contains("bowl", { matchCase: false }).click({ force: true });
      cy.get(".signature-card")
        .contains("build your own", { matchCase: false })
        .click({
          force: true,
        });

      // choose base
      cy.contains("white rice", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("beef", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // extra proteins
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // choose protein
      cy.contains("beef", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose vegetable
      cy.contains("cucumber", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose sauce
      cy.contains("korean hot sauce", { matchCase: false }).click({
        force: true,
      });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // on the side
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // choose topping
      cy.contains("scallions", { matchCase: false }).click({ force: true });
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

      /* ORDER BOWL BUILD YOUR OWN (NO OPTIONS)*/
      cy.contains("bowl", { matchCase: false }).click({ force: true });
      cy.get(".signature-card")
        .contains("build your own", { matchCase: false })
        .click({
          force: true,
        });

      // choose base
      cy.contains("white rice", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // decline protein
      cy.contains("next", { matchCase: false }).click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline vegetable
      cy.contains("next", { matchCase: false }).click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline sauce
      cy.contains("next", { matchCase: false }).click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // decline topping
      cy.contains("next", { matchCase: false }).click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline extras
      cy.get("[data-cy=extras-next-button]").click({ force: true });

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

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
      cy.contains("beef", { matchCase: false }).click({ force: true });
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

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /*ORDER KORRITO BUILD YOUR OWN*/
      cy.contains("korrito", { matchCase: false }).click({ force: true });
      cy.get(".signature-card")
        .contains("build your own", { matchCase: false })
        .click({
          force: true,
        });

      // choose base
      cy.contains("white rice", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.contains("beef", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // extra proteins
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // choose protein
      cy.contains("beef", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose vegetable
      cy.contains("cucumber", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose sauce
      cy.contains("korean hot sauce", { matchCase: false }).click({
        force: true,
      });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose topping
      cy.contains("scallions", { matchCase: false }).click({ force: true });
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

      /*ORDER KORRITO SOUTHWEST (NO OPTIONS)*/
      cy.contains("korrito", { matchCase: false }).click({ force: true });
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

      cy.get("[data-cy=extras-next-button]").click({ force: true });

      // order another entree
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      /* ORDER KID'S BOWL*/
      cy.contains("kid's bowl", { matchCase: false }).click({ force: true });

      // choose base
      cy.contains("white rice", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // chose protein
      cy.contains("beef", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      // choose vegetable
      cy.contains("cucumber", { matchCase: false }).click({ force: true });
      cy.contains("next", { matchCase: false }).click({ force: true });

      cy.wait(1000);

      // choose sauce
      cy.contains("korean hot sauce", { matchCase: false }).click({
        force: true,
      });
      cy.contains("NEXT", { matchCase: true }).click({ force: true });

      // on the side
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // choose topping
      cy.contains("scallions", { matchCase: false }).click({ force: true });
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

      // ORDER KID'S BOWL (NO OPTIONS)
      cy.contains("kid's bowl", { matchCase: false }).click({ force: true });

      // choose base
      cy.contains("white rice", { matchCase: false }).click({ force: true });
      cy.get(".button")
        .contains("next", { matchCase: false })
        .click({ force: true });
      // decline protein
      cy.get(".is-success")
        .contains("next", { matchCase: false })
        .click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline vegetable
      cy.contains("next", { matchCase: false }).click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
        .click({ force: true });

      // decline sauce
      cy.contains("next", { matchCase: false }).click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: false })
        .click({ force: true });

      // decline topping
      cy.contains("next", { matchCase: false }).click({ force: true });
      cy.wait(1000);
      cy.get(".button")
        .contains("Yes", { matchCase: true })
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
      cy.get("[data-cy=info-name]").type("kbbq with grill");
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
