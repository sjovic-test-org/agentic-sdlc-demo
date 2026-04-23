---
description: |
  Automatically triages failed CI builds by investigating the failure reason,
  summarizing what went wrong, and suggesting actionable fixes. Triggers when
  the CI workflow completes with a failure and posts findings as a PR comment
  or a new issue.

on:
  workflow_run:
    workflows: [CI]
    types: [completed]
    branches:
      - "**"

if: ${{ github.event.workflow_run.conclusion == 'failure' }}

permissions:
  contents: read
  actions: read
  pull-requests: read
  issues: read

tools:
  github:
    toolsets: [default, actions]

safe-outputs:
  add-comment:
    max: 1
  create-issue:
    title-prefix: "[CI Triage] "
    labels: [ci-failure, triage]
    max: 1
---

# CI Triage Agent

A CI build has failed. Your task is to investigate the failure, summarize what went wrong, and suggest actionable fixes.

## Context

- **Failed workflow run URL**: ${{ github.event.workflow_run.html_url }}
- **Run ID**: ${{ github.event.workflow_run.id }}
- **Run number**: ${{ github.event.workflow_run.run_number }}
- **Commit SHA**: ${{ github.event.workflow_run.head_sha }}
- **Conclusion**: ${{ github.event.workflow_run.conclusion }}
- **Event that triggered CI**: ${{ github.event.workflow_run.event }}
- **Repository**: ${{ github.repository }}

## Instructions

### Step 1: Gather Information

1. Fetch the failed workflow run details using the run ID above.
2. List all jobs in the failed run and identify which ones failed.
3. Retrieve the logs for each failed job to find the error messages and stack traces.
4. If this run is associated with a pull request, identify the PR number.

### Step 2: Analyze the Failure

Carefully read through the logs and identify:

- **Root cause**: What exactly caused the build to fail? (e.g., failing test, compile error, missing dependency, environment issue)
- **Failed step(s)**: Which specific step(s) or test(s) failed?
- **Error messages**: Quote the most relevant error messages and stack traces.
- **Affected files**: Which files or modules are involved based on the error output?

### Step 3: Write a Triage Report

Produce a clear, concise triage report with the following sections:

1. **Summary** – One or two sentences describing what failed and why.
2. **Failed Jobs / Steps** – A list of the failing jobs/steps.
3. **Root Cause** – A detailed explanation of the root cause.
4. **Relevant Logs** – Key excerpts from the logs (keep it short; avoid pasting entire log files).
5. **Suggested Fixes** – Concrete, actionable suggestions to resolve the issue. For each suggestion:
   - Explain what change to make and why it should fix the problem.
   - If applicable, provide a code snippet or configuration change.
   - Reference relevant documentation or similar past issues if you know of any.
6. **Next Steps** – Brief guidance on who should look at this and what to do next.

### Step 4: Report Findings

- **If the failed run is associated with a pull request**: Add the triage report as a comment on that PR using `add-comment`. Address the comment to the PR author (look up who triggered the run from the workflow run details).
- **If there is no associated pull request** (e.g., a push to main): Create a new issue with the triage report using `create-issue`, tagging the person who triggered the run (find their login from the workflow run details).

Keep the report helpful, factual, and respectful. The goal is to help the developer fix the issue quickly.
