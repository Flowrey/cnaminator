import userEvent from "@testing-library/user-event";
import browser from "./__mocks__/webextension-polyfill";
import { newHTMLTeachingUnit } from "./teaching_unit.test";
import "@testing-library/jest-dom";

test("teaching units are clickable", async () => {
  browser.storage.local.get.mockImplementation(() => Promise.resolve({}));
  document.body.innerHTML =
    '<div id="parcours">' +
    newHTMLTeachingUnit("Mathematical tools for IT", "UTC501", 3) +
    newHTMLTeachingUnit("Fundamentals of Operating Systems", "UTC502", 3) +
    "</div>";

  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0];
  expect(el).not.toHaveClass("selected");

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("../src/js/main");

  await user.click(el);
  expect(el).toHaveClass("selected");
  expect(el).not.toHaveClass("validated");

  await user.click(el);
  expect(el).not.toHaveClass("selected");
  expect(el).toHaveClass("validated");

  await user.click(el);
  expect(el).not.toHaveClass("selected");
  expect(el).not.toHaveClass("validated");
});
