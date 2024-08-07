import React from "react";
import SignUp from "./SignUp";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("SignUp", () => {
  const mockHandleSubmit = vi.fn();
  const mockHandleChange = vi.fn();
  const mockHandleBlur = vi.fn();

  const defaultProps = {
    handleSubmit: mockHandleSubmit,
    handleChange: mockHandleChange,
    handleBlur: mockHandleBlur,
    values: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
    touched: {},
    isSubmitting: false,
  };

  it("renders the SignUp form", () => {
    render(<SignUp {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("authenticator.name")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("authenticator.email")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("authenticator.password")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("authenticator.confirmPassword")
    ).toBeInTheDocument();
    expect(screen.getByText("authenticator.signUp")).toBeInTheDocument();
  });

  it("displays error messages when fields are touched and have errors", () => {
    const errorProps = {
      ...defaultProps,
      errors: {
        name: "Name is required",
        email: "Email is invalid",
        password: "Password is too short",
        confirmPassword: "Passwords do not match",
      },
      touched: {
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      },
    };

    render(<SignUp {...errorProps} />);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    expect(screen.getByText("Password is too short")).toBeInTheDocument();
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("calls handleChange when input values change", () => {
    render(<SignUp {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("authenticator.name"), {
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

    expect(mockHandleChange).toHaveBeenCalledTimes(4);
  });

  it("calls handleSubmit when the button is clicked", () => {
    render(<SignUp {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: "authenticator.signUp" })
    );

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
