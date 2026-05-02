import test from "node:test";
import assert from "node:assert/strict";
import { formatKenyaTimestamp } from "@/lib/datetime";

test("formatKenyaTimestamp stores visible sheet time in Africa/Nairobi", () => {
  assert.equal(
    formatKenyaTimestamp("2026-05-02T07:08:08.868Z"),
    "2026-05-02 10:08:08 EAT",
  );
});
