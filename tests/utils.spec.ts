import { logFormat } from "../src/utils/logger";

it("returns level, timestamp, context and message", () => {
  const result = logFormat({
    level: "info",
    message: "This is a test",
    metadata: {
      timestamp: "2022-1-1TZ01:00:11",
      context: "testing",
    },
  });

  expect(result).toBe("info 2022-1-1TZ01:00:11 testing:: This is a test");
});

it("returns level and message when metadata is undefined", () => {
  const result = logFormat({
    level: "info",
    message: "This is a test",
  });

  expect(result).toBe("info undefined :: This is a test");
});
