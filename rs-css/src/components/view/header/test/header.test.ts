import { describe, expect, test } from '@jest/globals';
import Header from "../header";

const header = new Header();

describe('Header test', () => {
  test('checking header is not null', () => {
    expect(header.createHeaderNode()).not.toBeNull();
  });
});
