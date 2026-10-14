# Vahe Maleryan — Analytics Portfolio

[Public portfolio](https://vahemaleryan.github.io/analytics-portfolio/)

A self-contained professional portfolio for a Computer Science student in Armenia with SQL
and AI-assisted development experience. It showcases three independent, verified analytical
projects without inventing professional employment, customer outcomes or dbt Cloud usage.

## Run locally

Python 3.12 and Bash; no third-party packages or paid services:

```bash
./start.sh
```

Creates a fresh local virtual environment, executes the website contract tests, and serves
**http://127.0.0.1:8504**. `./start.sh --check` runs tests only. `PORTFOLIO_PORT` overrides the
loopback port. Runtime/test dependencies are Python's standard library and native browser APIs;
`requirements.lock.txt` explicitly records the absence of third-party packages. All images,
styles, scripts and frozen aggregate data are local; no CDN, tracking script or API key needed.

## Experience

- Three project cards with actual dashboard screenshots and explicit data-kind labels.
- Business case studies: question, method, measured evidence, decisions and limitations.
- Native SVG architecture diagrams, evidence table linked to verified source commits,
  local startup instructions and short interview guides.
- Interactive historical aggregate explorer: NYC held-out forecast comparisons by agency,
  and public GitHub monthly activity by repository and measure. Tables and CSV export expose
  the exact plotted values. This is a frozen browser demo, not live operational telemetry.
- Responsive layouts, keyboard-accessible native controls, semantic headings, skip navigation
  and reduced-motion support. No cross-browser or formal accessibility certification is claimed.

## Source projects

- [VoiceAI Business Intelligence](https://github.com/VaheMaleryan/voiceai-analytics-lab): synthetic only.
- [NYC 311 Operations Intelligence](https://github.com/VaheMaleryan/nyc311-operations-intelligence): real public requests.
- [Developer Ecosystem Intelligence](https://github.com/VaheMaleryan/developer-ecosystem-intelligence): real public repository activity.

`content/evidence.json` records actual local checks, clean-install results, published repository
identities and source commits. The aggregate demos and attached reports are frozen copies of
those verified artifacts. Three meaningful contract tests check local links/assets, evidence
identity/pass status, and quantitative consistency with the case studies. Browser interaction
checks are recorded in `docs/BROWSER_QA.md` separately from unit tests.

`refresh_evidence.py` is an optional author workflow that rebuilds frozen content from verified
sibling projects in the full workspace. It is not needed to clone/run this website independently.
A refresh must be followed by case-study review, tests and browser verification before publication.

## Publication and restrictions

Static GitHub Pages hosting is available for public repositories on GitHub Free. The workflow
checks site contracts before deploying. The public site uses the same versioned assets as local
startup. No paid service is required or activated. Source datasets and repository content retain
their respective terms, attribution and limitations; this site's code license does not relicense
third-party records. Public aggregate values are not financial advice or operational guarantees.

See `docs/VERIFICATION.json`, `docs/BROWSER_QA.md`, and the three source repositories for executed
evidence. dbt Core is demonstrated locally; dbt Cloud is researched but **has not been used**.
