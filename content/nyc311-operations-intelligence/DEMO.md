# Interview demonstration — 5 minutes

1. Frame the question: how can an operations manager distinguish intake pressure from slow resolution?
   Explain immediately that these are real 311 service requests, not contact-center call records.
2. Show snapshot manifest: official API, selected agencies/quarter/fields, immutable hash, before/after
   source counts. Explain daily source mutation and why a frozen snapshot matters.
3. Open Demand & backlog. Select one agency and inspect arrivals/closures and cohort backlog. State
   that requests created before April 1 are absent; the graph is not the full City queue.
4. Open Resolution & censoring. Filter a category and borough. Contrast completed-only median with
   the curve retaining unresolved cases. Explain mature seven-day denominators and censoring assumptions.
5. Open Forecast backtesting. Explain four validation folds and the final fourteen held-out dates.
   Read actual MAE/WAPE from the result. If the chosen model loses to the benchmark, say so.
6. Show actual verification artifacts, a golden survival fixture, and the future-data leakage test.
   Demonstrate `.venv/bin/python -m ops311.validate` for independent raw-file checking.
7. Close with the generated report's agency/category-specific recommendation, limitations and a next
   operational question. Do not rank different agency mandates or claim causal staffing savings.

Likely questions: Why not use closed-only mean? Selection on closure hides the open tail. Why a simple
forecast? Transparent benchmark and honest backtesting are more useful here than a complex unvalidated model.
Why not full-city demand? Deliberately bounded scope for reproducibility; the limitation is explicit.
What did AI do? Helped design/check methods and write code; source retrieval and independent calculations
provide evidence. No fabricated professional history or real business impact is asserted.
