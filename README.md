# keptcha
NPM Package for captcha-api.

RESTFUL API: https://captcha-api.akshit.me

## Installation:
```shell
npm install keptcha
```

## Usage:
```js
const keptcha = require('keptcha');

// Generate a captcha
keptcha.generate();

// Optional configuration
keptcha.generate({width: 300,height: 100, circles: 10, length: 4});

// Verify Captcha
keptcha.verify({uuid: '1ebe3492-64b2-69f0-86df-cd02a334434c', captcha: 'y6j1h5'});
```