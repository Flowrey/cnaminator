import { Buffer } from "node:buffer";
import * as esbuild from "esbuild";
import AdmZip from "adm-zip";
import path from "path";

const manifest = {
  manifest_version: 3,
  name: "CNAMinator",
  description: "A web extension to help selecting teaching unit for the CNAM.",
  version: "0.3.1",
  icons: {
    16: "icons/icon16.png",
    32: "icons/icon32.png",
    48: "icons/icon48.png",
    64: "icons/icon64.png",
    128: "icons/icon128.png",
  },
  permissions: ["storage"],
  content_scripts: [
    {
      matches: ["*://formation.cnam.fr/*"],
      js: ["content_script.js"],
      css: ["cnaminator.css"],
    },
  ],
};

export async function build(browser) {
  let result = await esbuild.build({
    entryPoints: ["src/js/main.ts"],
    bundle: true,
    minify: false,
    write: false,
    outfile: "content_script.js",
  });

  const zip = new AdmZip();
  const zip_name = `${manifest["name"].toLowerCase()}-${
    manifest["version"]
  }.zip`;
  if (browser === "firefox") {
    const firefox_manifest = Object.assign(manifest, {
      manifest_version: 2,
      browser_specific_settings: {
        gecko: { id: "{095ce751-8119-48cd-a429-4d214aaf5bab}" },
      },
    });
    zip.addFile("manifest.json", Buffer.from(JSON.stringify(firefox_manifest)));
  } else {
    zip.addFile("manifest.json", Buffer.from(JSON.stringify(manifest)));
  }

  for (let out of result.outputFiles) {
    zip.addFile(path.basename(out.path), out.contents);
  }

  zip.addLocalFile("src/css/cnaminator.css");
  zip.addLocalFile("src/icons/icon16.png", "icons/");
  zip.addLocalFile("src/icons/icon32.png", "icons/");
  zip.addLocalFile("src/icons/icon48.png", "icons/");
  zip.addLocalFile("src/icons/icon64.png", "icons/");
  zip.addLocalFile("src/icons/icon128.png", "icons/");
  zip.writeZip(zip_name);

  return zip_name;
}
