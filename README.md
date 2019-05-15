# Meme App

## Set up Environment

Make sure you have Node.js installed

Install these packages

	$ npm install -g ionic cordova jsdoc

Clone the repo (or pull)

Navigate to the repo folder and run

	$ npm install

Then within the repo folder run

	$ ionic serve

You should now see the app open in a browser and you can begin hacking away at it

Install the ionic devapp for testing https://ionicframework.com/docs/appflow/devapp (Optional)

## Before Pushing

1. Ensure proper JSDoc for custom methods, services etc
2. run `npm run lint` to check if code is clean

## Notes on Environment Changes

1. I have moved ionic's theme.scss to src/styles/helpers/variables.global.scss
2. To access global variables in individual component and page scss you need to run var(--variable);
3. When you import a variable into a component/page assign it to another local variable at the top of the scss so we know what is being used

## Misc

Backend repo: https://github.com/ghostcoder217/meme-app-server
