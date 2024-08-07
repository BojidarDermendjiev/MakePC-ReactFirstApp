import React from "react";
import Main from "./Main";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

vi.mock("../../common/navigations", () => ({
  navigation: {
    getHomeUrl: () => "/",
    getAboutUrl: () => "/about",
    getDonationUrl: () => "/donation",
    getFeedBackUrl: () => "/feedback",
    getHardwareBlogUrl: () => "/hardware-blog",
    getCommentFromUrl: () => "/comment",
    getPaymentCardUrl: () => "/payment-card",
    getLoginUrl: () => "/login",
    getLogoutUrl: () => "/logout",
    getShopBasketUrl: () => "/shop-basket",
    getPageNotFoundUrl: () => "*",
  },
}));

vi.mock("../../pages/About/About", () => ({
  default: () => <div>About Page</div>,
}));
vi.mock("../../pages/Login/Login", () => ({
  default: () => <div>Login Page</div>,
}));
vi.mock("../../pages/HomePage/Home", () => ({
  default: () => <div>Home Page</div>,
}));
vi.mock("../../pages/Logout/Logout", () => ({
  default: () => <div>Logout Page</div>,
}));
vi.mock("../../pages/Feedback/Comment", () => ({
  default: () => <div>Comment Page</div>,
}));
vi.mock("../../pages/Feedback/Feedback", () => ({
  default: () => <div>Feedback Page</div>,
}));
vi.mock("../../pages/PageNotFound/NotFound", () => ({
  default: () => <div>NotFound Page</div>,
}));
vi.mock("../../pages/ShopBasket/ShopBasket", () => ({
  default: () => <div>ShopBasket Page</div>,
}));
vi.mock("../../pages/Feedback/edit/EditComment", () => ({
  default: () => <div>EditComment Page</div>,
}));
vi.mock("../../pages/Donation/PriceSelectior", () => ({
  default: () => <div>PriceSelectior Page</div>,
}));
vi.mock("../../pages/HardwareBlog/HardwareBlog", () => ({
  default: () => <div>HardwareBlog Page</div>,
}));
vi.mock("../../pages/Donation/PaymentCard", () => ({
  default: () => <div>PaymentCard Page</div>,
}));

describe("Main Component", () => {
  const renderWithRouter = (initialEntries) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Main />
      </MemoryRouter>
    );
  };

  it("renders Home component for default route", () => {
    renderWithRouter(["/"]);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders About component for /about route", () => {
    renderWithRouter(["/about"]);
    expect(screen.getByText("About Page")).toBeInTheDocument();
  });

  it("renders PriceSelectior component for /donation route", () => {
    renderWithRouter(["/donation"]);
    expect(screen.getByText("PriceSelectior Page")).toBeInTheDocument();
  });

  it("renders Feedback component for /feedback route", () => {
    renderWithRouter(["/feedback"]);
    expect(screen.getByText("Feedback Page")).toBeInTheDocument();
  });

  it("renders HardwareBlog component for /hardware-blog route", () => {
    renderWithRouter(["/hardware-blog"]);
    expect(screen.getByText("HardwareBlog Page")).toBeInTheDocument();
  });

  it("renders Comment component for /comment route", () => {
    renderWithRouter(["/comment"]);
    expect(screen.getByText("Comment Page")).toBeInTheDocument();
  });

  it("renders EditComment component for /comment/:commentId route", () => {
    renderWithRouter(["/comment/1"]);
    expect(screen.getByText("EditComment Page")).toBeInTheDocument();
  });

  it("renders PaymentCard component for /payment-card route", () => {
    renderWithRouter(["/payment-card"]);
    expect(screen.getByText("PaymentCard Page")).toBeInTheDocument();
  });

  it("renders Login component for /login route", () => {
    renderWithRouter(["/login"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders Logout component for /logout route", () => {
    renderWithRouter(["/logout"]);
    expect(screen.getByText("Logout Page")).toBeInTheDocument();
  });

  it("renders ShopBasket component for /shop-basket route", () => {
    renderWithRouter(["/shop-basket"]);
    expect(screen.getByText("ShopBasket Page")).toBeInTheDocument();
  });

  it("renders NotFound component for unknown route", () => {
    renderWithRouter(["/unknown"]);
    expect(screen.getByText("NotFound Page")).toBeInTheDocument();
  });
});
