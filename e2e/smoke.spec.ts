import { expect, test } from '@playwright/test';

test.describe('foundation smoke', () => {
  test('home page renders the hero', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /fund and build the open web/i })
    ).toBeVisible();
  });

  test('unauthenticated dashboard access redirects to sign-in', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    // The proxy gate redirects protected routes to sign-in and preserves the
    // intended destination, so the user returns here after authenticating.
    await expect(page).toHaveURL(/\/sign-in\?redirect=%2Fdashboard/);
  });
});
