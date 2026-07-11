import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const completeAnswers = Object.fromEntries(Array.from({ length: 50 }, (_, index) => [index + 1, index % 4]));

const seedResult = async (page: Page, score = 25) => {
  await page.evaluate(({ answers, resultScore }) => {
    localStorage.setItem('aq50-result', JSON.stringify({ score: resultScore, answers }));
  }, { answers: completeAnswers, resultScore: score });
};

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('landing page exposes privacy, evidence and the official questionnaire', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcher AQ-Test');
  await expect(page.getByText('Keine Datenübertragung')).toBeVisible();
  await expect(page.getByRole('link', { name: /Offizieller Fragebogen/ })).toHaveAttribute('href', /AQ_Adult_German\.pdf/);
  await expect(page.getByRole('link', { name: /Originalstudie/ }).first()).toHaveAttribute('href', 'https://doi.org/10.1023/A:1005653411471');
});

test('AQ-k has a separate evidence-led entry and complete result flow', async ({ page }) => {
  await page.getByRole('button', { name: /empfohlenen Kurztest/ }).click();
  await expect(page.getByRole('heading', { name: 'AQ-k · 33 Fragen' })).toBeVisible();
  await page.getByRole('button', { name: /AQ-k starten/ }).click();
  for (let question = 1; question <= 33; question += 1) {
    await page.getByText('Ich stimme eindeutig zu', { exact: true }).click();
    if (question < 33) await expect(page.getByText(`Frage ${question + 1} von 33`, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole('heading', { name: 'AQ-k Ergebnis' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Offizieller AQ-k-Fragebogen' })).toHaveAttribute('href', /AQ_Erwachsene\.pdf/);
  await expect(page.getByText('Keine Diagnose, keine Gewähr.')).toBeVisible();
});

test('progress survives reload and malformed storage is handled safely', async ({ page }) => {
  await page.getByRole('button', { name: /ausführlichen.*Test|50-Fragen-Version/ }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ich mache Sachen lieber');
  await page.getByText('Ich stimme eher zu', { exact: true }).click();
  await expect(page.getByText('Frage 2 von 50', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Frage 2 von 50', { exact: true })).toBeVisible();
  await expect(page.getByText('1 beantwortet')).toBeVisible();

  await page.evaluate(() => localStorage.setItem('aq50-progress', '{invalid'));
  await page.reload();
  await expect(page.getByText('Frage 1 von 50', { exact: true })).toBeVisible();
});

test('keyboard navigation answers questions without mouse input', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Physical keyboard flow is covered in the desktop project.');
  await page.goto('./#/test');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.keyboard.press('4');
  await expect(page.getByText('Frage 2 von 50', { exact: true })).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByText('Frage 1 von 50', { exact: true })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Ich stimme zu' })).toBeChecked();
});

test('a complete 50-item run produces and persists a scientifically qualified result', async ({ page }) => {
  test.setTimeout(30_000);
  await page.goto('./#/test');
  for (let question = 1; question <= 50; question += 1) {
    await page.getByText('Ich stimme zu', { exact: true }).click();
    if (question < 50) await expect(page.getByText(`Frage ${question + 1} von 50`, { exact: true })).toBeVisible();
  }
  await expect(page).toHaveURL(/#\/results$/);
  await expect(page.getByRole('heading', { name: 'AQ-50 Ergebnis' })).toBeVisible();
  await expect(page.getByText('keine Diagnose', { exact: false }).first()).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'AQ-50 Ergebnis' })).toBeVisible();
});

test('an answered item can be reviewed and advanced without changing it', async ({ page }) => {
  await page.goto('./#/test');
  await page.getByText('Ich stimme eher zu', { exact: true }).click();
  await expect(page.getByText('Frage 2 von 50', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Zurück/ }).click();
  await expect(page.getByRole('radio', { name: 'Ich stimme eher zu' })).toBeChecked();
  await page.getByRole('button', { name: /Weiter/ }).click();
  await expect(page.getByText('Frage 2 von 50', { exact: true })).toBeVisible();
});

test('result tabs show subscales, sources and limitations', async ({ page }) => {
  await seedResult(page);
  await page.goto('./#/results');
  await expect(page.getByText('25', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Subskalen' }).click();
  await expect(page.getByRole('heading', { name: 'Fünf Merkmalsbereiche' })).toBeVisible();
  await expect(page.locator('.subscale-list article')).toHaveCount(5);
  await page.getByRole('button', { name: 'Quellen & Grenzen' }).click();
  await expect(page.getByText('Keine Diagnose, keine Gewähr.')).toBeVisible();
  await expect(page.getByRole('link', { name: /Freitag et al/ })).toHaveAttribute('href', 'https://doi.org/10.1026/1616-3443.36.4.280');
});

test('theme preference persists across reloads', async ({ page }) => {
  const toggle = page.getByRole('button', { name: /Farbschema verwenden/ });
  const initiallyDark = await page.locator('html').evaluate(element => element.classList.contains('dark'));
  await toggle.click();
  if (initiallyDark) await expect(page.locator('html')).not.toHaveClass(/dark/);
  else await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  if (initiallyDark) await expect(page.locator('html')).not.toHaveClass(/dark/);
  else await expect(page.locator('html')).toHaveClass(/dark/);
});

test('core pages have no automatically detectable WCAG violations', async ({ page }) => {
  const scan = async () => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21aa'])
      .analyze();
    expect(results.violations, results.violations.map(item => `${item.id}: ${item.help}`).join('\n')).toEqual([]);
  };

  await scan();
  await page.goto('./#/test');
  await scan();
  await seedResult(page, 32);
  await page.goto('./#/results');
  await scan();
  await page.getByRole('button', { name: /Dunkles Farbschema verwenden/ }).click();
  await scan();
  await page.goto('./#/aq-k');
  await scan();
  await page.goto('./#/aq-k/test');
  await scan();
  await page.evaluate(() => localStorage.setItem('aqk-result', JSON.stringify({ score: 17, answers: Object.fromEntries(Array.from({ length: 33 }, (_, index) => [index + 1, 0])) })));
  await page.goto('./#/aq-k/results');
  await scan();
});
