<p align="center"><img width="128" src="src/icons/icon.svg"></a></p>
<p align="center">A web extension to help selecting teaching unit for the <strong>CNAM</strong>.
</p>
<h2 align="center">CNAMinator</h2>

**CNAMinator** make teaching units from the [formation.cnam.fr](https://formation.cnam.fr) selectable so you can plan and visualize your progress on a degree.

## Building

The `scripts/build.js` file is responsible for generating a `manifest.json` for the
desired browser, bundle the JavaScript files and construct the zip archive which will be published.

In order to run the script [Node.js](https://nodejs.org) (LTS or higher will work) must be installed.
Once installed, in the root folder, run the following commands:

- `npm install`
- `npm run build firefox` or `npm run build chrome`

A archive named `cnaminator-x.y.z.zip` should have been created in the root directory.

## Testing

We use [Jest](https://jestjs.io) for the unit testing and [Playwright](playwright.dev/) for E2E testing.

You can run the unit and and E2E tests with respectively `npm run test` and `npm run e2e`.

## Inspiration

Project layout and build scripts have been inspired by the [darkreader](https://github.com/darkreader/darkreader) and [AugmentedSteam](https://github.com/IsThereAnyDeal/AugmentedSteam) extensions.
