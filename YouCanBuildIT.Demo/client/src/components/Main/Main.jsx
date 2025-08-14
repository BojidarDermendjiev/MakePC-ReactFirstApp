import { Routes, Route } from "react-router-dom";
import { navigation } from "../../common/navigations";

// --- User pages ---;
import About from "../../pages/About/About";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Login/Register";
import Home from "../../pages/HomePage/Home";
import Logout from "../../pages/Logout/Logout";
import Comment from "../../pages/Feedback/Comment";
import Feedback from "../../pages/Feedback/Feedback";
import NotFound from "../../pages/PageNotFound/NotFound";
import EditComment from "../../pages/Feedback/edit/EditComment";
import PriceSelectior from "../../pages/Donation/PriceSelectior";
import HardwareBlog from "../../pages/HardwareBlog/HardwareBlog";
import PaymentCard from "../../pages/Donation/PaymentCard";
import SignUp from "../../pages/Login/SignUp";
// --- Product pages ---
import ProductList from "../../pages/Product/ProductList";
import ProductCreate from "../../pages/Product/ProductCreate";
import ProductEdit from "../../pages/Product/ProductEdit";
import ProductDetails from "../../pages/Product/ProductDetails";

// --- Review pages ---
import ReviewCrudPage from "../../pages/Review/ReviewCrudPage";

// --- Order pages ---
import UserOrders from "../../pages/Order/UserOrders";
import OrderDetails from "../../pages/Order/OrderDetails";
import OrderForm from "../../pages/Order/OrderForm";

// --- Basket pages ---
import BasketList from "../../pages/Basket/BasketList";
import BasketDetails from "../../pages/Basket/BasketDetails";
import BasketForm from "../../pages/Basket/BasketForm";

// --- Category pages ---
import CategoryList from "../../pages/Category/CategoryList";
import CategoryDetails from "../../pages/Category/CategoryDetails";
import CategoryForm from "../../pages/Category/CategoryForm";

// --- Brand pages ---
import BrandList from "../../pages/Brand/BrandList";
import BrandDetails from "../../pages/Brand/BrandDetails";
import BrandForm from "../../pages/Brand/BrandForm";
import UserSettings from "../../pages/UserSettings/UserSettings";

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
        <Route path={navigation.getPageNotFoundUrl()} element={<NotFound />} />
      </Routes>
    </main>
  );
}
