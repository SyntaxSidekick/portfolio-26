import { describe, expect, it } from "vitest";
import { escapeCsvCell, generateProjectImportTemplate, parseProjectImportCsvText } from "./csv";
import { getProjectImportTypeConfig, normalizeBooleanCell, normalizeIntegerCell, normalizeStatusCell, sharedColumns } from "./project-import";

const knownHeaders = new Set(sharedColumns);

describe("project import CSV utilities", () => {
  it("parses quoted commas, multiline values, and BOM headers", () => {
    const parsed = parseProjectImportCsvText('\uFEFFtitle,description\n"Hello, CSV","Line one\nLine two, still same cell"', knownHeaders);
    expect(parsed.headers).toEqual(["title", "description"]);
    expect(parsed.rows[0].values.description).toContain("Line two, still same cell");
  });

  it("rejects duplicate headers", () => {
    expect(() => parseProjectImportCsvText("title,title\nOne,Two", knownHeaders)).toThrow(/Duplicate header/);
  });

  it("warns on unknown headers", () => {
    const parsed = parseProjectImportCsvText("title,mystery\nOne,Two", knownHeaders);
    expect(parsed.warnings).toEqual(["mystery is not a supported project field."]);
  });

  it("normalizes safe scalar values", () => {
    expect(normalizeStatusCell("publish")).toBe("published");
    expect(normalizeBooleanCell("YES")).toBe(true);
    expect(normalizeIntegerCell("2026")).toBe(2026);
    expect(normalizeIntegerCell("twenty")).toBeUndefined();
  });

  it("generates templates and escapes formula-like cells", () => {
    expect(escapeCsvCell("=SUM(A1:A2)")).toBe("'=SUM(A1:A2)");
    const template = generateProjectImportTemplate(getProjectImportTypeConfig("codepen"));
    expect(template).toContain("codepenUrl");
    expect(template).toContain("Accessible Animated Tabs");
  });
});
