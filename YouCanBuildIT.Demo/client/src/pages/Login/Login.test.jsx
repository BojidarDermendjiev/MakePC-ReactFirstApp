import React from "react";
import Login from "./Login";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock the useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock the authentication API
vi.mock("../../API/authentication", () => ({
  login: vi.fn(),
  register: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login", () => {
  it("calls setUser and navigates on successful sign-up", async () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setUser: vi.fn() }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("authenticator.email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("authenticator.password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("authenticator.signIn"));

    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});
