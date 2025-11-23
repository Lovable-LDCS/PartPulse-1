import { test, expect } from '@playwright/test';

test.describe('Footer Component', () => {
  test('should display footer with branding elements', async ({ page }) => {
    await page.goto('/');
    
    // Check footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check PartPulse branding
    await expect(footer.locator('text=PartPulse')).toBeVisible();
    
    // Check copyright text
    await expect(footer.locator('text=/© \\d{4} Trane Thermo King Pty LTD/')).toBeVisible();
    
    // Check "Powered by" text
    await expect(footer.locator('text=Powered by')).toBeVisible();
    
    // Check logos are present
    const partPulseLogo = footer.locator('img[alt="PartPulse Logo"]');
    await expect(partPulseLogo).toBeVisible();
    
    const traneLogo = footer.locator('img[alt="Trane Thermo King"]');
    await expect(traneLogo).toBeVisible();
  });

  test('should display footer on all pages', async ({ page }) => {
    const routes = [
      '/',
      '/internal-transfer',
      '/warranty-claims',
      '/health-checker'
    ];
    
    for (const route of routes) {
      await page.goto(route);
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    }
  });
});
