import { test as base, chromium } from "@playwright/test";
import { build } from "../scripts/build.js";
import AdmZip from "adm-zip";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname and __filename for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToExtension = "test-src";
const zipFileName = await build("chrome");
const zipFilePath = path.join(__dirname, "..", zipFileName);
const zip = new AdmZip(zipFilePath);
zip.extractAllTo(pathToExtension, true);

export const test = base.extend({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        // headless=new mode is not officially supported and might result in unexpected behavior.
        // `--headless=new`,
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
});
export const expect = test.expect;
