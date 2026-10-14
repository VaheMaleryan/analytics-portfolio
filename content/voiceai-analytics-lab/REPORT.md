# VoiceAI Analytics Lab — analysis report

**SYNTHETIC ONLY.** These are fictional events and findings, never Krisp operational results.

## Business problem
How can a voice-AI analytics owner distinguish adoption or customer-mix changes from a
reliability regression, while giving call-center and developer teams trustworthy metrics?
This exercise contains 17,880 offered calls and 33,576 instrumented processing attempts,
July 1–September 28, 2026. All organizations, releases, and observations are invented.

## Call-center analysis
Across the full synthetic period, average handle time is 355.7 seconds,
abandonment is 6.85%, and noise-cancellation call adoption is
72.48%. Positive CSAT is 79.47%
among 6,357 responses, covering
38.17% of completed calls. The dashboard compares feature
enabled/disabled calls within noisy and quiet environments. Because feature assignment and
outcomes are synthetic and non-random, these differences cannot support a real savings claim.
The immediate analytical recommendation is to review survey coverage and workload mix before
judging a team by CSAT or AHT alone.

## Developer investigation
A rolling SQL triage scan flags: 2026-09-01, 2026-09-02, 2026-09-03, 2026-09-04, 2026-09-05, 2026-09-06, 2026-09-07. It uses the prior 14 observed days'
weighted error rate plus three binomial standard errors, with ≥7 prior days and ≥100
current attempts. This is exploratory triage, not a calibrated alert or significance claim;
multiple looks and contamination of the rolling baseline limit interpretation. Compare equal
seven-day windows: August 25–31 baseline, September 1–7 incident, September 8–14 recovery.
Across product-region slices, **translation / eu-west** has the largest error-rate increase:
1.55% (16/1031) → 29.74%
(290/975), a **28.19 percentage-point increase**.
Its all-attempt p95 latency increases from 316 to 1270 ms.
The same product in the other region changes from 1.06% to 2.74%.
The descriptive difference in differences is 26.51 percentage points.
Recovery returns to 1.64%, with p95 of 311 ms.

Within the incident, the worst release slice is **2.1.0 / translation / eu-west**:
38.43% errors, 284 failures in 739 attempts,
including 284 HTTP 504 timeouts. A same-window older release and unaffected
regions/products are comparison groups. `artifacts/investigation_mix.csv` checks request
volume, project counts, plan mix, and mean submitted audio duration. The release-specific
pattern is consistent with a timeout regression; it does not establish a real causal effect.
Excess failures versus the affected slice's baseline rate are approximately
275, a descriptive counterfactual estimate.

## AI assistance and independent validation
Codex assisted with alternative hypotheses, SQL design, denominator review, and writing.
The audit trail is `docs/AI_ASSISTANCE.md`. SQL queries do not read scenario ground truth.
`python -m voiceai.validate` separately reads raw CSV using Python/NumPy, recomputes each
slice's counts/rates/p95, release timeouts and plan-mix summaries, and rejects differences
before writing `artifacts/validation.json`. It also checks raw-file hashes and compares the
identified slice with the generator truth **only after** calculations. This is computational
independence, not a second human reviewer or a blind experiment. The report itself is
created before validation; the startup command fails if validation or tests fail.

## Recommendations for the fictional scenario
1. Engineering: pause the affected rollout, inspect 504 traces, compare timeout settings,
   and use a canary with product-region-release error rate and latency guardrails.
2. Product/data: monitor successful processed minutes and active projects alongside request
   volume; track signup cohorts including non-activated projects.
3. Call-center operations: inspect AHT, abandonment, feature adoption, and survey response
   rate together. Feature-enabled comparisons are observational and must not be presented
   as causal savings; run a randomized or matched pilot before claiming an impact.
4. Analytics owner: agree numerator/denominator contracts with engineering, investigate
   small slices cautiously, and publish executable evidence plus quality checks.

## Limitations
Synthetic probabilities deliberately create a detectable incident. There is no real
customer impact, PII, billing, production scale, or product performance evidence here.
Latency means total synthetic attempt duration, not a published Krisp service SLO.
SDK processing events are simulated telemetry, not claimed REST endpoints. FCR is a
simulated per-call resolution flag; no customer-level repeat-contact history exists.
CSAT is a voluntary sample and may be biased. Cohorts use full Monday–Sunday weeks and
are right-censored; version filters do not apply to signup cohorts. Differences in differences
assume comparable groups and are descriptive here; no causal confidence interval is claimed.
This uses **dbt Core + dbt-duckdb locally, not dbt Cloud**. Public product context is cited
in `docs/RESEARCH.md`; no pricing or commercial ROI has been inferred.
