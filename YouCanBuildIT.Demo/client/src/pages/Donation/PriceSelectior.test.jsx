import i18n from "../../utils/i18n";
import { describe, it, expect } from "vitest";
import PriceSelectior from "./PriceSelectior";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("PriceSelectior", () => {
  it("renders the pricing cards with correct text", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <PriceSelectior />
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(
      screen.getByText((content, element) => content.includes("Две кафета"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        const hasDollarSign = content.includes("$");
        const hasFive = content.includes("5");
        return hasDollarSign && hasFive;
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => content.includes("Цял бюфет"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        const hasDollarSign = content.includes("$");
        const hasTen = content.includes("10");
        return hasDollarSign && hasTen;
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => content.includes("Издръжка"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        const hasDollarSign = content.includes("$");
        const hasTwenty = content.includes("20");
        return hasDollarSign && hasTwenty;
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText((content, element) => content.includes("дарете"))
    ).toHaveLength(3);
  });
});
