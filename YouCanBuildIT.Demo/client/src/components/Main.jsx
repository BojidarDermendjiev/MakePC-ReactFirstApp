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
import { BuilderWizard, MyBuilds, PublicBuilds } from "../features/Builder";
import { ComparisonPage } from "../features/Comparison";

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

        {/* Products */}
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

        {/* Reviews */}
        <Route
          path={navigation.getReviewByIdUrl(":reviewId")}
          element={<ReviewCrudPage />}
        />
        <Route
          path={navigation.getProductReviewUrl(":id")}
          element={<ReviewCrudPage />}
        />

        {/* Orders */}
        <Route path={navigation.getOrdersUrl()} element={<UserOrders />} />
        <Route path={navigation.getOrderCreateUrl()} element={<OrderForm />} />
        <Route
          path={navigation.getOrderEditUrl(":id")}
          element={<OrderForm isEdit={true} />}
        />
        <Route path={navigation.getCartUrl()} element={<ShoppingCart />} />
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

        {/* Categories */}
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

        {/* Brands */}
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

        {/* Keyboards (using navigation helpers) */}
        <Route
          path={navigation.getKeyboardsUrl()}
          element={<KeyboardsPage />}
        />
        <Route
          path={navigation.getKeyboardsSwitchGuideUrl()}
          element={<SwitchGuide />}
        />
        <Route
          path={navigation.getKeyboardsSizeGuideUrl()}
          element={<SizeGuide />}
        />
        <Route
          path={navigation.getKeyboardDetailsUrl(":id")}
          element={<KeyboardDetails />}
        />

        {/* Secondhand (using navigation helpers) */}
        <Route
          path={navigation.getSecondhandUrl()}
          element={<SecondHandList />}
        />
        <Route
          path={navigation.getSecondhandCreateUrl()}
          element={<SecondHandCreate />}
        />
        <Route
          path={navigation.getSecondhandMyListingsUrl()}
          element={<MyListings />}
        />
        <Route
          path={navigation.getSecondhandEditUrl(":id")}
          element={<SecondHandEdit />}
        />
        <Route
          path={navigation.getSecondhandDetailsUrl(":id")}
          element={<SecondHandDetails />}
        />

        {/* Forum (using navigation helpers) */}
        <Route path={navigation.getForumUrl()} element={<ForumHome />} />
        <Route
          path={navigation.getForumCategoryUrl(":slug")}
          element={<CategoryView />}
        />
        <Route
          path={navigation.getForumThreadUrl(":id")}
          element={<ThreadView />}
        />
        <Route
          path={navigation.getForumCreateUrl()}
          element={<CreateThread />}
        />

        {/* News (using navigation helpers) */}
        <Route path={navigation.getNewsUrl()} element={<NewsHome />} />
        <Route
          path={navigation.getNewsArticleUrl(":slug")}
          element={<NewsArticle />}
        />

        {/* Builder & Comparison (using navigation helpers) */}
        <Route
          path={navigation.getBuilderWizardUrl()}
          element={<BuilderWizard />}
        />
        <Route path={navigation.getMyBuildsUrl()} element={<MyBuilds />} />
        <Route
          path={navigation.getPublicBuildsUrl()}
          element={<PublicBuilds />}
        />
        <Route
          path={navigation.getBuilderCompareUrl(":buildId")}
          element={<ComparisonPage />}
        />

        {/* Not Found */}
        <Route path={navigation.getPageNotFoundUrl()} element={<NotFound />} />
      </Routes>
    </main>
  );
}
