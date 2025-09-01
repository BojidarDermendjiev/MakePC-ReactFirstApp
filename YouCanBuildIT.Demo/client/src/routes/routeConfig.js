import { navigation } from "../common/navigations";
import {
  Home,
  About,
  Login,
  Register,
  SignUp,
  Logout,
  UserSettings,
  Feedback,
  Comment,
  EditComment,
  PriceSelector,
  PaymentCard,
  HardwareBlog,
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductDetails,
  ReviewCrudPage,
  UserOrders,
  OrderDetails,
  OrderForm,
  BasketList,
  BasketDetails,
  BasketForm,
  CategoryList,
  CategoryDetails,
  CategoryForm,
  BrandList,
  BrandDetails,
  BrandForm,
  NotFound,
} from "./lazyComponents";

export const routes = [
  // Public routes
  { path: navigation.getHomeUrl(), element: Home, isPublic: true },
  { path: navigation.getAboutUrl(), element: About, isPublic: true },
  { path: navigation.getLoginUrl(), element: Login, isPublic: true },
  { path: navigation.getRegisterUrl(), element: Register, isPublic: true },
  { path: navigation.getRegisterUrl(), element: SignUp, isPublic: true }, // Note: This appears to be a duplicate in original
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