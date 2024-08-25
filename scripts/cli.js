import { Command, Argument } from "commander";
import { build } from "./build.js";

const program = new Command();

program
  .name("build")
  .description("build the web extension for the desired browser")
  .addArgument(
    new Argument("<browser>", "browser to build the extension from").choices([
      "firefox",
      "chrome",
    ]),
  )
  .action(async (browser) => {
    console.log(`Building web extension for "${browser}"`);
    await build(browser);
  });

program.parse();
