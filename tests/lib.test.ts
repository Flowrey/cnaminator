import { newHTMLTeachingUnit } from "./teaching_unit.test";
import { main } from "../src/js/lib";
import userEvent from "@testing-library/user-event";
import browser from "./__mocks__/webextension-polyfill";
import "@testing-library/jest-dom";

beforeEach(() => {
  browser.storage.local.get.mockImplementation(() => Promise.resolve({}));
  document.body.innerHTML =
    '<div id="parcours">' +
    newHTMLTeachingUnit("Mathematical tools for IT", "UTC501", 3) +
    newHTMLTeachingUnit("Fundamentals of Operating Systems", "UTC502", 3) +
    "</div>";
});

test("main throws an error if no curriculum is founded", () => {
  document.getElementById("parcours").setAttribute("id", "foo");

  expect(() => {
    main(document);
  }).toThrow("no curriculum founded");
});

test("main don't throws and error if a teaching unit is invalid", async () => {
  document.getElementById("parcours").innerHTML =
    newHTMLTeachingUnit(null, "UTC501", 3) +
    newHTMLTeachingUnit("Fundamentals of Operating Systems", "UTC502", 3);
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[1];
  main(document);
  expect(el).not.toHaveClass("selected");

  await user.click(el);

  expect(el).toHaveClass("selected");
});

test("clicking on a teachingUnit change his state", async () => {
  const user = userEvent.setup();
  const el = document.getElementsByClassName("ue")[0];
  main(document);
  expect(el).not.toHaveClass("selected");

  await user.click(el);

  expect(el).toHaveClass("selected");
});
