import { getIn } from "formik";
import { get } from "../API/requester";

export const navigation = {
  baseUrl: "http://localhost:5173/api",

  getHomeUrl() {
    return "/";
  },
  getAboutUrl() {
    return "/about";
  },
  getBuildCompositionUrl() {
    return "/build-composition";
  },
  getDonationUrl() {
    return "/donation";
  },
  getFeedBackUrl() {
    return "/feedback";
  },
  getPageNotFoundUrl() {
    return "/*";
  },
  getHardwareBlogUrl() {
    return "/hardware-blog";
  },
  getLoginUrl() {
    return "/login";
  },
  getRegisterUrl() {
    return "/register";
  },
  getUserSettingsUrl() {
    return "/usersettings";
  },
  getLogoutUrl() {
    return "/logout";
  },
  getPaymentCardUrl() {
    return "/payment-card";
  },
  getShopBasketUrl() {
    return "/shop-basket";
  },
  getCommentFromUrl() {
    return "/comment";
  },
  getProductsUrl() {
    return "/products";
  },
  getProductCreateUrl() {
    return "/products/create";
  },
  getProductEditUrl(id) {
    return `/products/edit/${id}`;
  },
  getProductDetailsUrl(id) {
    return `/products/${id}`;
  },
  getReviewByIdUrl(id) {
    return `/review/${id}`;
  },
  getProductReviewUrl(productId) {
    return `/products/${productId}/review`;
  },
  getOrdersUrl() {
    return "/orders";
  },
  getOrderCreateUrl() {
    return "/order/create";
  },
  getOrderEditUrl(id) {
    return `/order/edit/${id}`;
  },
  getOrderDetailsUrl(id) {
    return `/order/${id}`;
  },
  getShopBasketUrl() {
    return "/shop-basket";
  },
  getBasketsUrl() {
    return "/baskets";
  },
  getBasketCreateUrl() {
    return "/basket/create";
  },
  getBasketEditUrl(id) {
    return `/basket/edit/${id}`;
  },
  getBasketDetailsUrl(id) {
    return `/basket/${id}`;
  },
  getCategoriesUrl() {
    return "/categories";
  },
  getCategoryDetailsUrl(id) {
    return `/category/${id}`;
  },
  getCategoryCreateUrl() {
    return "/category/create";
  },
  getCategoryEditUrl(id) {
    return `/category/edit/${id}`;
  },
  getBrandsUrl() {
    return "/brands";
  },
  getBrandDetailsUrl(id) {
    return `/brand/${id}`;
  },
  getBrandCreateUrl() {
    return "/brand/create";
  },
  getBrandEditUrl(id) {
    return `/brand/edit/${id}`;
  },
  getInvidiaUrl() {
    return "https://www.nvidia.com/";
  },
  getIntel13GenUrl() {
    return "https://www.intel.com/";
  },
  getRamDDR5Url() {
    return "https://www.corsair.com/";
  },
  getSSDsUrl() {
    return "https://www.samsung.com/";
  },
  getMicrosoftUrl() {
    return "https://www.microsoft.com/";
  },
  getLinuxUrl() {
    return "https://www.linux.org/";
  },
  getIOSUrl() {
    return "https://www.apple.com/ios/";
  },
  getGithubUrl() {
    return "https://github.com/BojidarDermendjiev/MakePC-ReactFirstApp";
  },
  getLinkedInUrl() {
    return "https://www.linkedin.com";
  },
  getInstagramUrl() {
    return "https://www.instagram.com/";
  },
  getTwitterUrl() {
    return "https://x.com/?lang=bg";
  },
  getYouTubeUrl() {
    return "https://www.youtube.com/";
  },
};
