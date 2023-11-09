import { useCustomRouter } from "@/lib/useCustomRouter";

describe("useCustomRouter", () => {
  test("push() appends query params when preserveQuery true", () => {
    const router = useCustomRouter();
    const expected = "/my/second/route?fruit=apple&colour=blue";

    window.location.assign("/my/original/route?fruit=apple&colour=blue");

    const result = router.push("/my/second/route", {
      preserveQuery: true,
    });

    expect(result).toBe(expected);
  });
});
