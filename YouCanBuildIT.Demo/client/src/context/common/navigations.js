export const navigation = {
  baseUrl: "http://localhost:5173",

  // Method to get the home URL
  getHomeUrl() {
    return "/";
  },

  // Method to get the about URL
  getAboutUrl() {
    return "/about";
  },

  // Method to get the build composition URL
  getBuildCompositionUrl() {
    return "/build-composition";
  },

  // Method to navigate you to donation URL
  getDonationUrl() {
    return "/donation";
  },

  // Method to get the feedback URL
  getFeedBackUrl() {
    return "/feedback";
  },

  // Method to get the page not found URL
  getPageNotFoundUrl() {
    return "/*";
  },

  // Method to get the hardware blog URL
  getHardwareBlogUrl() {
    return "/hardware-blog";
  },

  // Method to get the login URL
  getSignUpUrl() {
    return "/sign-up";
  },
  getSignInUrl() {
    return "/sign-in";
  },
  // Method to get the logout URL
  getLogoutUrl() {
    return "/logout";
  },

  // Method to get the shop basket URL
  getShopBasketUrl() {
    return "/shop-basket";
  },

  // Method to get a URL for a specific user profile
  getUserProfileUrl(userId) {
    return `/user/${userId}`;
  },
};
