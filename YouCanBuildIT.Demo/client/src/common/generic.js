// Base URLs - Use environment variables for configuration
export const serverOrigin = import.meta.env.VITE_API_URL || "https://localhost:57175";
export const serverApiUrl = `${serverOrigin}/api`;

export const serverUrl = serverApiUrl;

// Endpoints for every controller/action
export const serverEndpoints = {
  // --- UserController ---
  register: "/user/register",
  login: "/user/authenticate",
  getUserById: (id) => `/user/${id}`,
  updateUserById: (id) => `/user/${id}`,
  deleteUserById: (id) => `/user/${id}`,
  changeUserPassword: (id) => `/user/${id}/change-password`,
  uploadAvatar: (id) => `/user/${id}/avatar`,

  // --- ShoppingCartController ---
  getCartByUserId: (userId) => `/shoppingcart/${userId}`,
  addCartItem: "/shoppingcart/items",
  removeCartItem: "/shoppingcart/items",
  clearCart: (userId) => `/shoppingcart/items/all/${userId}`,

  // --- ReviewController ---
  getAllReviews: "/review",
  getReviewById: (id) => `/review/${id}`,
  getReviewsByProductId: (productId) => `/review/product/${productId}`,
  getReviewsByUserId: (userId) => `/review/user/${userId}`,
  createReview: "/review",
  updateReview: (id) => `/review/${id}`,
  deleteReview: (id) => `/review/${id}`,

  // --- ProductController ---
  getAllProducts: "/product",
  getProductById: (id) => `/product/${id}`,
  createProduct: "/product",
  updateProduct: (id) => `/product/${id}`,
  deleteProduct: (id) => `/product/${id}`,
  searchProducts: (query) => `/product/search?q=${encodeURIComponent(query)}`,
  getPagedProducts: (page = 1, size = 10) =>
    `/product/paged?page=${page}&size=${size}`,

  // --- PlatformFeedbackController ---
  getAllFeedbacks: "/platformfeedback",
  getFeedbackById: (id) => `/platformfeedback/${id}`,
  getFeedbacksByUserId: (userId) => `/platformfeedback/user/${userId}`,
  createFeedback: "/platformfeedback",
  updateFeedback: (id) => `/platformfeedback/${id}`,
  deleteFeedback: (id) => `/platformfeedback/${id}`,

  // --- OrderController ---
  getAllOrders: "/order",
  getOrdersByUserId: (userId) => `/order/user/${userId}`,
  getOrderById: (id) => `/order/${id}`,
  createOrder: "/order",
  updateOrder: (id) => `/order/${id}`,
  deleteOrder: (id) => `/order/${id}`,

  // --- CategoryController ---
  getAllCategories: "/category",
  getCategoryById: (id) => `/category/${id}`,
  createCategory: "/category",
  updateCategory: (id) => `/category/${id}`,
  deleteCategory: (id) => `/category/${id}`,

  // --- BrandController ---
  getAllBrands: "/brand",
  getBrandById: (id) => `/brand/${id}`,
  createBrand: "/brand",
  updateBrand: (id) => `/brand/${id}`,
  deleteBrand: (id) => `/brand/${id}`,

  // --- BasketController ---
  getAllBaskets: "/basket",
  getBasketById: (id) => `/basket/${id}`,
  getBasketByUserId: (userId) => `/basket/user/${userId}`,
  createBasket: "/basket",
  updateBasket: (id) => `/basket/${id}`,
  deleteBasket: (id) => `/basket/${id}`,
};
