// @ts-check
import { test, expect } from "./fixtures";

test("clicking on a teaching unit change his background color", async ({
  page,
}) => {
  await page.goto(
    "https://www.cnam.fr/formation/electronique-informatique-telecommunication/informatique-systemes-dinformation-et-numerique/ingenieur-en-informatique-architecture-et-integration-des-systemes-et-des-logiciels-9",
  );

  const utc501 = page.locator(".ue").first();

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

test("validated teaching units remains on another degree", async ({ page }) => {
  await page.goto(
    "https://www.cnam.fr/formation/electronique-informatique-telecommunication/informatique-systemes-dinformation-et-numerique/ingenieur-en-informatique-architecture-et-integration-des-systemes-et-des-logiciels-9",
  );

  var utc501 = page.locator(".ue").first();
  await utc501.click({ clickCount: 2, delay: 100 });

  await page.goto(
    "https://www.cnam.fr/formation/electronique-informatique-telecommunication/informatique-systemes-dinformation-et-numerique/licence-informatique-16",
  );
  utc501 = page
    .locator(
      ".suite.suite-sequence.first-suite.suite-0.section-2 > .suite-inner > div",
    )
    .first();

  await expect(utc501).toHaveClass("ue option clearfix validated");
});

test("filtered teaching units are not clickable", async ({ page }) => {
  await page.goto(
    "https://www.cnam.fr/formation/electronique-informatique-telecommunication/informatique-systemes-dinformation-et-numerique/ingenieur-en-informatique-architecture-et-integration-des-systemes-et-des-logiciels-9",
  );

  const utc501 = page.locator(".ue").first();

  await page.locator("#teaching-center-selector").selectOption("Guadeloupe");
  await expect(utc501).toContainClass("disabled");

  await page.locator("#teaching-center-selector").selectOption("Lieu(x)");
  await expect(utc501).not.toContainClass("disabled");
});
