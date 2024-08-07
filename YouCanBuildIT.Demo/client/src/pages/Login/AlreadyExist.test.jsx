import React from "react";
import UserExistsModal from "./AlreadyExist";
import { describe, it, expect, vi } from "vitest";

import { render, screen, fireEvent } from "@testing-library/react";

// Mock the useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("UserExistsModal", () => {
  it("does not render when show is false", () => {
    render(<UserExistsModal show={false} onClose={() => {}} />);
    expect(screen.queryByText("userExistsModal.title")).toBeNull();
  });

  it("renders correctly when show is true", () => {
    render(<UserExistsModal show={true} onClose={() => {}} />);
    expect(screen.getByText("userExistsModal.title")).toBeInTheDocument();
    expect(screen.getByText("userExistsModal.message")).toBeInTheDocument();
    expect(screen.getByText("userExistsModal.closeButton")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<UserExistsModal show={true} onClose={onClose} />);
    fireEvent.click(screen.getByText("userExistsModal.closeButton"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when the overlay is clicked", () => {
    const onClose = vi.fn();
    render(<UserExistsModal show={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when the modal content is clicked", () => {
    const onClose = vi.fn();
    render(<UserExistsModal show={true} onClose={onClose} />);
    fireEvent.click(screen.getByText("userExistsModal.title"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
