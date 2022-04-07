/**
 * @jest-environment jsdom
 */

const request = require("supertest");
const script = require("../../client/script");

// tests //

test ('sendApiRequest function exists', () => {
expect(sendApiRequest()).toBeDefined();
});