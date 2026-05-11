# Repository Guidelines

## Project Structure & Module Organization

This folder contains a reusable Vue 2 SVGA animation component.

- `svgaImage.vue` is the UI component. It accepts `imgName` and `loop`, emits `loaded`, `animOnFinished`, and `error`, and resolves relative SVGA paths through `VUE_APP_OSS_PATH`.
- `svgaVideoItemIdb.js` loads SVGA resources with `svgaplayerweb`, caches parsed `videoItem` values in IndexedDB, deduplicates same-URL requests, supports bypassing IndexedDB for a fresh network request, and exposes cache cleanup helpers including single-entry bad-cache deletion.

There are no local assets, tests, or package files in this directory. Shared Vue CLI configuration for the wider `components` area is in `../js/vue.config.normal.js` and `../js/vue.config.weekly.js`.

## Build, Test, and Development Commands

This directory is not a standalone npm package. Run commands from the consuming Vue project that imports this component.

- `npm run serve` starts the host Vue app for manual testing.
- `npm run build` creates a production build in the host project.
- `PAGE_NAME=<page> npm run build` may be required by projects using `../js/vue.config.weekly.js`.

Before relying on a command, confirm it exists in the host project `package.json`.

## Coding Style & Naming Conventions

Follow the current Vue 2 Options API style. Use two-space indentation, single quotes, no semicolons, and concise Chinese comments for intent or constraints. Keep component names and CSS classes aligned with existing lower camel case names such as `svgaImage`, `svgaBox`, and `getSvgaVideoItem`.

Keep changes small and direct. Do not add framework upgrades, new build tooling, or broad abstractions unless the consuming project requires them.

## Testing Guidelines

No automated tests are present for this folder. For behavior changes, test manually in a consuming page with:

- a relative SVGA name;
- a full `http` or `https` SVGA URL;
- both `loop=true` and `loop=false`;
- a bad cached `videoItem` that fails playback; it should delete the bad cache and retry once without emitting `error` if the fresh request succeeds;
- component activation, deactivation, and destruction;
- IndexedDB unavailable or cache write failure paths when relevant.

If tests are added later, place them beside the component or in the host project’s established test directory, and name them after the behavior under test.

## Commit & Pull Request Guidelines

Recent history mixes English maintenance commits (`Update config_backup.toml`) and concise Chinese feature/fix descriptions (`更新记录弹框，规则弹框模板`). Use short, specific commit messages that name the affected component or behavior.

Pull requests should include the reason for the change, manual test notes, affected pages, and screenshots or screen recordings for visible animation changes.

## Agent-Specific Instructions

Before editing files, inspect the local code and shared config first. Do not assume standalone scripts exist. Preserve existing user changes and avoid unrelated cleanup.
