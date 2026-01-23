// Base URLs - Use environment variables for configuration
export const serverOrigin = import.meta.env.VITE_API_URL || "https://localhost:57175";
export const serverApiUrl = `${serverOrigin}/api`;

export const serverUrl = serverApiUrl;

// Endpoints for every controller/action
export const serverEndpoints = {
  // --- AuthController (cookie-based auth) ---
  register: "/auth/register",
  login: "/auth/login",
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
  getFilteredProducts: (params) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.size) queryParams.append("size", params.size);
    if (params.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params.brandId) queryParams.append("brandId", params.brandId);
    if (params.condition) queryParams.append("condition", params.condition);
    if (params.minPrice) queryParams.append("minPrice", params.minPrice);
    if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);
    if (params.search) queryParams.append("search", params.search);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortDesc !== undefined) queryParams.append("sortDesc", params.sortDesc);
    return `/product/filter?${queryParams.toString()}`;
  },

  // --- SecondHandListingController ---
  getAllSecondHandListings: (params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page);
    if (params?.size) queryParams.append("size", params.size);
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params?.brandId) queryParams.append("brandId", params.brandId);
    if (params?.minPrice) queryParams.append("minPrice", params.minPrice);
    if (params?.maxPrice) queryParams.append("maxPrice", params.maxPrice);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortDesc !== undefined) queryParams.append("sortDesc", params.sortDesc);
    return `/secondhandlisting?${queryParams.toString()}`;
  },
  getSecondHandListingById: (id) => `/secondhandlisting/${id}`,
  getSecondHandListingsByCategory: (categoryId) => `/secondhandlisting/category/${categoryId}`,
  getSecondHandListingsBySeller: (sellerId) => `/secondhandlisting/seller/${sellerId}`,
  getMySecondHandListings: "/secondhandlisting/my-listings",
  createSecondHandListing: "/secondhandlisting",
  updateSecondHandListing: (id) => `/secondhandlisting/${id}`,
  deleteSecondHandListing: (id) => `/secondhandlisting/${id}`,
  markSecondHandListingAsSold: (id) => `/secondhandlisting/${id}/sold`,

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

  // --- ForumController ---
  getForumCategories: "/forum/categories",
  getForumCategoryById: (id) => `/forum/categories/${id}`,
  getForumCategoryBySlug: (slug) => `/forum/categories/slug/${slug}`,
  createForumCategory: "/forum/categories",
  updateForumCategory: (id) => `/forum/categories/${id}`,
  deleteForumCategory: (id) => `/forum/categories/${id}`,
  getForumThreads: (params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page);
    if (params?.size) queryParams.append("size", params.size);
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId);
    return `/forum/threads?${queryParams.toString()}`;
  },
  getForumThreadById: (id) => `/forum/threads/${id}`,
  getForumThreadBySlug: (slug) => `/forum/threads/slug/${slug}`,
  getForumThreadsByAuthor: (authorId) => `/forum/threads/author/${authorId}`,
  createForumThread: "/forum/threads",
  updateForumThread: (id) => `/forum/threads/${id}`,
  deleteForumThread: (id) => `/forum/threads/${id}`,
  getForumPosts: (threadId, params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page);
    if (params?.size) queryParams.append("size", params.size);
    return `/forum/threads/${threadId}/posts?${queryParams.toString()}`;
  },
  getForumPostById: (id) => `/forum/posts/${id}`,
  createForumPost: "/forum/posts",
  updateForumPost: (id) => `/forum/posts/${id}`,
  deleteForumPost: (id) => `/forum/posts/${id}`,

  // --- NewsController ---
  getNews: (params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page);
    if (params?.size) queryParams.append("size", params.size);
    return `/news?${queryParams.toString()}`;
  },
  getAllNews: (params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page);
    if (params?.size) queryParams.append("size", params.size);
    return `/news/all?${queryParams.toString()}`;
  },
  getNewsById: (id) => `/news/${id}`,
  getNewsBySlug: (slug) => `/news/slug/${slug}`,
  getNewsByTag: (tag) => `/news/tag/${tag}`,
  getNewsByAuthor: (authorId) => `/news/author/${authorId}`,
  createNews: "/news",
  updateNews: (id) => `/news/${id}`,
  deleteNews: (id) => `/news/${id}`,
};
