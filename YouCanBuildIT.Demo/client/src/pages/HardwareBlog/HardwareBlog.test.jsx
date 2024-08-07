import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import HardwareBlog from "./HardwareBlog";
import i18n from "../../utils/i18n";
import { navigation } from "../../common/navigations";

// Mock the react-i18next module
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key) => key,
    }),
  };
});

// Mock the navigation object
vi.mock("../../common/navigations", () => ({
  navigation: {
    getInvidiaUrl: () => "https://example.com/invidia",
    getIntel13GenUrl: () => "https://example.com/intel13gen",
    getRamDDR5Url: () => "https://example.com/ramddr5",
    getSSDsUrl: () => "https://example.com/ssds",
  },
}));

describe("HardwareBlog", () => {
  beforeEach(() => {
    i18n.changeLanguage("en");
  });

  it("renders the HardwareBlog component with correct text and images", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <HardwareBlog />
        </Router>
      </I18nextProvider>
    );

    expect(screen.getByText("forum.header")).toBeInTheDocument();
    expect(screen.getByText("forum.gpuNews")).toBeInTheDocument();
    expect(screen.getByText("forum.cpuNews")).toBeInTheDocument();
    expect(screen.getByText("ramNews")).toBeInTheDocument();
    expect(screen.getByText("forum.otherHardwareNews")).toBeInTheDocument();

    expect(screen.getAllByAltText("GPU").length).toBe(4);

    expect(screen.getByText("forum.gpuDescription")).toBeInTheDocument();
    expect(screen.getByText("forum.cpuDescription")).toBeInTheDocument();
    expect(screen.getByText("forum.ramDescription")).toBeInTheDocument();
    expect(
      screen.getByText("forum.otherHardwareDescription")
    ).toBeInTheDocument();

    expect(screen.getAllByText("forum.readMore").length).toBe(4);
  });
});
