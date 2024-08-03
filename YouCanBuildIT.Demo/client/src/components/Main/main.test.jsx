import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Main from "./Main";
import { navigation } from "../../context/common/navigations";

test("renders all routes correctly", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={[navigation.getHomeUrl()]}>
      <Main />
    </MemoryRouter>
  );

  expect(getByText(/Home/i)).toBeInTheDocument();
  expect(getByText(/About/i)).toBeInTheDocument();
  expect(getByText(/Build Composition/i)).toBeInTheDocument();
  expect(getByText(/Donation/i)).toBeInTheDocument();
  expect(getByText(/Feedback/i)).toBeInTheDocument();
  expect(getByText(/Hardware Blog/i)).toBeInTheDocument();
  expect(getByText(/Comment/i)).toBeInTheDocument();
  expect(getByText(/Login/i)).toBeInTheDocument();
  expect(getByText(/Logout/i)).toBeInTheDocument();
  expect(getByText(/Shop Basket/i)).toBeInTheDocument();
  expect(getByText(/Not Found/i)).toBeInTheDocument();
});
