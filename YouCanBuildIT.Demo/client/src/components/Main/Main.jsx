import { Routes, Route } from "react-router-dom";
import { navigation } from "../../common/navigations";

import About from "../../pages/About/About";
import Login from "../../pages/Login/Login";
import Home from "../../pages/HomePage/Home";
import Logout from "../../pages/Logout/Logout";
import Comment from "../../pages/Feedback/Comment";
import Feedback from "../../pages/Feedback/Feedback";
import NotFound from "../../pages/PageNotFound/NotFound";
import ShopBasket from "../../pages/ShopBasket/ShopBasket";
import EditComment from "../../pages/Feedback/edit/EditComment";
import PriceSelectior from "../../pages/Donation/PriceSelectior";
import HardwareBlog from "../../pages/HardwareBlog/HardwareBlog";
import BuildComposition from "../../pages/BuildComposition/BuildComposition";
import PaymentCard from "../../pages/Donation/PaymentCard";

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
        <Route
          path={navigation.getDonationUrl()}
          element={<PriceSelectior />}
        />
        <Route path={navigation.getFeedBackUrl()} element={<Feedback />} />
        <Route
          path={navigation.getHardwareBlogUrl()}
          element={<HardwareBlog />}
        />
        <Route path={navigation.getCommentFromUrl()} element={<Comment />} />
        <Route
          path={`${navigation.getCommentFromUrl()}/:commentId`}
          element={<EditComment />}
        />
        <Route
          path={navigation.getPaymentCardUrl()}
          element={<PaymentCard />}
        />
        <Route path={navigation.getLoginUrl()} element={<Login />} />
        <Route path={navigation.getLogoutUrl()} element={<Logout />} />
        <Route path={navigation.getShopBasketUrl()} element={<ShopBasket />} />
        <Route path={navigation.getCommentFromUrl()} element={<Comment />} />
        <Route path={navigation.getPageNotFoundUrl()} element={<NotFound />} />
      </Routes>
    </main>
  );
}
