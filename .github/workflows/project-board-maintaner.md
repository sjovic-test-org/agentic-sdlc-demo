---
on:
  issues:
    types: [opened]
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
    project: https://github.com/orgs/my-mona-org/projects/1
    max: 1
---

# Intelligent Issue Triage

Analyze each new issue in this repository and decide whether it belongs on the project board.

Set structured fields only from allowed values:

- Status: Needs Triage | Proposed | In Progress | Blocked
- Priority: Low | Medium | High
- Team: Platform | Docs | Product
