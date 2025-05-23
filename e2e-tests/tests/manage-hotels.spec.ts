import { test,expect } from '@playwright/test';
import path from "path";
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

/* body("name").notEmpty().withMessage('Name is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Type is required'),
    body("adultCount").notEmpty().isNumeric().withMessage('Adult count is required'),
    body("childCount").notEmpty().isNumeric().withMessage('Child count is required'),
    body("facilities").notEmpty().isArray().withMessage('Facilities is required'),
    body("pricePerNight").notEmpty().isNumeric().withMessage('Price per night is required'),
    body("starRating").notEmpty().isNumeric().withMessage('Star rating is required')
*/
test("users add hotels successfully", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);
    await page.locator('[name="name"]').fill("Hotel 1");
    await page.locator('[name="city"]').fill("City 1");
    await page.locator('[name="country"]').fill("Country 1");
    await page.locator('[name="description"]').fill("Description 1");
    await page.getByText("Business").click();
    await page.getByText("Romantic").click();
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("1");
    await page.getByLabel("Garden").check();
    await page.locator('[name="pricePerNight"]').fill("20");
    await page.selectOption('[name="starRating"]',"5");
    await page.setInputFiles("[name=imageFiles]", [
      path.join(__dirname, "files", "h1.jpg"),
      path.join(__dirname, "files", "h2.jpg"),
      path.join(__dirname, "files", "h3.jpg"),
    ]);
    await page.getByRole('button',{name:"Submit"}).click();
    //await expect(page.getByText("Hotel added successfully")).toBeVisible();
    await expect(page.getByText("Hotel added successfully")).toBeVisible({
      timeout: 10000,
    });
});

test("display my hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.waitForSelector("text=Niyagama House", { timeout: 10000 });
  await expect(
    page.getByRole("heading", { name: "Niyagama House" })
  ).toBeVisible();
  await expect(
    page.getByText("Niyagama House is a serene boutique hotel")
  ).toBeVisible();
   await expect(
     page.locator("div").getByText("Galle, Sri Lanka").first()
   ).toBeVisible();
  
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("$20 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 2 children")).toBeVisible();
  await expect(page.getByText("3 stars")).toBeVisible();
  await expect(page.getByRole("link",{name:"View"})).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
   await expect(page.getByRole("link", { name: "Delete" })).toBeVisible();
});
test("Able to edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link", { name: "View" }).click();
  await page.waitForSelector('[name="name"]',{state:"attached"});
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Niyagama House"
  );
  await page.locator('[name="name"]').fill("Niyagama House Updated");

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Hotel Updated !")).toBeVisible({
    timeout: 10000,
  });
  await page.reload();
   await expect(page.locator('[name="name"]')).toHaveValue(
     "Niyagama House Updated"
   );
  await page.locator('[name="name"]').fill("Niyagama House");
  await page.getByRole("button", { name: "Submit" }).click();
});