# 3okail Blueprint

Personal website of **Ahmed Abd El-Basset AbuOkail**, Planning & Project Control Engineer (Cairo, Egypt).

A static, bilingual (English / Arabic RTL) site with light/dark mode. No build step.

| Page | What it has |
|---|---|
| `index.html` | Home: intro, profile, services, projects (click to open details), links to the labs, contact / RFI form |
| `career.html` | Career as a Gantt chart, skills as a WBS, training log |
| `evm.html` | Earned value lab: sliders drive an S-curve, SPI/CPI/EAC |
| `delay.html` | Delay analysis lab: insert a delay, see the critical path and EOT entitlement |
| `tender.html` | Tender schedule lab: BOQ to schedule, critical path, S-curve and monthly cash flow |
| `app.html` | Engaz (إنجاز): the progress tracking app, with screenshots from its demo data |
| `articles.html`, `article-*.html` | Articles (EN/AR): Time Impact Analysis, SPI/CPI, BOQ to tender schedule |

Shared styles and behaviour live in `assets/site.css` and `assets/site.js`.

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.
Add `?lang=ar` to the URL to open in Arabic.

## Publish on GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)`.
The site will be at `https://<username>.github.io/3okail-blueprint/`.

## Editing content
Each page keeps its text in a `T` object (English `en`, Arabic `ar`) in the script at the bottom of the page. Projects are in the `projects` array in `index.html`; jobs, skills and training are in `career.html`. Menu labels are in `assets/site.js`.
