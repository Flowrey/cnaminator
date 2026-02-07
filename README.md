<p align="center"><img width="128" src="src/icons/icon.svg"></p>
<p align="center">A web extension to help select teaching units for the <strong>CNAM</strong>.</p>

<h2 align="center">CNAMinator</h2>

**CNAMinator** makes teaching units from [cnam-paris.fr](https://www.cnam-paris.fr) selectable so you can plan and visualize your progress toward a degree.

## Notes

The domain previously used (formation.cnam.fr) no longer exists and now redirects to <https://www.cnam.fr/formation>.

As a temporary workaround, this extension is enabled for the similar site <https://www.cnam-paris.fr>. I plan to update CNAMinator to support the new <https://www.cnam.fr/formation> pages, but that requires adapting to the site's updated HTML/CSS and will take additional work.

## Building

The `scripts/build.js` file generates a `manifest.json` for the target browser, bundles the JavaScript files, and constructs the zip archive to publish.

To run the script you need [Node.js](https://nodejs.org) (LTS or newer). From the project root:

- `npm install`
- `npm run build firefox` or `npm run build chrome`

A file named `cnaminator-x.y.z.zip` will be created in the project root.

## Testing

We use [Jest](https://jestjs.io) for unit tests and [Playwright](https://playwright.dev/) for end-to-end tests.

Run unit and E2E tests with `npm run test` and `npm run e2e`, respectively.

## Inspiration

Project layout and build scripts were inspired by [darkreader](https://github.com/darkreader/darkreader) and [AugmentedSteam](https://github.com/IsThereAnyDeal/AugmentedSteam).
