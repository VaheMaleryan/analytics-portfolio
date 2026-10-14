# Developer ecosystem — decision brief

**Real public repository activity. This is not commercial product usage, customer count, revenue or employee productivity.**

Scope: 2025 calendar-year default-branch commits, 2025-created non-PR issues, and 2025-published releases. Snapshot captured 2026-10-14T18:34:37.724296+00:00. Three deliberately selected voice-software repositories, not a representative market sample.

## Evidence by repository

- **SYSTRAN/faster-whisper**: 19 default-branch commit records (19 non-merge), 7 known non-bot non-merge authors; 0 commits lack a linked author. 116 in-window issues: 46 closed before cutoff, 70 unresolved. 3 stable published releases. Seven-day closure 28/116 (24.1%; Wilson interval 17.3–32.7%).
- **snakers4/silero-vad**: 95 default-branch commit records (54 non-merge), 14 known non-bot non-merge authors; 1 commits lack a linked author. 68 in-window issues: 61 closed before cutoff, 7 unresolved. 3 stable published releases. Seven-day closure 45/67 (67.2%; Wilson interval 55.3–77.2%).
- **ufal/whisper_streaming**: 10 default-branch commit records (7 non-merge), 4 known non-bot non-merge authors; 0 commits lack a linked author. 26 in-window issues: 22 closed before cutoff, 4 unresolved. 0 stable published releases. Seven-day closure 12/26 (46.2%; Wilson interval 28.8–64.5%).

## AI-assisted activity investigation

The largest observed absolute monthly increase versus the preceding three months is **snakers4/silero-vad / 2025-08-01**: **13 non-merge commits** against a previous-three-month mean of **0.67**. Within known non-bot non-merge authors, the largest author's share is **13/13 (100.0%)**.

The investigation checks whether the change is a broad participation expansion or concentrated authorship. Counts and author shares do not establish why the burst happened. Merges, explicit bots and unlinked authors are separated, while unrecognized automation and co-authors remain limitations. The source API is fully paginated within declared bounds; it is not all project or ecosystem activity.

## Decisions and recommendations

1. A team choosing an open-source dependency should review release cadence, issue closure and known-author concentration together, then inspect maintenance plans, license and integration fit. Do not convert a commit-count ranking into a quality or adoption ranking.
2. A concentrated maintenance burst suggests reviewing maintainer availability and handover documentation; it does not prove a staffing problem. Validate the mechanism with release notes and maintainers before acting.
3. Developer relations can monitor whether observed first-month cohorts return in later full months, but this describes public code participation only. Never call those authors activated users or paying customers.
4. Keep unresolved issues in the denominator, report category/context differences, and retain the simple closure-rate sample sizes. Published releases do not imply installs; tags without GitHub Release objects are outside this measure.

## Statistical interpretation and completeness

The Wilson intervals are descriptive binomial uncertainty summaries under an independence assumption. Issues can be clustered by reporter and maintenance period; different issue policies and complexity defeat causal cross-project comparisons. Closure is an administrative event, not necessarily a bug fix. Closed-only medians exclude unresolved issues; seven-day rates require complete follow-up.

Cohorts use first observed linked human non-merge authorship in 2025. January authors may be longtime contributors, and unknown commit authors are excluded. This left-truncated window is not first-ever contributor acquisition. Default-branch history excludes non-reachable branches; author identity may be missing and explicit Bot type does not detect all automation. Deleted/private activity is inaccessible. Current closure fields cannot reconstruct reopen history.

Issue queries use updated-since overlap and keyed upserts; commit queries overlap the last seven days of observed commit time. Periodic full refresh is needed for deletions, old edits or rewritten history outside overlap. Pagination exhaustion is evidence about returned pages, not a guarantee of all historical activity. Exact source hashes and pagination/rate metadata are in snapshots. API credentials remain only in memory.

## Independent checks

AI assisted selection rationale, schema/SQL, alternative explanations and writing. A separate validator reads the sanitized immutable JSON without dbt/SQL and recomputes monthly activity, issue closure, observed-author cohorts, concentration and peak comparisons. Incremental upsert tests verify repeated updates and reject stale overwrites. This is independent calculation, not a second human review. No real business outcomes are fabricated.
