import { lazy } from "react";

// Lazy load pages for better performance
const Home = lazy(() => import("../pages/HomePage/Home"));
const About = lazy(() => import("../pages/About/About"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Login/Register"));
const SignUp = lazy(() => import("../pages/Login/SignUp"));
const Logout = lazy(() => import("../pages/Logout/Logout"));
const UserSettings = lazy(() => import("../pages/UserSettings/UserSettings"));

// Feedback & Comments
const Feedback = lazy(() => import("../pages/Feedback/Feedback"));
const Comment = lazy(() => import("../pages/Feedback/Comment"));
const EditComment = lazy(() => import("../pages/Feedback/edit/EditComment"));

// Donation
const PriceSelector = lazy(() => import("../pages/Donation/PriceSelectior"));
const PaymentCard = lazy(() => import("../pages/Donation/PaymentCard"));

// Blog
const HardwareBlog = lazy(() => import("../pages/HardwareBlog/HardwareBlog"));

// Products
const ProductList = lazy(() => import("../pages/Product/ProductList"));
const ProductCreate = lazy(() => import("../pages/Product/ProductCreate"));
const ProductEdit = lazy(() => import("../pages/Product/ProductEdit"));
const ProductDetails = lazy(() => import("../pages/Product/ProductDetails"));

// Reviews
const ReviewCrudPage = lazy(() => import("../pages/Review/ReviewCrudPage"));

// Orders
const UserOrders = lazy(() => import("../pages/Order/UserOrders"));
const OrderDetails = lazy(() => import("../pages/Order/OrderDetails"));
const OrderForm = lazy(() => import("../pages/Order/OrderForm"));

// Baskets
const BasketList = lazy(() => import("../pages/Basket/BasketList"));
const BasketDetails = lazy(() => import("../pages/Basket/BasketDetails"));
const BasketForm = lazy(() => import("../pages/Basket/BasketForm"));

// Categories
const CategoryList = lazy(() => import("../pages/Category/CategoryList"));
const CategoryDetails = lazy(() => import("../pages/Category/CategoryDetails"));
const CategoryForm = lazy(() => import("../pages/Category/CategoryForm"));

// Brands
const BrandList = lazy(() => import("../pages/Brand/BrandList"));
const BrandDetails = lazy(() => import("../pages/Brand/BrandDetails"));
const BrandForm = lazy(() => import("../pages/Brand/BrandForm"));

// Error pages
const NotFound = lazy(() => import("../pages/PageNotFound/NotFound"));

export {
  // Auth
  Home,
  About,
  Login,
  Register,
  SignUp,
  Logout,
  UserSettings,
  
  // Content
  Feedback,
  Comment,
  EditComment,
  PriceSelector,
  PaymentCard,
  HardwareBlog,
  
  // Products
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductDetails,
  
  // Reviews
  ReviewCrudPage,
  
  // Orders
  UserOrders,
  OrderDetails,
  OrderForm,
  
  // Baskets
  BasketList,
  BasketDetails,
  BasketForm,
  
  // Categories
  CategoryList,
  CategoryDetails,
  CategoryForm,
  
  // Brands
  BrandList,
  BrandDetails,
  BrandForm,
  
  // Error
  NotFound,
};