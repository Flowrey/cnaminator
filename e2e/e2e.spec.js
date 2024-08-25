// @ts-check
import { test, expect } from "./fixtures";

test("click on teaching unit", async ({ page }) => {
  await page.goto(
    "https://formation.cnam.fr/rechercher-par-discipline/licence-informatique-1085631.kjsp",
  );
  await page.getByRole("link", { name: "Programme" }).click();

  const utc501 = page
    .locator("#branche_43 div")
    .filter({ hasText: "3 ECTSOutils mathématiques" })
    .nth(2);

  // First click
  await utc501.click();
  await expect(utc501).toHaveClass("ue option clearfix selected");

  // Second click
  await utc501.click();
  await expect(utc501).toHaveClass("ue option clearfix validated");

  // Third click
  await utc501.click();
  await expect(utc501).toHaveClass("ue option clearfix");
});

test("validated teaching unit on another degree", async ({ page }) => {
  await page.goto(
    "https://formation.cnam.fr/rechercher-par-discipline/licence-informatique-1085631.kjsp",
  );
  await page.getByRole("link", { name: "Programme" }).click();

  var utc501 = page
    .locator("#branche_43 div")
    .filter({ hasText: "3 ECTSOutils mathématiques" })
    .nth(2);
  await utc501.click({ clickCount: 2, delay: 100 });

  await page.goto(
    "https://formation.cnam.fr/rechercher-par-discipline/ingenieur-en-informatique-architecture-et-integration-des-systemes-et-des-logiciels-1003893.kjsp",
  );
  await page.getByRole("link", { name: "Programme" }).click();
  utc501 = page
    .locator("#branche_1 div")
    .filter({ hasText: "3 ECTSOutils mathématiques" })
    .nth(2);

  await expect(utc501).toHaveClass("ue option clearfix validated");
});
