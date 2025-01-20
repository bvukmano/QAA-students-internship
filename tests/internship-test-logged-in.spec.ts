import { expect, test } from "@playwright/test";

test("Navigate to valamar.com & validate page title", async ({ page }) => {
  const valamarURL = "https://valamar.com";
  await page.goto(valamarURL, { waitUntil: "domcontentloaded" });

  await expect(page, "Page does NOT have expected page title.").toHaveTitle(
    "Valamar Holiday Hotels & Resorts in Croatia and Austria",
    { timeout: 60000 }
  );
});

test("Navigate to valamar.com & click on Log in button", async ({ page }) => {
  const valamarURL = "https://valamar.com";
  await page.goto(valamarURL, { waitUntil: "domcontentloaded" });
  await page.locator('button[id="azureb2c-login"]').click({ timeout: 30000 });
  await page
    .locator('button[class="btn-vlm-primary w-full mt-6 app-button"]')
    .click();
  await expect(page, "Page does NOT have expected page title.").toHaveTitle(
    "Sign up or sign in",
    { timeout: 60000 }
  );
});

async function fetchData(url: string): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
}

test("Validate ALL page URLs & Network response", async ({}) => {
  const urls = [
    "https://valamar.com",
    "https://www.rtl.hr/",
    "https://www.moemax.hr/",
    "https://optika-anda.com/",
    "https://www.suncanihvar.com/hr",
  ];

  console.log(`Total URLs to validate: ${urls.length}`);

  for (const url of urls) {
    console.log(`Validating URL: ${url}`);
    expect(url, "URL does NOT have the proper structure!").toContain(
      "https://"
    );

    const response = await fetchData(url);
    console.log(`Response status for ${url}: ${response.status}`);

    const statusCode = response.status;
    expect(statusCode, `Unexpected status code for ${url}!`).toBe(200);
  }
});
