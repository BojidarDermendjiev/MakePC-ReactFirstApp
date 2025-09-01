import { lazy } from "react";
import { navigation } from "../common/navigations";

// Auth feature components
const Login = lazy(() => import("../features/auth/components/LoginForm"));
const Register = lazy(() => import("../features/auth/components/RegisterForm"));
const SignUp = lazy(() => import("../pages/Login/SignUp"));
const Logout = lazy(() => import("../pages/Logout/Logout"));

// Feedback feature components
const Feedback = lazy(() => import("../features/feedback/components/FeedbackList"));
const Comment = lazy(() => import("../pages/Feedback/Comment"));
const EditComment = lazy(() => import("../pages/Feedback/edit/EditComment"));

// Product feature components
const ProductList = lazy(() => import("../features/product/components/ProductList"));
const ProductCreate = lazy(() => import("../pages/Product/ProductCreate"));
const ProductEdit = lazy(() => import("../pages/Product/ProductEdit"));
const ProductDetails = lazy(() => import("../pages/Product/ProductDetails"));

// Category feature components
const CategoryList = lazy(() => import("../features/category/components/CategoryList"));
const CategoryDetails = lazy(() => import("../pages/Category/CategoryDetails"));
const CategoryForm = lazy(() => import("../pages/Category/CategoryForm"));

// Brand feature components
const BrandList = lazy(() => import("../features/brand/components/BrandList"));
const BrandDetails = lazy(() => import("../pages/Brand/BrandDetails"));
const BrandForm = lazy(() => import("../pages/Brand/BrandForm"));

// Basket feature components
const BasketList = lazy(() => import("../features/basket/components/BasketList"));
const BasketDetails = lazy(() => import("../pages/Basket/BasketDetails"));
const BasketForm = lazy(() => import("../pages/Basket/BasketForm"));

// Order feature components
const UserOrders = lazy(() => import("../features/order/components/UserOrders"));
const OrderDetails = lazy(() => import("../pages/Order/OrderDetails"));
const OrderForm = lazy(() => import("../pages/Order/OrderForm"));

// Other pages
const Home = lazy(() => import("../pages/HomePage/Home"));
const About = lazy(() => import("../pages/About/About"));
const UserSettings = lazy(() => import("../pages/UserSettings/UserSettings"));
const PriceSelector = lazy(() => import("../pages/Donation/PriceSelectior"));
const PaymentCard = lazy(() => import("../pages/Donation/PaymentCard"));
const HardwareBlog = lazy(() => import("../pages/HardwareBlog/HardwareBlog"));
const ReviewCrudPage = lazy(() => import("../pages/Review/ReviewCrudPage"));
const NotFound = lazy(() => import("../pages/PageNotFound/NotFound"));

export const routes = [
  // Public routes
  { path: navigation.getHomeUrl(), element: Home, isPublic: true },
  { path: navigation.getAboutUrl(), element: About, isPublic: true },
  { path: navigation.getLoginUrl(), element: Login, isPublic: true },
  { path: navigation.getRegisterUrl(), element: Register, isPublic: true },
  { path: navigation.getRegisterUrl(), element: SignUp, isPublic: true },
  { path: navigation.getHardwareBlogUrl(), element: HardwareBlog, isPublic: true },
  
  // Auth-required routes
  { path: navigation.getLogoutUrl(), element: Logout, requiresAuth: true },
  { path: navigation.getUserSettingsUrl(), element: UserSettings, requiresAuth: true },
  
  // Feedback & Comments
  { path: navigation.getFeedBackUrl(), element: Feedback, isPublic: true },
  { path: navigation.getCommentFromUrl(), element: Comment, requiresAuth: true },
  { path: `${navigation.getCommentFromUrl()}/:commentId`, element: EditComment, requiresAuth: true },
  
  // Donation
  { path: navigation.getDonationUrl(), element: PriceSelector, isPublic: true },
  { path: navigation.getPaymentCardUrl(), element: PaymentCard, requiresAuth: true },
  
  // Products
  { path: navigation.getProductsUrl(), element: ProductList, requiresAuth: true },
  { path: navigation.getProductCreateUrl(), element: ProductCreate, requiresAuth: true, adminOnly: true },
  { path: navigation.getProductEditUrl(":id"), element: ProductEdit, requiresAuth: true, adminOnly: true },
  { path: navigation.getProductDetailsUrl(":id"), element: ProductDetails, requiresAuth: true },
  
  // Reviews
  { path: navigation.getReviewByIdUrl(":reviewId"), element: ReviewCrudPage, requiresAuth: true },
  { path: navigation.getProductReviewUrl(":id"), element: ReviewCrudPage, requiresAuth: true },
  
  // Orders
  { path: navigation.getOrdersUrl(), element: UserOrders, requiresAuth: true },
  { path: navigation.getOrderCreateUrl(), element: OrderForm, requiresAuth: true },
  { path: navigation.getOrderEditUrl(":id"), element: OrderForm, requiresAuth: true, props: { isEdit: true } },
  { path: navigation.getOrderDetailsUrl(":id"), element: OrderDetails, requiresAuth: true },
  
  // Baskets
  { path: navigation.getShopBasketUrl(), element: BasketList, requiresAuth: true, props: { forCurrentUser: true } },
  { path: navigation.getBasketsUrl(), element: BasketList, requiresAuth: true },
  { path: navigation.getBasketDetailsUrl(":id"), element: BasketDetails, requiresAuth: true },
  { path: navigation.getBasketCreateUrl(), element: BasketForm, requiresAuth: true },
  { path: navigation.getBasketEditUrl(":id"), element: BasketForm, requiresAuth: true, props: { isEdit: true } },
  
  // Categories
  { path: navigation.getCategoriesUrl(), element: CategoryList, requiresAuth: true },
  { path: navigation.getCategoryCreateUrl(), element: CategoryForm, requiresAuth: true, adminOnly: true },
  { path: navigation.getCategoryEditUrl(":id"), element: CategoryForm, requiresAuth: true, adminOnly: true, props: { isEdit: true } },
  { path: navigation.getCategoryDetailsUrl(":id"), element: CategoryDetails, requiresAuth: true },
  
  // Brands
  { path: navigation.getBrandsUrl(), element: BrandList, requiresAuth: true },
  { path: navigation.getBrandCreateUrl(), element: BrandForm, requiresAuth: true, adminOnly: true },
  { path: navigation.getBrandEditUrl(":id"), element: BrandForm, requiresAuth: true, adminOnly: true, props: { isEdit: true } },
  { path: navigation.getBrandDetailsUrl(":id"), element: BrandDetails, requiresAuth: true },
  
  // Error page (always last)
  { path: navigation.getPageNotFoundUrl(), element: NotFound, isPublic: true },
];