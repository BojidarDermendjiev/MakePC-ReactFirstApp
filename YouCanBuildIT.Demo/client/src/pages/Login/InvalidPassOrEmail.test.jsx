import React from "react";
import { describe, it, expect, vi } from "vitest";
import InvalidPassOrEmailModal from "./InvalidPassOrEmail";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("InvalidPassOrEmailModal", () => {
  it("does not render when show is false", () => {
    render(<InvalidPassOrEmailModal show={false} onClose={() => {}} />);
    expect(screen.queryByText("invalidPassOrEmailModal.title")).toBeNull();
  });

  it("renders correctly when show is true", () => {
    render(<InvalidPassOrEmailModal show={true} onClose={() => {}} />);
    expect(
      screen.getByText("invalidPassOrEmailModal.title")
    ).toBeInTheDocument();
    expect(
      screen.getByText("invalidPassOrEmailModal.message")
    ).toBeInTheDocument();
    expect(
      screen.getByText("invalidPassOrEmailModal.closeButton")
    ).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<InvalidPassOrEmailModal show={true} onClose={onClose} />);
    fireEvent.click(screen.getByText("invalidPassOrEmailModal.closeButton"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when the overlay is clicked", () => {
    const onClose = vi.fn();
    render(<InvalidPassOrEmailModal show={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when the modal content is clicked", () => {
    const onClose = vi.fn();
    render(<InvalidPassOrEmailModal show={true} onClose={onClose} />);
    fireEvent.click(screen.getByText("invalidPassOrEmailModal.title"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
