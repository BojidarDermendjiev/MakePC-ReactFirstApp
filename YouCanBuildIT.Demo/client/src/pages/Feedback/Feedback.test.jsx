import Feedback from "./Feedback";
import useFetch from "../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../context/AuthContextProvider";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(),
}));

vi.mock("../../hooks/useFetch", () => ({
  default: vi.fn(),
}));

vi.mock("../PageNotFound/ErrorLoading", () => ({
  default: vi.fn(() => <div>ErrorLoading Component</div>),
}));

vi.mock("../PageNotFound/Spiner", () => ({
  default: vi.fn(() => <div>Spiner Component</div>),
}));

vi.mock("./Review", () => ({
  default: vi.fn(() => <div>Review Component</div>),
}));

describe("Feedback Component", () => {
  it("renders ErrorLoading component when there is an error", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: true,
      triggerRefreshHandler: vi.fn(),
    });
    useTranslation.mockReturnValue({ t: (key) => key });

    render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Feedback />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("ErrorLoading Component")).toBeInTheDocument();
  });

  it("renders Spiner component when data is loading", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: false,
      triggerRefreshHandler: vi.fn(),
    });
    useTranslation.mockReturnValue({ t: (key) => key });

    render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Feedback />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Spiner Component")).toBeInTheDocument();
  });

  it("renders Review components when data is fetched", () => {
    useFetch.mockReturnValue({
      data: {
        client1: {
          _id: "1",
          email: "client1@example.com",
          comments: {
            comment1: {
              commentId: "c1",
              comment: "Great service!",
              review: 5,
            },
          },
        },
      },
      loading: false,
      error: false,
      triggerRefreshHandler: vi.fn(),
    });
    useTranslation.mockReturnValue({ t: (key) => key });

    render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Feedback />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Review Component")).toBeInTheDocument();
  });

  it("renders comment link when user is logged in", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: false,
      triggerRefreshHandler: vi.fn(),
    });
    useTranslation.mockReturnValue({ t: (key) => key });

    render(
      <AuthContext.Provider value={{ user: { name: "testUser" } }}>
        <MemoryRouter>
          <Feedback />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("feedback.comment")).toBeInTheDocument();
  });
});
