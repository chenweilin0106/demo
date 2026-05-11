# Repository Guidelines

## Project Structure & Module Organization

This directory contains a reusable Vue 2 `jsonImage` Lottie animation component.

- `jsonImage.vue` renders Lottie directory-form resources and `zip` packages, resolves OSS paths through `VUE_APP_OSS_PATH`, and emits `loaded`, `complete`, and `error` events.
- `jsonZipIdb.js` downloads zip packages with `axios`, caches raw `ArrayBuffer` data in IndexedDB, deduplicates same-URL requests, supports bypassing IndexedDB for a fresh network request, and exposes single-entry bad-cache deletion.

There are no local assets, tests, or package files in this folder. Shared Vue CLI configuration for the wider `components` area is in `../js/vue.config.normal.js` and `../js/vue.config.weekly.js`.

## Build, Test, and Development Commands

This is not a standalone npm package. Run commands from the host Vue project that imports this component.

- `npm run serve` starts the consuming Vue app for local manual testing.
- `npm run build` creates a production build in the host project.
- `PAGE_NAME=<page> npm run build` may be required by projects using `../js/vue.config.weekly.js`.

Confirm each command exists in the host project's `package.json`.

## Coding Style & Naming Conventions

Follow the current Vue 2 Options API style: two-space indentation, single quotes, no semicolons, and concise Chinese comments for intent or constraints.

Use lower camel case names such as `jsonImage`, `jsonBox`, `getJsonZipData`, and `clearObjectStore`. Keep changes scoped to Lottie animation behavior; do not add static image handling, framework upgrades, or broad abstractions unless required.

Keep the Lottie animation instance out of `data()` so Vue 2 does not observe the large animation object. Initialize it in `created()` as the non-reactive `this._animationInstance` field, and use that name consistently for play, pause, event binding, and destroy logic. When zip cache playback triggers `data_failed` and retries from source, destroy the failed Lottie instance before creating the replacement instance.

## Testing Guidelines

No automated tests are present. For behavior changes, test manually in a consuming page with:

- a directory path resolving to `data.json` and `images/`;
- a full `http` or `https` directory URL;
- a `.zip` package, including a repeated load that should hit IndexedDB;
- a bad cached zip, a cached zip missing `data.json`, and a cached zip that triggers Lottie `data_failed`; each should delete the bad cache and retry once without emitting `error` if the fresh request succeeds;
- rapid `imgName` changes, both `loop` values, destruction, and error fallback paths.

If tests are added later, place them beside the component or in the host project's established test directory, and name them after the behavior under test.

## Commit & Pull Request Guidelines

Recent history mixes English maintenance commits like `Update config_backup.toml` and concise Chinese descriptions like `更新记录弹框，规则弹框模板`. Use short, specific commit messages.

Pull requests should include the reason for the change, affected pages, manual test notes, and screenshots or screen recordings for visible animation changes.

## Agent-Specific Instructions

Before editing files, inspect local code, shared config, and git status. Do not assume standalone scripts exist. Preserve user changes and avoid unrelated cleanup.
