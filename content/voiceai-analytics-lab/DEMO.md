# Interview demonstration — 7 minutes

Before the interview, run `./start.sh --check`, then `./start.sh`. Initial installation needs internet; the app needs no keys or paid services. Keep a terminal ready with this folder as the current directory. All numbers below are read from the running app/report, not memorized claims about Krisp.

**0:00–0:40 · Frame the problem**

“VoiceAI Analytics Lab is an independent synthetic portfolio aligned with Krisp's public Call Center and Developer businesses. I treated the task as domain ownership: business questions, metric contracts, trustworthy models, investigation and recommendations. Every organization and event is fictional. This is local dbt Core; I am not claiming dbt Cloud experience.” Show the synthetic banner and `docs/RESEARCH.md`.

**0:40–1:30 · Explain the model**

Open `docs/ARCHITECTURE.md`. Trace CSV → raw DuckDB → staging → dimensions/facts → marts and SQL → Streamlit. Explain the two event grains and why facts never join directly. Point to `dbt/models/schema.yml` and one singular test. Explain that p95 comes from fact rows rather than averaged daily percentiles.

**1:30–2:30 · Call Center Performance**

Keep the default event range. Show demand, AHT, adoption and CSAT. Filter region `eu-west`, then a team; point out that KPI cards and trends update together. Open Feature comparison. “Enabled versus disabled is observational. Noisy calls and team mix can confound the difference. I would test a causal improvement with an experiment, not label this chart as savings.” Show respondent count and survey-response denominator.

**2:30–3:40 · Developer/API Analytics**

Switch dashboards and clear region/team choices as needed. Set event dates to August 25–September 14, 2026. Show the error trend and latency spike, then the product/region/release comparison. Filter `translation`, `eu-west`, then `2.1.0`; show why a version filter can remove prior-period events. Clear SDK filter before moving on.

Open Signup cohorts. “This date control filters signup, not event dates. The denominator includes projects that never activate, and incomplete weeks are blank. Age 0 is signup-week activation.” Point to the denominator counts beneath the heatmap.

**3:40–5:10 · Investigate and challenge the result**

Open Incident investigation. Explain its explicit fixed-window scope. Use the generated report's exact error numerator/denominator and p95 values. Compare the affected slice with the same product in the other region, and the older release in the same incident window. Show `artifacts/investigation_mix.csv`. Discuss volume/plan/project mix and 504 concentration.

“AI helped draft hypotheses, SQL and the report. I intentionally injected this scenario, so this isn't blind discovery. I independently recomputed the evidence from raw CSV without DuckDB. This validates arithmetic and localization, not causality or real customer impact.” Show `docs/AI_ASSISTANCE.md`.

**5:10–6:10 · Verification**

Show the most recent `artifacts/pytest.xml`, `dbt/target/run_results.json` and `artifacts/validation.json`. Optionally run:

```bash
.venv/bin/python -m voiceai.validate
.venv/bin/python -m pytest tests/test_metric_contracts.py tests/test_investigation.py -q
```

Explain golden fixtures, independent raw checks and tamper-rejection tests. Do not claim CI passed unless a remote CI run has actually executed; the GitHub workflow is supplied but local runs are the demonstrated evidence.

**6:10–7:00 · Decision and next steps**

“For the fictional release regression, I recommend pausing the affected rollout, inspecting timeout configuration and adding canary guardrails. For operations, pair AHT with abandonment and survey coverage. In a real team, I would first agree event semantics and metric ownership, then add event-time dimensions, retry/session identity, source monitoring, incremental loads and agreed SLOs.”

Likely follow-ups: Why DuckDB? Small local reproducibility. Why not revenue? No justified synthetic pricing is needed for these questions. Why dbt Core? Free, reviewable model/test execution; Cloud-specific operation remains an experience gap. Does the SDK send audio to a server? Not implied; the dataset normalizes fictional processing telemetry. What would invalidate the finding? Data-quality failures, instrumentation changes, confounded rollout assignment or an alternative mechanism in traces.

## Business Intelligence extension (additional 2 minutes)

Open Business Intelligence. Show the synthetic closed-month usage-charge contract, the
full-outer-join invoice exception, the ordered deployment funnel and 7-day activation.
In Experiment, explain project-level ITT, the [-9.65, 20.65] pp uncertainty interval and
why a positive point estimate is inconclusive. Show actual run history and generated lineage.
State that all prices and commercial outcomes are invented and dbt Cloud was researched but
has not been used. The commercial CSV/Decimal audit reproduces each invoice and project window.
