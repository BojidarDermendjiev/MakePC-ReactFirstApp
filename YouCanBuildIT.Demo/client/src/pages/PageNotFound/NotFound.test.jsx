import NotFound from "./NotFound";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("NotFound", () => {
  it("renders the NotFound component with correct text", () => {
    render(<NotFound />);

    expect(screen.getByText("Error 404: Not Found")).toBeInTheDocument();
  });
});
