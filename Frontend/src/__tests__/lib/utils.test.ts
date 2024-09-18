import { cn, formatDate } from "@/lib/utils";

describe("Utility functions", () => {
  test("cn function merges class names correctly", () => {
    const result = cn("class1", "class2", { class3: true, class4: false });
    expect(result).toBe("class1 class2 class3");
  });

  test("formatDate formats date correctly", () => {
    const date = new Date("2023-05-15T10:30:00");
    const formattedDate = formatDate(date);
    expect(formattedDate).toMatch(/15 May 2023 at 10:30 am/);
  });
});
