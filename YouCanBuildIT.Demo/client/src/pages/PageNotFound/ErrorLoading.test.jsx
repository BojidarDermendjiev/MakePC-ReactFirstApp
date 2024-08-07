import React from "react";
import i18n from "../../utils/i18n";
import ErrorLoading from "./ErrorLoading";
import { I18nextProvider } from "react-i18next";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

describe("ErrorLoading", () => {
  beforeEach(() => {
    i18n.changeLanguage("en");
  });

  it("renders the ErrorLoading component with correct text", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorLoading />
      </I18nextProvider>
    );

    expect(screen.getByText("Error Loading Comments")).toBeInTheDocument();
    expect(
      screen.getByText(
        "There was an error loading the comments. Please try again later."
      )
    ).toBeInTheDocument();
  });
});
