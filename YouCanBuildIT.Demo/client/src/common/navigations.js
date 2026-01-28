export const navigation = {
  baseUrl: "http://localhost:5173/api",

  // Core
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
    return "/*"; // react-router v6 catch-all: "*" is typical; keep as provided
  },
  getHardwareBlogUrl() {
    return "/hardware-blog";
  },

  // Auth
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

  // Payments
  getPaymentCardUrl() {
    return "/payment-card";
  },

  // Basket/Cart
  getShopBasketUrl() {
    return "/shop-basket";
  },
  getCartUrl() {
    return "/cart";
  },

  // Comments/Feedback
  getCommentFromUrl() {
    return "/comment";
  },

  // Products
  getProductsUrl() {
    return "/products";
  },
  getNewHardwareUrl() {
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

  // Reviews
  getReviewByIdUrl(id) {
    return `/review/${id}`;
  },
  getProductReviewUrl(productId) {
    return `/products/${productId}/review`;
  },

  // Checkout/Orders
  getCheckoutUrl() {
    return "/checkout";
  },
  getOrderSuccessUrl(orderId) {
    return `/order/success/${orderId}`;
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

  // Baskets
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

  // Categories
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

  // Brands
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

  // Keyboards (added)
  getKeyboardsUrl() {
    return "/keyboards";
  },
  getKeyboardsSwitchGuideUrl() {
    return "/keyboards/switch-guide";
  },
  getKeyboardsSizeGuideUrl() {
    return "/keyboards/size-guide";
  },
  getKeyboardDetailsUrl(id) {
    return `/keyboards/${id}`;
  },

  // Secondhand (added)
  getSecondhandUrl() {
    return "/secondhand";
  },
  getSecondhandCreateUrl() {
    return "/secondhand/create";
  },
  getSecondhandMyListingsUrl() {
    return "/secondhand/my-listings";
  },
  getSecondhandEditUrl(id) {
    return `/secondhand/edit/${id}`;
  },
  getSecondhandDetailsUrl(id) {
    return `/secondhand/${id}`;
  },

  // Forum (added)
  getForumUrl() {
    return "/forum";
  },
  getForumCategoryUrl(slug) {
    return `/forum/category/${slug}`;
  },
  getForumThreadUrl(id) {
    return `/forum/thread/${id}`;
  },
  getForumCreateUrl() {
    return "/forum/create";
  },

  // News (added)
  getNewsUrl() {
    return "/news";
  },
  getNewsArticleUrl(slug) {
    return `/news/${slug}`;
  },

  // Builder & Comparison (added)
  getBuilderWizardUrl() {
    return "/builder";
  },
  getMyBuildsUrl() {
    return "/builder/my-builds";
  },
  getPublicBuildsUrl() {
    return "/builder/community";
  },
  getBuilderCompareUrl(buildId) {
    return `/builder/compare/${buildId}`;
  },

  // External links
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
