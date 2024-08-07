import React from "react";
import { vi } from "vitest";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { LanguageContext } from "../../context/LanguageContext";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("../../API/authentication", () => ({
  logout: vi.fn(),
}));

describe("Header Component", () => {
  const mockSetUser = vi.fn();
  const mockChangeLanguage = vi.fn();

  const renderHeader = (user = null) => {
    render(
      <AuthContext.Provider value={{ user, setUser: mockSetUser }}>
        <LanguageContext.Provider
          value={{ changeLanguage: mockChangeLanguage }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    );
  };

  it("renders the header with navigation links", () => {
    renderHeader();
    expect(screen.getByAltText("homepage")).toBeInTheDocument();
    expect(screen.getByText("header.about")).toBeInTheDocument();
    expect(screen.getByText("header.forum")).toBeInTheDocument();
    expect(screen.getByText("header.reviews")).toBeInTheDocument();
    expect(screen.getByText("header.language")).toBeInTheDocument();
  });

  it("shows and hides the language dropdown", () => {
    renderHeader();
    const languageLink = screen.getByText("header.language");
    fireEvent.mouseEnter(languageLink);
    expect(screen.getByText("English(EN-ES)")).toBeInTheDocument();
    fireEvent.mouseLeave(languageLink);
    expect(screen.queryByText("English(EN-ES)")).not.toBeInTheDocument();
  });

  it("calls changeLanguage when a language is selected", () => {
    renderHeader();
    const languageLink = screen.getByText("header.language");
    fireEvent.mouseEnter(languageLink);
    fireEvent.click(screen.getByText("English(EN-ES)"));
    expect(mockChangeLanguage).toHaveBeenCalledWith("en", expect.any(Function));
  });

  it("renders sign in link when user is not logged in", () => {
    renderHeader();
    expect(screen.getByText("header.signIn")).toBeInTheDocument();
  });

  it("renders sign out link when user is logged in", () => {
    renderHeader({ name: "Test User" });
    expect(screen.getByText("header.signOut")).toBeInTheDocument();
  });

  it("calls logout and navigates to logout URL on sign out", async () => {
    const mockLogout = require("../../API/authentication").logout;
    renderHeader({ name: "Test User" });
    fireEvent.click(screen.getByText("header.signOut"));
    expect(mockLogout).toHaveBeenCalledWith(mockSetUser);
  });
});
