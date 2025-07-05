import { DOMService } from "data/services/dom_service";

test("DOMService throw an error if no curriculm exist", async () => {
  const domService = new DOMService(document);
  expect(() => domService.getCurriculumElement()).toThrow(
    "no curriculum founded",
  );
});
