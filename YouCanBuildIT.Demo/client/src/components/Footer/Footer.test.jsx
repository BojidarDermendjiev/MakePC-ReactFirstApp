import React from "react";
import Footer from "./Footer";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("../../common/youtobe", () => ({
  navigationYoutobeVideo: {
    getIntoVideoUrl: vi.fn().mockReturnValue("dQw4w9WgXcQ"),
  },
}));

describe("Footer Component", () => {
  it("renders contact information", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("footer.contacts")).toBeInTheDocument();
    expect(screen.getByText("footer.support")).toBeInTheDocument();
    expect(screen.getByText("footer.supportEmail")).toBeInTheDocument();
    expect(screen.getByText("footer.sales")).toBeInTheDocument();
    expect(screen.getByText("footer.salesEmail")).toBeInTheDocument();
    expect(screen.getByText("footer.salesPhone")).toBeInTheDocument();
  });

  it("renders YouTube video iframe", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("renders social media links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: /instagram/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /youtube/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
  });
});
