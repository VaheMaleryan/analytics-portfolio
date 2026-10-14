# Executive brief — VoiceAI Business Intelligence

**All data, prices, revenue and experiment outcomes are SYNTHETIC. No Krisp operating results.**

Decision: inspect the invoice exception before accepting the billing extract; do not roll out
an onboarding variant on the strength of this small experiment.

## Evidence
- July–August closed-month expected usage charges: $482.81.
  Invoice extract: $484.04. Difference: **$1.23**
  across **1 exception(s)**. September is an incomplete billing month and excluded.
- Seven-day activation: **59/64** eligible signups.
  Activation requires at least 60 successfully processed audio seconds in the first seven inclusive calendar dates.
- Ordered 30-day funnel: 64 signups → 62 keys →
  59 first successful processing → 33 production deployments.
  Deployment is an invented integration milestone, not a paying-customer claim.
- Project-randomized onboarding ITT: guided minus standard activation **6.68 pp**,
  Newcombe 95% interval **[-9.65, 20.65] pp**; SRM p=0.134.
  The interval contains zero: **inconclusive**, not evidence of equivalence or a successful treatment.

## Recommended actions
1. Billing operations: review the exception queue by invoice/project/month, trace pricing and
   processed seconds, and require reconciliation before downstream revenue reporting. The intentional
   defect remains visible; tests require a detectable exception rather than hiding the source problem.
2. Developer product: instrument signup, key creation, first useful result and deployment with
   explicit identities. Review drop-off and time-to-value before selecting an onboarding experiment.
3. Leadership: use closed-month expected usage revenue for the synthetic segment dashboard.
   Customer concentration ranks, cumulative shares and month-on-month changes are in the SQL mart;
   six fictional organizations are too few for broad market conclusions. Region and segment are
   aligned in the original generator, so their effects cannot be separately identified.
4. Data ownership: monitor actual dbt run outcomes and source fingerprints; the build history
   supports local run monitoring, not a claim of production freshness SLA coverage.

## Statistical and financial limits
The primary metric and project-level randomization are fixed before analysis in the generator.
Assignment is deliberately unrelated to the original outcome generator: this is a methodology
exercise with 64 projects, not a powered product trial. There is one primary comparison; subgroup
exploration is descriptive. Small-sample uncertainty and observation eligibility remain explicit.
Invented USD rates are 3 cents/minute for translation and 1 cent/minute for voice-isolation
Production-tier processing, zero for Sandbox. One per-project-month rounding happens at the
invoice boundary using half-up cents. This is usage-charge accounting, not GAAP revenue, MRR,
ARR, margin or actual Krisp pricing. No personal or customer data is used.

## Validation and AI assistance
AI assisted model/SQL design, alternative hypotheses and writing. The original CSV/NumPy
incident audit remains in place. A separate commercial validator recomputes invoice cents with
Python Decimal and funnels/activation from raw events without querying dbt marts. Golden
fixtures verify the interval implementation. See `artifacts/commercial_validation.json`,
`docs/COMMERCIAL_KPIS.md` and the actual test artifacts. This is computational independence
within an AI-assisted project, not independent human review. dbt Cloud has not been used.
