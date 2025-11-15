import { test, expect } from '@playwright/test';
import path from 'path';

interface BirdTestData {
  fileName: string;
  expectedName: string;
}

const birdsToTest: BirdTestData[] = [
  { fileName: 'tarin_triste.jpeg', expectedName: 'Tarin triste' },
  { fileName: 'bergeronnette_printaniere.jpeg', expectedName: 'Bergeronnette printanière' },
  { fileName: 'chevalier_aboyeur.jpeg', expectedName: 'Chevalier aboyeur' }
];

for (const bird of birdsToTest) {
  test(`should correctly identify ${bird.expectedName} on ornitho.com`, async ({ page }) => {
    
    // STEP 1: Go to the website.
    await page.goto('https://www.ornitho.com/');
    console.log(`Step 1: Navigated to https://www.ornitho.com/`);

    // STEP 2: Upload the image using a full, absolute path.
    const filePath = path.join(__dirname, '..', bird.fileName);
    console.log(`Step 3: Uploading file from absolute path: ${filePath}`);
    await page.setInputFiles('input[type="file"]', filePath);
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();

  // STEP 3: Wait for results inside iframe and extract data.
console.log(`Step 4: Waiting for AI results...`);

// First: wait for the iframe to appear
const iframeLocator = page.frameLocator('iframe#resultFrame'); 
// Replace iframe#resultFrame with the correct iframe selector

// Wait until the species container is available inside the iframe
const resultContainer = iframeLocator.locator('div.espece').first();

// Allow up to 60 seconds because identification can be slow
await resultContainer.waitFor({ timeout: 60000 });

// Extract percentage score
const resultScoreText = await iframeLocator.locator('.pour100esp').innerText();

// Extract species name
const resultName = await iframeLocator.locator('a.fiche').innerText();

console.log(`Step 4 Complete: Found result "${resultName}" with score "${resultScoreText}"`);


// STEP 4: Verify the results.
console.log(`Step 5: Verifying the data...`);

expect(resultName).toBe(bird.expectedName);

const score = parseFloat(resultScoreText.replace('%', '').trim());
expect(score).toBeGreaterThanOrEqual(90);

console.log(`SUCCESS: Test for ${bird.expectedName} passed with a score of ${score}%.`);
});

}