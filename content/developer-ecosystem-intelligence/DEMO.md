# Interview demonstration — 5 minutes

1. Explain repository selection: three complementary public voice-software components, chosen for
   relevant function and bounded inspectable histories, not to prove one is best.
2. Show the snapshot manifest: exact 2025 scope, sanitized fields, pagination completion and source
   hashes. State explicitly that GitHub activity is not commercial usage or paying customers.
3. Run activity and release comparisons, selecting one repository and a month range. Explain merges,
   explicit bots and missing linked authors. Never sum monthly unique authors into an annual count.
4. Show issue closure: PRs excluded, unresolved cases retained at a fixed cutoff, mature seven-day
   proportions with sample sizes. Discuss workflow differences and why closure need not mean a fix.
5. Open first-observed contributor cohorts. Explain January left truncation and why these are not
   new user acquisition cohorts. Missing author IDs remain a coverage issue.
6. Present the generated peak investigation, its exact numerator/denominator and the competing
   broad-participation vs concentrated-authorship explanations. State what cannot be established.
7. Show actual full/incremental capture manifests and load audits. Explain overlap, keyed updates,
   idempotent replay, stale update protection and periodic full refresh for deletions or rewrites.
8. Run `.venv/bin/python -m ecosystem.validate`, then show a loader fixture test and executed dbt
   results. Clarify AI's contributions and the independent computational check boundary.

Useful follow-ups: Does a release imply an install? No. Is a commit author an employee or user?
No. Is fully paginated data complete historical activity? No; source mutation, deletion, private
work and non-default branches remain outside coverage. How would this become production? Use
webhooks/conditional requests, durable checkpoints, monitored quotas and periodic reconciliation.
