# NYC 311 — executive operations brief

**Real public service requests, not contact-center call records.**

Scope: April 1–June 30, 2025 arrivals for DEP, DOT and DSNY; observed as of July 1, 2025 (exclusive). Snapshot retrieved 2026-10-14T18:25:47.479234+00:00.

The extract contains **195,941 requests**, **182,307 with a valid closure before cutoff**, and **13,634 unresolved at cutoff**. Invalid closure order is explicitly flagged for 203 source records.

## Agency-specific operational evidence

Each row below describes the largest category within that agency, not an agency performance ranking. Different mandates and case mix prevent fair cross-agency productivity comparisons.

- **DEP / Water System**: 22,272 requests; 1,430 unresolved at cutoff; 11,464/13,056 (87.8%) eligible cases close within seven days. Kaplan–Meier median: 0.03 days.
- **DOT / Street Condition**: 21,351 requests; 2,039 unresolved at cutoff; 17,120/19,635 (87.2%) eligible cases close within seven days. Kaplan–Meier median: 1.15 days.
- **DSNY / Dirty Condition**: 15,874 requests; 687 unresolved at cutoff; 13,818/14,303 (96.6%) eligible cases close within seven days. Kaplan–Meier median: 0.96 days.

## Forecast evaluation and planning

Demand models predict arrivals, not closures or staffing requirements. Model class is selected using four 7-day rolling-origin validation folds (origins 49, 56, 63, 70). The final 14 days are held out from that selection, evaluated as two successive 7-day horizons. No future observations enter an origin’s training data.

- **DEP** selected `weekday_mean`: validation MAE 61.3; holdout MAE **719.8 requests/day** vs seasonal-naive 760.5. Holdout WAPE 59.3%. This small holdout does not establish a durable improvement.
- **DOT** selected `weekday_mean`: validation MAE 67.5; holdout MAE **83.4 requests/day** vs seasonal-naive 85.3. Holdout WAPE 12.1%. This small holdout does not establish a durable improvement.
- **DSNY** selected `seasonal_naive`: validation MAE 124.3; holdout MAE **188.8 requests/day** vs seasonal-naive 188.8. Holdout WAPE 19.9%. This small holdout does not establish a durable improvement.

## Investigating forecast failure

The DEP held-out error is operationally material. Its peak arrival date, **2025-06-24**, contains **3,721 requests**, including **3,442 Water System requests (92.5%). The complete day spine and raw-file reconciliation rule out a missing-day aggregation explanation. This localized category surge explains why a smooth weekday baseline misses demand, but the seven collected fields do not identify its external cause.

Recommendation: use category-specific surge alerts and a contingency planning scenario for DEP, rather than treating average forecast error as a stable capacity guarantee. Obtain domain context before attributing the spike to weather, a policy or system behavior. This is an exploratory diagnosis, not a causal finding.

## Recommendations

1. Agency teams should triage high-volume and aging categories within their own mandate; inspect age and seven-day closure coverage rather than a single mean across agencies.
2. Use the observed held-out forecast error as a planning sensitivity range. If the selected model does not beat the simple benchmark on holdout, keep the benchmark and collect a longer history. No staffing conversion is justified without service-time and capacity data.
3. Publish a cohort-backlog label with every chart. This extract excludes requests created before April 1 and cannot estimate the city’s entire open queue.
4. Review invalid close timestamps and category definition changes with source owners before operational targets are inferred. Do not silently drop unresolved cases from performance reporting.

## Statistical interpretation and limitations

Completed-only medians select on closure; they are not the expected time for all arriving requests. Kaplan–Meier treats open cases as right-censored and assumes non-informative administrative censoring. Calendar drift, case mix and repeat requests can violate assumptions; no causal or agency-quality claim is made. Seven-day closure proportions include only requests with a full seven days of potential follow-up. Source timestamps are floating New York local times. Latest source status is retained but not used to infer historical closure. Reopening history is unavailable; this is reconstruction from current created/closed fields, not a historical event log.

The source is mutable and not transactionally versioned; count-before/count-after checks catch some collection drift, not all in-place edits. The checked-in checksum snapshot provides reproducibility for this report. Only seven non-address fields are collected. Public 311 requests are not representative of all resident demand or all 311 interactions.

## AI assistance and independent checking

AI assisted schema design, censoring critique, forecast split design and report drafting. `ops311.validate` separately reads the immutable gzip JSON using standard Python, datetime, bisect and NumPy; recomputes scope, all category statistics, all daily backlog balances, and every held-out prediction and score. Tests include golden censoring/forecast fixtures and a future-data leakage check. This is independent calculation within an AI-assisted project, not independent human review. See validation.json and VERIFICATION.md for executed evidence.
