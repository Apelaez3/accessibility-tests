import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://main.d2sk28qnzn31cz.amplifyapp.com/seller-register');

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
          color: #2a4d96;
          font-size: 2.25rem;
          margin-bottom: 2rem;
        }
        .container {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }
        .card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .impact-critical { border-left: 6px solid #e53935; }
        .impact-serious  { border-left: 6px solid #fb8c00; }
        .impact-moderate { border-left: 6px solid #fdd835; }
        .impact-minor    { border-left: 6px solid #43a047; }

        .violation-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #222;
          margin-bottom: 0.5rem;
        }
        .impact-tag {
          display: inline-block;
          font-size: 0.875rem;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
        .critical { background-color: #ffcdd2; color: #b71c1c; }
        .serious  { background-color: #ffe0b2; color: #e65100; }
        .moderate { background-color: #fff9c4; color: #f57f17; }
        .minor    { background-color: #c8e6c9; color: #1b5e20; }
        .violation-description {
          font-size: 1rem;
          color: #444;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        code {
          background: #e0e0e0;
          padding: 0.3rem 0.5rem;
          border-radius: 6px;
          font-size: 0.9rem;
          color: #222;
        }
        a {
          color: #2196f3;
          text-decoration: none;
          font-weight: 500;
        }
        a:hover {
          text-decoration: underline;
          color: #1565c0;
        }
        ul {
          padding-left: 1.25rem;
          list-style: disc;
        }
        li {
            margin-bottom: 0.5rem;
            font-size: 1rem;
            color: #555;
        }
        .section-heading {
            font-size: 1.1rem;
            font-weight: 600;
            margin-top: 1.5rem;
            color: #333;
        }

      </style>
    </head>
    <body>
      <h1>Accessibility Violations</h1>
      <div class="container">
        ${
          results.violations.length === 0
            ? `<div class="card"><p>No accessibility violations found.</p></div>`
            : results.violations.map(violation => {
                const impact = violation.impact || 'minor';
                return `
                <div class="card impact-${impact}">
                  <h2 class="violation-title">${violation.id}</h2>
                  <div class="impact-tag ${impact}">${impact.toUpperCase()}</div>
                  <p class="violation-description">${violation.description}</p>
                  <p class="section-heading">Help:</p>
                  <p><a href="${violation.helpUrl}" target="_blank" rel="noopener noreferrer">${violation.helpUrl}</a></p>
                  <p class="section-heading">Affected elements:</p>
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
  fs.writeFileSync('axe-report.json', JSON.stringify(results, null, 2));

  await browser.close();
})();






