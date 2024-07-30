import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../../pages/About/About";
import Login from "../../pages/Login/Login";
import Home from "../../pages/HomePage/Home";
import Logout from "../../pages/Logout/Logout";
import Feedback from "../../pages/Feedback/Feedback";
import Donation from "../../pages/Donation/Donation";
import NotFound from "../../pages/PageNotFound/NotFound";
import ShopBasket from "../../pages/ShopBasket/ShopBasket";
import HardwareBlog from "../../pages/HardwareBlog/HardwareBlog";
import BuildComposition from "../../pages/BuildComposition/BuildComposition";
import { navigation } from "../../context/common/navigations";

export default function Main() {
  return (
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

        <Route path={navigation.getLoginUrl()} element={<Login />} />
        <Route path={navigation.getLogoutUrl()} element={<Logout />} />
        <Route path={navigation.getShopBasketUrl()} element={<ShopBasket />} />
        <Route path={navigation.getPageNotFoundUrl()} element={<NotFound />} />
      </Routes>
    </main>
  );
}
