import React from "react";
import Home from "./Home";
import i18n from "../../utils/i18n";
import { I18nextProvider } from "react-i18next";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";

describe("Home", () => {
  beforeEach(() => {
    i18n.changeLanguage("en");
  });

  it("renders the Home component with correct text and images", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <Home />
        </Router>
      </I18nextProvider>
    );

    expect(screen.getByText("Welcome to the MakePC!")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
    expect(screen.getByAltText("computer items")).toBeInTheDocument();
    expect(screen.getAllByAltText("razer img").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("amd img").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("intel img").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("nvidia img").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("msi img").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("asrock img").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("aorus img").length).toBeGreaterThan(0);
  });
});
