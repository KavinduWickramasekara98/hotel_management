import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";
test.beforeEach( async ({page}) => {
    await page.goto(UI_URL);
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    await page.locator('[name="email"]').fill("11@gmail.com");
    await page.locator('[name="password"]').fill("password123");
    await page.getByRole("button", { name: "Sign In" }).click();
    
    await expect(page.getByText("Sign in Success")).toBeVisible();
});

test("Hotel Search display ", async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("Galle");
    await page.getByRole("button",{name:"Search"}).click();
    await expect(page.getByText("hotels found in Galle")).toBeVisible();
    await expect(page.locator("h4").getByText("Niyagama House")).toBeVisible();

});

 test("Display hotel details", async ({ page }) => {
   await page.goto(UI_URL);
   // Perform search actions
    await page.getByPlaceholder("Where are you going?").fill("Galle");
    await page.getByRole("button", { name: "Search" }).click();
   await page.getByRole("link", { name: "View More" }).first().click();
   // Verify navigation to the detail page
   await expect(page).toHaveURL(/detail/);
   // Verify the "Book Now" button is visible
   await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
 });