import React from "react";
import { vi } from "vitest";
import About from "./About";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: ({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    MemoryRouter: actual.MemoryRouter,
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("../../common/navigations", () => ({
  navigation: {
    getMicrosoftUrl: () => "https://www.microsoft.com",
    getLinuxUrl: () => "https://www.linux.org",
    getIOSUrl: () => "https://www.apple.com/ios",
  },
}));

describe("About Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  });

  it("renders the main title", () => {
    expect(screen.getByText("about.title")).toBeInTheDocument();
  });

  it("renders the introduction section", () => {
    expect(screen.getByText("about.titleIntroduction")).toBeInTheDocument();
    expect(screen.getByText("about.description")).toBeInTheDocument();
  });

  it("renders the hardware components list", () => {
    expect(screen.getByText("about.components.cpu")).toBeInTheDocument();
    expect(
      screen.getByText("about.components.motherboard")
    ).toBeInTheDocument();
    expect(screen.getByText("about.components.ram")).toBeInTheDocument();
    expect(screen.getByText("about.components.storage")).toBeInTheDocument();
    expect(screen.getByText("about.components.psu")).toBeInTheDocument();
    expect(
      screen.getByText("about.components.graphicsCard")
    ).toBeInTheDocument();
    expect(screen.getByText("about.components.case")).toBeInTheDocument();
    expect(
      screen.getByText("about.components.coolingSystem")
    ).toBeInTheDocument();
  });

  it("renders the OS links", () => {
    expect(screen.getByAltText("windows logo").closest("a")).toHaveAttribute(
      "href",
      "https://www.microsoft.com"
    );
    expect(screen.getByAltText("linux logo").closest("a")).toHaveAttribute(
      "href",
      "https://www.linux.org"
    );
    expect(screen.getByAltText("ios logo").closest("a")).toHaveAttribute(
      "href",
      "https://www.apple.com/ios"
    );
  });
});
