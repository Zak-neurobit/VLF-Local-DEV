import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title and meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Vasquez Law Firm/);

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('legal services');
  });

  test('displays main navigation', async ({ page }) => {
    // Check navigation items
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Attorneys' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Practice Areas' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('hero section is visible and interactive', async ({ page }) => {
    // Check hero content
    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toBeVisible();

    // Check CTA button
    const ctaButton = hero.getByRole('button', { name: /consultation/i });
    await expect(ctaButton).toBeVisible();

    // Click CTA and verify navigation
    await ctaButton.click();
    await expect(page).toHaveURL(/contact|consultation/);
  });

  test('language switcher works', async ({ page }) => {
    // Find and click language switcher
    const langSwitcher = page.getByRole('button', { name: /language|español|english/i });
    await langSwitcher.click();

    // Switch to Spanish
    await page.getByRole('option', { name: 'Español' }).click();

    // Verify content changed to Spanish
    await expect(page.getByText(/Servicios Legales|Abogados/)).toBeVisible();
  });

  test('contact form submission', async ({ page }) => {
    // Navigate to contact section
    await page.getByRole('link', { name: 'Contact' }).click();

    // Fill form
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="phone"]', '555-0123');
    await page.fill('[name="message"]', 'Test message for consultation');

    // Submit form
    await page.getByRole('button', { name: /submit|send/i }).click();

    // Verify success message
    await expect(page.getByText(/thank you|received/i)).toBeVisible();
  });

  test('chatbot is accessible', async ({ page }) => {
    // Check chatbot widget
    const chatWidget = page.locator('[data-testid="chat-widget"]');
    await expect(chatWidget).toBeVisible();

    // Open chat
    await chatWidget.click();

    // Verify chat interface opens
    await expect(page.locator('[data-testid="chat-interface"]')).toBeVisible();

    // Type a message
    await page.fill('[data-testid="chat-input"]', 'I need legal help');
    await page.keyboard.press('Enter');

    // Verify response appears
    await expect(page.locator('[data-testid="chat-message"]').last()).toContainText(/help|assist/i);
  });

  test('performance metrics', async ({ page }) => {
    // Measure page load performance
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      };
    });

    // Assert performance thresholds
    expect(metrics.loadTime).toBeLessThan(3000); // 3 seconds
    expect(metrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
    expect(metrics.firstPaint).toBeLessThan(1000); // 1 second
  });

  test('@visual homepage screenshot', async ({ page }) => {
    // Wait for all content to load
    await page.waitForLoadState('networkidle');

    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('accessibility check', async ({ page }) => {
    // Run accessibility audit
    const accessibilityReport = await page.evaluate(() => {
      return new Promise(resolve => {
        // This would use axe-core in a real implementation
        // For now, we'll do basic checks
        const issues: string[] = [];

        // Check for alt text on images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.alt) {
            issues.push(`Image missing alt text: ${img.src}`);
          }
        });

        // Check for proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        headings.forEach(heading => {
          const level = parseInt(heading.tagName[1]);
          if (level - lastLevel > 1) {
            issues.push(`Heading hierarchy skip: ${heading.tagName} after H${lastLevel}`);
          }
          lastLevel = level;
        });

        resolve(issues);
      });
    });

    expect(accessibilityReport).toHaveLength(0);
  });
});
