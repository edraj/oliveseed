# oliveseed

Sveltekit seed project

## Install

`npm run install:all`

Uses `bits-ui` library without styling

Create `.env` and define `VITE_DMART_URL`

## Run

`npm start` starts development app at `:5300` with no hot module reloading. 

## Build

`npm run build` creates a build in `host/build`. Deploy the `build` folder. 
The `host` folder contains a demo `Caddyfile` to run locally through `caddy` service. (installed locally)

> Note: during development, `app.html` is used, one build `placeholder.html` is used. Any changes to `app.html` should copied to `placeholder.html` before build. The GO template tags are used for caddy server.

## Style

Default style used is https://shut.work
To remove it, remove `shut` from `packages.json`, remove `rawless` folder, and remove `static/css/*` and any reference to the css, in `app.html` and `placeholder.html`

## Language

Defaults to URL derived language. TODO: make this optional (mainly change `hooks.ts` and `sveltekit.config` to make it optional)

The language files loaded from `static/locale/ol-{lang}.js`
Add new keys to the list of keys, with value. Then use `translate` function in code.

`{translate('Fall back text here', 'FallBackKey')}`

The fall back shows if the key does not exist. 

## Architecture

The source
TODO: readme here
