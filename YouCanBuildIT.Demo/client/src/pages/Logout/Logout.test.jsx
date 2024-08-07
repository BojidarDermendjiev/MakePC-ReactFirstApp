import Logout from "./Logout";
import i18n from "../../utils/i18n";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key) => key,
    }),
  };
});

vi.mock("../../common/navigations", () => ({
  navigation: {
    getHomeUrl: () => "/home",
  },
}));

describe("Logout", () => {
  it("renders the Logout component with translated text", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Logout />
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(screen.getByText("logout.title")).toBeInTheDocument();
    expect(screen.getByText("logout.home")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });
});
