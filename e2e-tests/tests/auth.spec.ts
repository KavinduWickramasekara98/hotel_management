import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";

test("should navigate from the sign-in page successfully", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
await page.locator('[name="email"]').fill("11@gmail.com");
await page.locator('[name="password"]').fill("password123");
await page.getByRole("button", { name: "Sign In" }).click();

await expect(page.getByText("Sign in Success")).toBeVisible();
await expect(page.getByRole("link",{name: "My Booking"})).toBeVisible();
await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("able to register a new user", async ({ page }) => {
  const randomEmail = `test_mail${Math.floor(Math.random()*9000)+1000}@gmail.com`;
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create new account" }).click();
  await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
  await page.locator('[name="firstName"]').fill("KKKK");
  await page.locator('[name="lastName"]').fill("WWWW");
  await page.locator('[name="email"]').fill(randomEmail);
  await page.locator('[name="password"]').fill("password123");
  await page.locator('[name="confirmPassword"]').fill("password123");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("User created successfully")).toBeVisible();
await expect(page.getByRole("link",{name: "My Booking"})).toBeVisible();
await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

});
