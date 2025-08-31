import { test, expect } from '@playwright/test';

test('simulator initializes, runs, and resets', async ({ page }) => {
  await page.goto('file:///workspace/3gpp_simulator.html');

  await expect(page.getByRole('heading', { name: '3GPP Simulator' })).toBeVisible();

  const ueCount = page.locator('#ue-cnt');
  await expect(ueCount).toHaveText(/5/);

  const toggleBtn = page.locator('#toggle-sim-btn');
  await toggleBtn.click();
  await expect(toggleBtn).toHaveText(/Pause/);

  await page.click('#add-ue-btn');
  await expect(ueCount).toHaveText(/6/);

  // Wait for at least one UE to become RRC connected
  await page.waitForFunction(() => {
    const el = document.querySelector('#rrc-cnt');
    return el && parseInt((el.textContent || '0').trim(), 10) >= 1;
  }, { timeout: 10000 });

  // Wait for at least one signaling message to appear
  await page.waitForSelector('#msg-log .msg', { timeout: 10000 });

  // Reset and verify counters
  await page.click('#reset-sim-btn');
  await expect(toggleBtn).toHaveText(/Start/);
  await expect(ueCount).toHaveText(/5/);
});

