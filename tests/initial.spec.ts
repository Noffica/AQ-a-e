import { test, expect } from "@playwright/test";
import { config }       from "dotenv";

test("test", async ({ page }) => {
  await page.goto(
    "https://checkout-dev.aquanow.io/rowan/3eb00b7e727b41218bc4964635fc2288",
  );
  await page.getByLabel("Enter Customer Reference ID *").click();
  await page.getByLabel("Enter Customer Reference ID *").fill("NAUMANMITHANI");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.goto(
    "https://checkout-dev.aquanow.io/rowan/3eb00b7e727b41218bc4964635fc2288/kyc",
  );
  await page.goto(
    "https://checkout-dev.aquanow.io/rowan/3eb00b7e727b41218bc4964635fc2288/payment/method",
  );
  await page.getByRole("heading", { name: "Transaction details" }).click();
  await page.getByText("Total amount due").click();
  await page.getByRole("heading", { name: "$100.20 USD" }).click();
  await page.getByText("Fee breakdown").click();
  await page.getByText("Amount without fee").click();
  await page.getByRole("heading", { name: "$100.00 USD" }).click();
  await page.getByText("Fee", { exact: true }).click();
  await page
    .getByRole("heading", { name: "$0.20 USD (0.20% of amount)" })
    .click();
  await page.getByRole("heading", { name: "Payment method" }).click();
  await page.getByText("Select an asset to pay for").click();
  await page.getByLabel("").click();
  await page.getByRole("option", { name: "BTC" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.goto(
    "https://checkout-dev.aquanow.io/rowan/3eb00b7e727b41218bc4964635fc2288/payment/instructions?cryptoType=BTC",
  );
  await page.getByRole("heading", { name: "Payment instructions" }).click();
  await page.getByText("To complete payment, please").click();
  await page.getByText("Amount due", { exact: true }).click();
  await page.getByRole("heading", { name: "BTC" }).click();
  await page.getByRole("main").getByRole("alert").click();
  await page.getByText("tb1qcxxdjetcd6e6q5rllt8sy8rqrmqh53s9t8e78n").click();
  await page
    .locator("p")
    .filter({ hasText: "tb1qcxxdjetcd6e6q5rllt8sy8rqrmqh53s9t8e78n" })
    .locator("svg")
    .click();
  await page.getByText("Network").click();
  await page.getByText("BTC", { exact: true }).click();
  await page.locator("path").nth(3).click();
  await page.getByRole("button", { name: "View payment status" }).click();
  await page.getByText("There is a balance owing on").click();
  await page.getByRole("heading", { name: "Payment status" }).click();
  await page.getByText("Invoice status").click();
  await page.getByText("Unpaid").click();
  await page.getByText("Amount remaining").click();
  await page
    .locator("div")
    .filter({ hasText: /^Amount remaining\$100\.20 USD$/ })
    .getByRole("heading")
    .click();
  await page.getByText("Invoice amount").click();
  await page.getByText("Amount received").click();
  await page
    .locator("div")
    .filter({ hasText: /^Invoice amount\$100\.20 USD$/ })
    .getByRole("heading")
    .click();
  await page.getByRole("heading", { name: "$0.00 USD" }).click();
  await page.getByRole("heading", { name: "Payment history" }).click();
  await page.getByText("No payment history").click();
});
