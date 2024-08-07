import React from "react";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import { createComment } from "../../API/comments";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthContext } from "../../context/AuthContextProvider";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../API/comments", () => ({
  createComment: vi.fn(),
}));

vi.mock("../../context/AuthContextProvider", () => ({
  AuthContext: {
    Consumer: ({ children }) => children({ user: { _id: "user123" } }),
  },
}));

vi.mock("./Stars", () => ({
  __esModule: true,
  default: ({ rating, setRating }) => (
    <div data-testid="stars">
      <button onClick={() => setRating(rating + 1)}>Increase Rating</button>
    </div>
  ),
}));

describe("Comment", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
  });

  it("renders the Comment form", () => {
    render(
      <AuthContext.Provider value={{ user: { _id: "user123" } }}>
        <Comment />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Leave a Comment")).toBeInTheDocument();
    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("updates comment and rating state on input change", () => {
    render(
      <AuthContext.Provider value={{ user: { _id: "user123" } }}>
        <Comment />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "This is a test comment" },
    });
    fireEvent.click(screen.getByText("Increase Rating"));

    expect(screen.getByLabelText("Comment").value).toBe(
      "This is a test comment"
    );
    expect(screen.getByTestId("stars").textContent).toContain(
      "Increase Rating"
    );
  });

  it("calls createComment and navigates on form submit", async () => {
    createComment.mockResolvedValueOnce({});

    render(
      <AuthContext.Provider value={{ user: { _id: "user123" } }}>
        <Comment />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "This is a test comment" },
    });
    fireEvent.click(screen.getByText("Increase Rating"));
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(createComment).toHaveBeenCalledWith("user123", {
      comment: "This is a test comment",
      review: 1,
    });
    expect(navigate).toHaveBeenCalledWith("/feedback");
  });

  it("handles errors during comment creation", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    createComment.mockRejectedValueOnce(new Error("Failed to create comment"));

    render(
      <AuthContext.Provider value={{ user: { _id: "user123" } }}>
        <Comment />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "This is a test comment" },
    });
    fireEvent.click(screen.getByText("Increase Rating"));
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(createComment).toHaveBeenCalledWith("user123", {
      comment: "This is a test comment",
      review: 1,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to create comment:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
