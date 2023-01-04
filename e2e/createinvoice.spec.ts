import { test, expect } from "@playwright/test";

test("Create an invoice and update and view Invoices list", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Invoice-dashboard/);
  // click link
  await page.getByRole("link", { name: "Create invoice" }).click();

  // add content
  await page
    .locator('[data-test-id="invoice-1"]')
    .getByRole("checkbox")
    .check();

  // set username
  await page
    .locator('[data-test-id="invoice-1"]')
    .getByLabel("Customer")
    .click();
  await page
    .locator('[data-test-id="invoice-1"]')
    .getByLabel("Customer")
    .fill("test user");

  // set price

  await page.locator('[data-test-id="invoice-1"]').getByLabel("price").click();
  await page
    .locator('[data-test-id="invoice-1"]')
    .getByLabel("price")
    .fill("200");

  // create invoce

  await page
    .locator('[data-test-id="invoice-1"]')
    .getByRole("button", { name: "Create invoice" })
    .click();

  // goto invoices list

  await page.getByRole("link", { name: "Invoices" }).click();
});
