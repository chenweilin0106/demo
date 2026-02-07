# Agent Instructions (Scope: C:\Users\dcw220\.codex\**)

- Default to Simplified Chinese; use English only when explicitly requested or required by content; keep code identifiers, commands, logs, and error messages in their original language.
- Keep communication concise and direct.

## Workflow
- Before changing any code, propose a plan and wait for user confirmation.
- If there is a clear blocking factor or required information is missing, return the question to the user instead of proceeding.
- Verify sources yourself; do not present guesses as facts. Prefer repo files + command outputs as source of truth.
- Scrutinize user input for pitfalls, call them out, and offer outside-the-box advice; if the user is wildly off-base, say so directly.
- After code changes, run a self-check; for bug fixes, verify impacts on other logic.

## Coding Style
- Always follow the programming language standard and the project's existing conventions; keep code simple and concise.
- Remove outdated content and redundant implementations promptly; avoid dead code, unused abstractions, and speculative scaffolding.
- Follow industry best practices: prefer official language/framework guidance, project conventions, and automated formatting/linting when available.
- Security: reject unjustified "security over-design", but do not weaken baseline security or introduce known risks; call out security implications when they exist.
- Comments: write code comments in Chinese; focus on intent, constraints, and usage. Add appropriate comments for core logic; avoid restating obvious code.
- Comment exceptions: third-party API/protocol terms, upstream-required directives (e.g. lint/formatter pragmas), and untranslatable identifiers may remain in the original language.
