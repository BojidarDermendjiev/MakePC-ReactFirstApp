import React from "react";
import { Routes, Route } from "react-router-dom";
import { navigation } from "../../context/common/navigations";

import Home from "../../pages/HomePage/Home";
import About from "../../pages/About/About";
import BuildComposition from "../../pages/BuildComposition/BuildComposition";
import Donation from "../../pages/Donation/Donation";
import Feedback from "../../pages/Feedback/Feedback";
import HardwareBlog from "../../pages/HardwareBlog/HardwareBlog";
import SignUp from "../../pages/SignUp/SignUp";
import Logout from "../../pages/Logout/Logout";
import ShopBasket from "../../pages/ShopBasket/ShopBasket";
import NotFound from "../../pages/PageNotFound/NotFound";
import SignIn from "../../pages/SignIn/SignIn";

export default function Main() {
  return (
    <>
      <main>
        <Routes>
          <Route path={navigation.getHomeUrl()} element={<Home />} />
          <Route path={navigation.getAboutUrl()} element={<About />} />
          <Route
            path={navigation.getBuildCompositionUrl()}
            element={<BuildComposition />}
          />
          <Route path={navigation.getDonationUrl()} element={<Donation />} />
          <Route path={navigation.getFeedBackUrl()} element={<Feedback />} />
          <Route
            path={navigation.getHardwareBlogUrl()}
            element={<HardwareBlog />}
          />
          <Route path={navigation.getSignUpUrl()} element={<SignUp />} />
          <Route path={navigation.getSignInUrl()} element={<SignIn />} />
          <Route path={navigation.getLogoutUrl()} element={<Logout />} />
          <Route
            path={navigation.getShopBasketUrl()}
            element={<ShopBasket />}
          />
          <Route
            path={navigation.getPageNotFoundUrl()}
            element={<NotFound />}
          />
        </Routes>
      </main>
    </>
  );
}
