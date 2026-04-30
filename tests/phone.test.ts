import test from "node:test";
import assert from "node:assert/strict";
import { getWhatsAppNumber, normalizeLeadPhone } from "@/lib/phone";

test("normalizeLeadPhone converts Kenyan local mobile numbers to E.164", () => {
  assert.equal(normalizeLeadPhone("0727256939"), "+254727256939");
  assert.equal(normalizeLeadPhone("727256939"), "+254727256939");
  assert.equal(normalizeLeadPhone("0727 256 939"), "+254727256939");
});

test("normalizeLeadPhone preserves valid international numbers", () => {
  assert.equal(normalizeLeadPhone("+1 415 555 2671"), "+14155552671");
  assert.equal(normalizeLeadPhone("+44 20 7946 0018"), "+442079460018");
});

test("normalizeLeadPhone leaves invalid or unknown formats untouched", () => {
  assert.equal(normalizeLeadPhone("not-a-phone"), "not-a-phone");
  assert.equal(normalizeLeadPhone("12345"), "12345");
});

test("getWhatsAppNumber uses the configured value and falls back to the client number", () => {
  const previous = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  try {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "0727 256 939";
    assert.equal(getWhatsAppNumber(), "254727256939");

    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    assert.equal(getWhatsAppNumber(), "254727256939");
  } finally {
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    } else {
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = previous;
    }
  }
});
