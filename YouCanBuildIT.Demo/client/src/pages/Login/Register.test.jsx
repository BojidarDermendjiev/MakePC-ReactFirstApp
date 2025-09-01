
import Register from "./Register";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockRegister = vi.fn();
vi.mock("../../api/authentication.js", () => ({
  register: mockRegister,
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Register", () => {
  it("calls setUser and navigates on successful sign-up", async () => {
    mockRegister.mockResolvedValueOnce({});
    const setUser = vi.fn();

    render(
      <Router>
        <AuthContext.Provider value={{ setUser }}>
          <Register />
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("authenticator.fullName"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("authenticator.email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("authenticator.password"), {
      target: { value: "password123" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("authenticator.confirmPassword"),
      {
        target: { value: "password123" },
      }
    );

    fireEvent.click(screen.getByText("authenticator.createAccount"));

    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows AlreadyExist modal when user already exists", async () => {
    mockRegister.mockRejectedValueOnce({
      message: "A user with this email already exists.",
    });
    render(
      <Router>
        <AuthContext.Provider value={{ setUser: vi.fn() }}>
          <Register />
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("authenticator.fullName"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("authenticator.email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("authenticator.password"), {
      target: { value: "password123" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("authenticator.confirmPassword"),
      {
        target: { value: "password123" },
      }
    );

    fireEvent.click(screen.getByText("authenticator.createAccount"));

    await waitFor(() => {
      expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
    });
  });
});
