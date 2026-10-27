# Finding Nora

[![Build Status](https://travis-ci.org/vnglst/finding-nora.svg?branch=master)](https://travis-ci.org/vnglst/finding-nora) [![Coverage Status](https://coveralls.io/repos/github/vnglst/finding-nora/badge.svg?branch=master)](https://coveralls.io/github/vnglst/finding-nora?branch=master)

I made this app to test what you can accomplish with current PWA technology (especially on iOS). My kids loved it, I hope you do too! 🎉

It's a word search game made with following web technology:

- Based on `create-react-app`
- Service workers support
- Web Audio
- TypeScript
- Cypress for end-to-end testing

## Development

```sh
npm ci
npm run dev
```

## Static export and release

```sh
npm ci
npm run export
npm run preview
```

Commit `dist/` together with the source change. The shared `vnglst/static-sites`
repository pins that commit and copies `dist/` into Nginx; it never installs npm
dependencies or rebuilds this application. Update the source pin there to publish.
Keep `package-lock.json` committed and use `npm ci` for export dependencies.

Serve the export at a hostname root. Keep `sw.js`, `registerSW.js`, the manifest,
HTML and unhashed files revalidated; only content-hashed assets are immutable.
The service worker precaches the game, icons, splash screens and local sound
files. Fonts and the background image still use their existing external hosts.
Check a new-name game, saved names after reload, audio, and offline launch after
an initial online visit when releasing. Installed PWA behavior on iOS needs a
real-device check.

To roll back, restore the previous source pin in `static-sites` and redeploy.
Service-worker updates can require an online revisit before an installed app
uses the restored version.

## Conclusions about PWA's

The results on iOS Safari are very promising I think. Lots of things are still missing, like no `Add to Homescreen` popup and a hard refresh of the app every time you come back to it, but it does feel like a real app. It was even pretty kid proof, even though I wasn't able/willing to get rid of the pinch zooming.

## Credits

- Sound files (squakk + nock + restart): https://freesound.org/people/yawfle/packs/367/
- Sound file HooYeah by LemonJolly: https://freesound.org/people/lemonjolly/sounds/273925/
- Background image: Jason Leung, Unsplash
- Beta testing by my daughter Nora
