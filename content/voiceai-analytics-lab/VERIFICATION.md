# Executed verification record

**Synthetic portfolio only.** Generated from actual local result files, not an assumed pass.

- Recorded: 2026-10-14T22:40:49+04:00
- Runtime: Python 3.12.14, Darwin arm64
- Command sequence: `python -m voiceai.pipeline`, `pytest -q --junitxml=artifacts/pytest.xml`
- dbt models: 19 successful
- dbt data-quality tests: 76 passed, zero warnings/errors/skips
- pytest: 23 passed, zero failures/errors/skips
- Independent CSV/NumPy audit: 615 numeric comparisons and 5 source-file hashes passed
- Seed: 20261014; calls: 17,880; processing attempts: 33,576
- Dependency lock SHA-256: `47b9d582225841c8686c69f7989a52550ac544480b65607395cf82d1463866e3`

Evidence: `dbt/target/run_results.json`, `dbt/target/manifest.json`,
`artifacts/pytest.xml`, `artifacts/validation.json`, and `data/raw/manifest.json`.
Generated runtime artifacts are ignored by Git; regenerate with `./start.sh --check`.
This record reports local execution; inspect GitHub Actions separately for remote CI status.
Browser verification is recorded separately in [BROWSER_QA.md](BROWSER_QA.md).
