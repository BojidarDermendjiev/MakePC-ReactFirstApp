// Base URL for your ASP.NET Core API
export const serverUrl = "https://localhost:57175/api";

// Endpoints for every controller/action logic based on your ASP.NET Core API
export const serverEndpoints = {
  // --- UserController ---
  register: "/user/register", // POST
  login: "/user/authenticate", // POST
  getUserById: (id) => `/user/${id}`, // GET
  updateUserById: (id) => `/user/${id}`, // PUT
  deleteUserById: (id) => `/user/${id}`, // DELETE
  changeUserPassword: (id) => `/user/${id}/change-password`, // POST

  // --- ShoppingCartController ---
  getCartByUserId: (userId) => `/shoppingcart/${userId}`, // GET
  addCartItem: "/shoppingcart/items", // POST
  removeCartItem: "/shoppingcart/items", // DELETE
  clearCart: (userId) => `/shoppingcart/items/all/${userId}`, // DELETE

  // --- ReviewController ---
  getAllReviews: "/review", // GET
  getReviewById: (id) => `/review/${id}`, // GET
  getReviewsByProductId: (productId) => `/review/product/${productId}`, // GET
  getReviewsByUserId: (userId) => `/review/user/${userId}`, // GET
  createReview: "/review", // POST
  updateReview: (id) => `/review/${id}`, // PUT
  deleteReview: (id) => `/review/${id}`, // DELETE

  // --- ProductController ---
  getAllProducts: "/product", // GET
  getProductById: (id) => `/product/${id}`, // GET
  createProduct: "/product", // POST
  updateProduct: (id) => `/product/${id}`, // PUT
  deleteProduct: (id) => `/product/${id}`, // DELETE
  searchProducts: (query) => `/product/search?q=${encodeURIComponent(query)}`, // GET
  getPagedProducts: (page = 1, size = 10) =>
    `/product/paged?page=${page}&size=${size}`, // GET

  // --- PlatformFeedbackController ---
  getAllFeedbacks: "/platformfeedback", // GET
  getFeedbackById: (id) => `/platformfeedback/${id}`, // GET
  getFeedbacksByUserId: (userId) => `/platformfeedback/user/${userId}`, // GET
  createFeedback: "/platformfeedback", // POST
  updateFeedback: (id) => `/platformfeedback/${id}`, // PUT
  deleteFeedback: (id) => `/platformfeedback/${id}`, // DELETE

  // --- OrderController ---
  getAllOrders: "/order", // GET
  getOrdersByUserId: (userId) => `/order/user/${userId}`, // GET
  getOrderById: (id) => `/order/${id}`, // GET
  createOrder: "/order", // POST
  updateOrder: (id) => `/order/${id}`, // PUT
  deleteOrder: (id) => `/order/${id}`, // DELETE

  // --- CategoryController ---
  getAllCategories: "/category", // GET
  getCategoryById: (id) => `/category/${id}`, // GET
  createCategory: "/category", // POST
  updateCategory: (id) => `/category/${id}`, // PUT
  deleteCategory: (id) => `/category/${id}`, // DELETE

  // --- BrandController ---
  getAllBrands: "/brand", // GET
  getBrandById: (id) => `/brand/${id}`, // GET
  createBrand: "/brand", // POST
  updateBrand: (id) => `/brand/${id}`, // PUT
  deleteBrand: (id) => `/brand/${id}`, // DELETE

  // --- BasketController ---
  getAllBaskets: "/basket", // GET
  getBasketById: (id) => `/basket/${id}`, // GET
  getBasketByUserId: (userId) => `/basket/user/${userId}`, // GET
  createBasket: "/basket", // POST
  updateBasket: (id) => `/basket/${id}`, // PUT
  deleteBasket: (id) => `/basket/${id}`, // DELETE
};
