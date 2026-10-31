# Rhythmhel for Windows

A small app that opens Rhythmhel in its own window: no browser bars, F11 for fullscreen, F5 to reload,
and links to the website open in your normal browser. It always loads the latest version from the server,
so you never need to rebuild it when the game updates.

## Get the .exe without installing anything (GitHub)
1. Replace `icon.png` with your logo (at least 256 x 256 pixels, square).
2. Create a new GitHub repository and upload everything in this folder, including the hidden `.github` folder.
3. Open the repository's **Actions** tab, pick **Build Windows app**, then **Run workflow**.
4. When it finishes (about 5 minutes), open the run and download **Rhythmhel-Windows** under Artifacts. It contains:
   - `Rhythmhel Setup 1.0.0.exe`: installer with desktop and Start menu shortcuts
   - `Rhythmhel-portable-1.0.0.exe`: runs without installing

## Build on your own PC
1. Install Node.js 20 or newer from nodejs.org.
2. Open a terminal in this folder and run `npm install`, then `npm run dist`.
3. The .exe files appear in the `dist` folder. `npm start` runs the app without building.

## Notes
- If your site moves, change `SITE` at the top of `main.js`.
- The app is not code-signed, so Windows SmartScreen may show "Windows protected your PC" the first time.
  Players can click "More info" and then "Run anyway". Signing needs a paid code-signing certificate.
