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


/* Search
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange}/>
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
          <FacilitiesFilter selectedFacilityType={selectedFacilities} onChange={handleFacilityChange}/>
          <PriceFilter selectedPrice={selectedPrice} onChange={setSelectedPrice}/>

        </div>
      </div>



      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold">
            {hotelData?.pagination?.total ?? 0} hotels found
            {search.destination ? `in ${search.destination}` : ""}
          </span>
          <select value = {sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-slate-300 rounded-lg p-2 mt-2">
            <option value="">Sort By</option>
            <option value="starRating">Rating</option>
            <option value="pricePerNightAsc">Price Low to High</option>
            <option value="pricePerNightDesc">Price High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {hotelData?.data.map((hotel) => (
            <SearchResultCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div>
          <Pagination
          page = {hotelData?.pagination.page || 1}
          pages = {hotelData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
*/
test("Hotel Search display ", async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("Galle");
    await page.getByRole("button",{name:"Search"}).click();
    await expect(page.getByText("hotels found in Galle")).toBeVisible();
    await expect(page.locator("h4").getByText("Niyagama House")).toBeVisible();

});