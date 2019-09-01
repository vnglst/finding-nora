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
yarn start
```

## Build

```sh
yarn build
```

## Deploy

```sh
yarn deploy # deploys on Netlify https://nora.koenvangilst.nl`
```

```sh
yarn deploy:now # deploys on Now https://nora.now.sh`
```

## Conclusions about PWA's

The results on iOS Safari are very promising I think. Lots of things are still missing, like no `Add to Homescreen` popup and a hard refresh of the app every time you come back to it, but it does feel like a real app. It was even pretty kid proof, even though I wasn't able/willing to get rid of the pinch zooming.

## Credits

- Sound files (squakk + nock + restart): https://freesound.org/people/yawfle/packs/367/
- Sound file HooYeah by LemonJolly: https://freesound.org/people/lemonjolly/sounds/273925/
- Background image: Jason Leung, Unsplash
- Beta testing by my daughter Nora
