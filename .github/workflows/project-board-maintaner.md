---
on:
  issues:
    types: [opened]
  bots:
    - datadog-official
permissions:
  contents: read
  actions: read
  issues: read
  pull-requests: read
tools:
  github:
    github-token: ${{ secrets.GH_AW_READ_PROJECT_TOKEN }}
    toolsets: [default, projects]
safe-outputs:
  update-project:
    github-token: ${{ secrets.GH_AW_WRITE_PROJECT_TOKEN }}
    project: https://github.com/orgs/sjovic-test-org/projects/2
    max: 1
---

# Intelligent Issue Triage

Analyze each new or updated issue and decide whether it should be added to the project board.

## Special Case: Datadog Production Issues

**First, check if the issue author is `app/datadog-official`:**

If YES, this is a production bug from monitoring and requires immediate attention:

- **Always** add to the project board
- Set `Priority = High`
- Set `Status = Proposed`
- Add labels: `production-bug`, `datadog`
- These issues bypass the normal triage criteria below

## Standard Issue Triage

For all other issues, add to the board only if it represents actionable engineering work:

- bug report
- feature request
- documentation task
- maintenance or refactoring task

Do not add the issue to the board if it is:

- a question or support request
- spam
- a duplicate
- missing enough information to identify actionable work

When information is incomplete:

- prefer `Status = Needs Triage`
- avoid assigning `High` priority unless the issue clearly describes a blocker, production outage, or severe user impact

Set fields only from allowed values:

- Status: Needs Triage | Proposed | In Progress | Blocked
- Priority: Low | Medium | High
- Team: Platform | Docs | Product

Base every decision strictly on the issue title and body. Do not infer missing facts.
