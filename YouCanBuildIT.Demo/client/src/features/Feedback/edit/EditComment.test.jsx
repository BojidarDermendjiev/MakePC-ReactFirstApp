import i18n from "../../../utils/i18n";
import EditComment from "./EditComment";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { editComment, getCommentById } from "../../../API/comments";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock("../../../API/comments", () => ({
  editComment: vi.fn(),
  getCommentById: vi.fn(),
}));

describe("EditComment", () => {
  const mockNavigate = vi.fn();
  const mockUser = { id: 1, name: "Test User" };
  const mockCommentId = "123";
  const mockLocationState = { comment: "Test comment", review: 4 };

  beforeEach(() => {
    const { useNavigate, useParams, useLocation } = require("react-router-dom");
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ commentId: mockCommentId });
    useLocation.mockReturnValue({ state: mockLocationState });
  });

  it("renders the EditComment component with initial data", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AuthContext.Provider value={{ user: mockUser }}>
          <MemoryRouter>
            <EditComment />
          </MemoryRouter>
        </AuthContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByText("Edit Comment")).toBeInTheDocument();
    expect(screen.getByLabelText("Comment")).toHaveValue("Test comment");
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("submits the edited comment", async () => {
    editComment.mockResolvedValueOnce({});
    render(
      <I18nextProvider i18n={i18n}>
        <AuthContext.Provider value={{ user: mockUser }}>
          <MemoryRouter>
            <EditComment />
          </MemoryRouter>
        </AuthContext.Provider>
      </I18nextProvider>
    );

    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "Updated comment" },
    });
    fireEvent.click(screen.getByText("Submit"));

    expect(editComment).toHaveBeenCalledWith(mockCommentId, mockUser, {
      comment: "Updated comment",
      review: 4,
    });
    expect(mockNavigate).toHaveBeenCalledWith(navigation.getFeedBackUrl());
  });

  it("displays an error message if editing the comment fails", async () => {
    editComment.mockRejectedValueOnce(new Error("Failed to edit comment"));
    render(
      <I18nextProvider i18n={i18n}>
        <AuthContext.Provider value={{ user: mockUser }}>
          <MemoryRouter>
            <EditComment />
          </MemoryRouter>
        </AuthContext.Provider>
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(
      await screen.findByText("Failed to edit comment.")
    ).toBeInTheDocument();
  });

  it("loads comment data if not provided in location state", async () => {
    const { useLocation } = require("react-router-dom");
    useLocation.mockReturnValue({ state: null });
    getCommentById.mockResolvedValueOnce({
      comment: "Loaded comment",
      review: 3,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <AuthContext.Provider value={{ user: mockUser }}>
          <MemoryRouter>
            <EditComment />
          </MemoryRouter>
        </AuthContext.Provider>
      </I18nextProvider>
    );

    expect(await screen.findByLabelText("Comment")).toHaveValue(
      "Loaded comment"
    );
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
