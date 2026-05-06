import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Ensure DOM is cleaned up between tests to prevent state leakage.
afterEach(() => {
  cleanup();
});
