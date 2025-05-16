import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://main.d2sk28qnzn31cz.amplifyapp.com/?logout=true');

  const axeBuilder = new AxeBuilder({ page });
  const results = await axeBuilder.analyze();

  // Generate HTML report
  const reportHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accessibility Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Inter', sans-serif;
        background-color: #f4f6f8;
        color: #333;
        padding: 2rem;
      }

      h1 {
        text-align: center;
        color: #1a1a1a;
        font-size: 2rem;
        margin-bottom: 2rem;
      }

      .container {
        max-width: 960px;
        margin: 0 auto;
        display: grid;
        gap: 1.5rem;
      }

      .card {
        background: white;
        border-left: 6px solid #888;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease-in-out;
      }

      .card:hover {
        transform: scale(1.01);
      }

      .impact-critical { border-left-color: #e53935; }
      .impact-serious  { border-left-color: #fb8c00; }
      .impact-moderate { border-left-color: #fdd835; }
      .impact-minor    { border-left-color: #43a047; }

      .violation-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      .impact-tag {
        display: inline-block;
        font-size: 0.875rem;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      .critical { background-color: #ffcdd2; color: #b71c1c; }
      .serious  { background-color: #ffe0b2; color: #e65100; }
      .moderate { background-color: #fff9c4; color: #f57f17; }
      .minor    { background-color: #c8e6c9; color: #1b5e20; }

      code {
        background: #eef;
        padding: 2px 4px;
        border-radius: 4px;
      }

      a {
        color: #1e88e5;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      ul {
        padding-left: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Accessibility Violations Report</h1>
    <div class="container">
      ${
        results.violations.length === 0
          ? `<p>No accessibility violations found.</p>`
          : results.violations.map(violation => {
              const impact = violation.impact || 'minor';
              return `
              <div class="card impact-${impact}">
                <div class="violation-title">${violation.id}</div>
                <div class="impact-tag ${impact}">${impact.toUpperCase()}</div>
                <p>${violation.description}</p>
                <p><strong>Help:</strong> <a href="${violation.helpUrl}" target="_blank">${violation.helpUrl}</a></p>
                <p><strong>Affected elements:</strong></p>
                <ul>
                  ${violation.nodes.map(n => `<li><code>${n.html}</code></li>`).join('')}
                </ul>
              </div>
              `;
            }).join('')
      }
    </div>
  </body>
  </html>
  `;


  fs.writeFileSync('accessibility-report.html', reportHtml);
  console.log('Report saved to accessibility-report.html');

  await browser.close();
})();





