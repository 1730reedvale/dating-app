import { translateText } from "../TranslationService";

test("translateText returns translated string", async () => {
  const result = await translateText("Hello", "es");
  expect(result).toContain("[es]");
});
