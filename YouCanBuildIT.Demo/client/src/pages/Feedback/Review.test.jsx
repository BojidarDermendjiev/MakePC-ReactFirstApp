import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { deleteComment } from "../../API/comments";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../API/comments", () => ({
  deleteComment: vi.fn(),
}));

vi.mock("../../common/navigations", () => ({
  navigation: {
    getCommentFromUrl: vi.fn(() => "/comment"),
  },
}));

vi.mock("./Stars", () => ({
  default: vi.fn(() => <div>Stars Component</div>),
}));

describe("Review Component", () => {
  const mockTriggerRefreshHandler = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders review details correctly", () => {
    render(
      <MemoryRouter>
        <Review
          loggedInUser={{ email: "owner@example.com" }}
          email="owner@example.com"
          comment="Great service!"
          review={5}
          _id="1"
          commentId="c1"
          triggerRefreshHandler={mockTriggerRefreshHandler}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("owner@example.com")).toBeInTheDocument();
    expect(screen.getByText("Great service!")).toBeInTheDocument();
    expect(screen.getByText("Stars Component")).toBeInTheDocument();
  });

  it("shows edit and delete buttons for the owner", () => {
    render(
      <MemoryRouter>
        <Review
          loggedInUser={{ email: "owner@example.com" }}
          email="owner@example.com"
          comment="Great service!"
          review={5}
          _id="1"
          commentId="c1"
          triggerRefreshHandler={mockTriggerRefreshHandler}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("does not show edit and delete buttons for non-owner", () => {
    render(
      <MemoryRouter>
        <Review
          loggedInUser={{ email: "notowner@example.com" }}
          email="owner@example.com"
          comment="Great service!"
          review={5}
          _id="1"
          commentId="c1"
          triggerRefreshHandler={mockTriggerRefreshHandler}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("calls deleteComment and triggerRefreshHandler on delete button click", async () => {
    deleteComment.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Review
          loggedInUser={{ email: "owner@example.com" }}
          email="owner@example.com"
          comment="Great service!"
          review={5}
          _id="1"
          commentId="c1"
          triggerRefreshHandler={mockTriggerRefreshHandler}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(deleteComment).toHaveBeenCalledWith("1", "c1");
    });
    await waitFor(() => {
      expect(mockTriggerRefreshHandler).toHaveBeenCalled();
    });
  });

  it("navigates to edit comment page on edit button click", () => {
    render(
      <MemoryRouter>
        <Review
          loggedInUser={{ email: "owner@example.com" }}
          email="owner@example.com"
          comment="Great service!"
          review={5}
          _id="1"
          commentId="c1"
          triggerRefreshHandler={mockTriggerRefreshHandler}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(mockNavigate).toHaveBeenCalledWith("/comment/c1", {
      state: { comment: "Great service!", review: 5 },
    });
  });
});
