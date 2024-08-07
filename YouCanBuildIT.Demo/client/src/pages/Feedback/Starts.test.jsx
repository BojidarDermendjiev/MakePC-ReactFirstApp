import Stars from "./Stars";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("../../assets/styles/comment.module.css", () => ({
  default: {
    rating: "rating",
    "star-button": "star-button",
    "star-button-blank": "star-button-blank",
    star: "star",
  },
}));

describe("Stars Component", () => {
  it("renders 5 stars", () => {
    render(<Stars rating={0} setRating={() => {}} />);

    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);
  });

  it("applies the correct class based on rating", () => {
    render(<Stars rating={3} setRating={() => {}} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveClass("star-button");
    expect(buttons[1]).toHaveClass("star-button");
    expect(buttons[2]).toHaveClass("star-button");
    expect(buttons[3]).toHaveClass("star-button-blank");
    expect(buttons[4]).toHaveClass("star-button-blank");
  });

  it("calls setRating with the correct value when a star is clicked", () => {
    const mockSetRating = vi.fn();
    render(<Stars rating={0} setRating={mockSetRating} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);

    expect(mockSetRating).toHaveBeenCalledWith(3);
  });
});
