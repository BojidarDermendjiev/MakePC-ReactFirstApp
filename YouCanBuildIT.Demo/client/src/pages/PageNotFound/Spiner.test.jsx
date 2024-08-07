import Spiner from "./Spiner";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../../assets/styles/loading.module.css", () => ({
  default: {
    loaderContainer: "loaderContainer",
    gear: "gear",
    gear1: "gear1",
    gear2: "gear2",
  },
}));

describe("Spiner", () => {
  it("renders the Spiner component with gears", () => {
    render(<Spiner />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    images.forEach((img) => {
      expect(img).toHaveAttribute(
        "src",
        "https://assets.codepen.io/6093409/gear.svg.png"
      );
      expect(img).toHaveAttribute("alt", "an illustration of a gear");
    });

    const container = images[0].parentElement.parentElement;
    expect(container).toHaveClass("loaderContainer");
  });
});
