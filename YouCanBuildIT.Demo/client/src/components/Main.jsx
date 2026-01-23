import { Routes, Route } from "react-router-dom";
import { navigation } from "../common/navigations";

import About from "../pages/About";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Home from "../features/HomePage/Home";
import Logout from "../pages/Logout";
import Comment from "../features/Feedback/Comment";
import Feedback from "../features/Feedback/Feedback";
import NotFound from "../pages/NotFound";
import EditComment from "../features/Feedback/edit/EditComment";
import PriceSelectior from "../pages/Donation/PriceSelectior";
import HardwareBlog from "../pages/HardwareBlog";
import PaymentCard from "../pages/Donation/PaymentCard";
import SignUp from "../pages/Login/SignUp";
import ProductList from "../features/Product/ProductList";
import ProductCreate from "../features/Product/ProductCreate";
import ProductEdit from "../features/Product/ProductEdit";
import ProductDetails from "../features/Product/ProductDetails";
import ReviewCrudPage from "../features/Review/ReviewCrudPage";
import UserOrders from "../features/Order/UserOrders";
import OrderDetails from "../features/Order/OrderDetails";
import OrderForm from "../features/Order/OrderForm";
import BasketList from "../features/Basket/BasketList";
import BasketDetails from "../features/Basket/BasketDetails";
import BasketForm from "../features/Basket/BasketForm";
import CategoryList from "../features/Category/CategoryList";
import CategoryDetails from "../features/Category/CategoryDetails";
import CategoryForm from "../features/Category/CategoryForm";
import BrandList from "../features/Brand/BrandList";
import BrandDetails from "../features/Brand/BrandDetails";
import BrandForm from "../features/Brand/BrandForm";
import UserSettings from "../features/UserSettings/UserSettings";
import ShoppingCart from "../features/ShoppingCart/ShoppingCart";
import { Checkout, OrderSuccess } from "../features/Checkout";
import {
  SecondHandList,
  SecondHandDetails,
  SecondHandCreate,
  SecondHandEdit,
  MyListings,
} from "../features/SecondHand";
import {
  KeyboardsPage,
  KeyboardDetails,
  SwitchGuide,
  SizeGuide,
} from "../pages/Keyboards";
import {
  ForumHome,
  CategoryView,
  ThreadView,
  CreateThread,
} from "../pages/Forum";
import { NewsHome, NewsArticle } from "../pages/News";

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path={navigation.getHomeUrl()} element={<Home />} />
        <Route path={navigation.getAboutUrl()} element={<About />} />
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
        <Route path={navigation.getRegisterUrl()} element={<Register />} />
        <Route
          path={navigation.getUserSettingsUrl()}
          element={<UserSettings />}
        />
        <Route path={navigation.getRegisterUrl()} element={<SignUp />} />
        <Route path={navigation.getLogoutUrl()} element={<Logout />} />
        <Route path={navigation.getCommentFromUrl()} element={<Comment />} />
        <Route path={navigation.getProductsUrl()} element={<ProductList />} />
        <Route
          path={navigation.getProductCreateUrl()}
          element={<ProductCreate />}
        />
        <Route
          path={navigation.getProductEditUrl(":id")}
          element={<ProductEdit />}
        />
        <Route
          path={navigation.getProductDetailsUrl(":id")}
          element={<ProductDetails />}
        />
        <Route
          path={navigation.getReviewByIdUrl(":reviewId")}
          element={<ReviewCrudPage />}
        />
        <Route
          path={navigation.getProductReviewUrl(":id")}
          element={<ReviewCrudPage />}
        />
        <Route path={navigation.getOrdersUrl()} element={<UserOrders />} />
        <Route path={navigation.getOrderCreateUrl()} element={<OrderForm />} />
        <Route
          path={navigation.getOrderEditUrl(":id")}
          element={<OrderForm isEdit={true} />}
        />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path={navigation.getCheckoutUrl()} element={<Checkout />} />
        <Route
          path={navigation.getOrderSuccessUrl(":orderId")}
          element={<OrderSuccess />}
        />
        <Route
          path={navigation.getShopBasketUrl()}
          element={<BasketList forCurrentUser={true} />}
        />
        <Route path={navigation.getBasketsUrl()} element={<BasketList />} />
        <Route
          path={navigation.getBasketDetailsUrl(":id")}
          element={<BasketDetails />}
        />
        <Route
          path={navigation.getBasketCreateUrl()}
          element={<BasketForm />}
        />
        <Route
          path={navigation.getBasketEditUrl(":id")}
          element={<BasketForm isEdit={true} />}
        />
        <Route
          path={navigation.getOrderDetailsUrl(":id")}
          element={<OrderDetails />}
        />
        <Route
          path={navigation.getCategoriesUrl()}
          element={<CategoryList />}
        />
        <Route
          path={navigation.getCategoryCreateUrl()}
          element={<CategoryForm />}
        />
        <Route
          path={navigation.getCategoryEditUrl(":id")}
          element={<CategoryForm isEdit={true} />}
        />
        <Route
          path={navigation.getCategoryDetailsUrl(":id")}
          element={<CategoryDetails />}
        />
        <Route path={navigation.getBrandsUrl()} element={<BrandList />} />
        <Route path={navigation.getBrandCreateUrl()} element={<BrandForm />} />
        <Route
          path={navigation.getBrandEditUrl(":id")}
          element={<BrandForm isEdit={true} />}
        />
        <Route
          path={navigation.getBrandDetailsUrl(":id")}
          element={<BrandDetails />}
        />
        {/* Keyboard Section Routes */}
        <Route path="/keyboards" element={<KeyboardsPage />} />
        <Route path="/keyboards/switch-guide" element={<SwitchGuide />} />
        <Route path="/keyboards/size-guide" element={<SizeGuide />} />
        <Route path="/keyboards/:id" element={<KeyboardDetails />} />
        {/* SecondHand Marketplace Routes */}
        <Route path="/secondhand" element={<SecondHandList />} />
        <Route path="/secondhand/create" element={<SecondHandCreate />} />
        <Route path="/secondhand/my-listings" element={<MyListings />} />
        <Route path="/secondhand/edit/:id" element={<SecondHandEdit />} />
        <Route path="/secondhand/:id" element={<SecondHandDetails />} />
        {/* Forum Routes */}
        <Route path="/forum" element={<ForumHome />} />
        <Route path="/forum/category/:slug" element={<CategoryView />} />
        <Route path="/forum/thread/:id" element={<ThreadView />} />
        <Route path="/forum/create" element={<CreateThread />} />
        {/* News Routes */}
        <Route path="/news" element={<NewsHome />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path={navigation.getPageNotFoundUrl()} element={<NotFound />} />
      </Routes>
    </main>
  );
}
