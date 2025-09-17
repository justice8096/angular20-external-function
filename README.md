# Preferences feature (Angular 20)

This small library provides a `PreferencesComponent` (standalone) and a `SourceChooserComponent` to choose between saving/loading preferences to a local file (File System Access API) or an external HTTP service.

See `src/lib` for source and `example` for a minimal bootstrap.

Notes:
- Local file operations use the browser File System Access API and require a supporting browser (Chromium-based).
- External service uses simple fetch GET/PUT to the provided URL.

Quick run (local dev):

1. npm install
2. Build the example (use a bundler like esbuild, vite, or tsc + a simple server). Example using esbuild:

```bash
npm install --save-dev esbuild http-server
npx esbuild example/main.ts --bundle --outfile=example/main.js --format=esm
npx http-server example -c-1
```

Then open http://localhost:8080 in a Chromium-based browser.

To add a real `favicon.ico` file (optional):

```bash
# From project root
base64 -d example/favicon.ico.base64 > example/favicon.ico
```

Or on Windows (PowerShell):

```powershell
[System.IO.File]::WriteAllBytes('example\\favicon.ico', [System.Convert]::FromBase64String((Get-Content example\\favicon.ico.base64 -Raw)))
```

Simple Node server that rewrites `/favicon.ico` to `/favicon.svg` is included at `example/server.js`.
Run it with:

```bash
cd example
npm install express
node server.js
```


# angular20-external-function

Small Angular 20 module that provides a standalone `PreferencesComponent` and `SourceChooserComponent` plus a `PreferencesService` that can load/save preferences either from a local file (via the File System Access API) or an external HTTP endpoint.

Files added:

Notes

Quick build (TypeScript only):

```bash
npm install
npx tsc -p tsconfig.json
```

Which packaging refinement would you like next: ng-packagr based library, or keep the simple tarball workflow?

ng-packagr packaging

To build an Angular Package Format bundle with ng-packagr:

1. Install dev dependency:

```bash
npm install --save-dev ng-packagr
```

2. Build and pack:

```bash
npm run build:ng
npm run pack:ng
```

The build will place the APF output in `dist/` and `pack:ng` will create a tarball there.
