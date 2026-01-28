import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getFilteredProducts } from "../../api/productService";
import { getAllCategories } from "../../api/categoryService";
import { getAllBrands } from "../../api/brandService";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import styles from "../../assets/styles/productList.module.css";

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <rect x="3" y="10" width="18" height="4" rx="1" />
    <rect x="3" y="16" width="18" height="4" rx="1" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15,18 9,12 15,6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Data state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0,
  });

  // Filter state
  const [filters, setFilters] = useState({
    categoryId: searchParams.get("category") || "",
    brandId: searchParams.get("brand") || "",
    condition: searchParams.get("condition") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "name",
    sortDesc: searchParams.get("sortDesc") === "true",
  });

  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  // Fetch categories and brands on mount
  useEffect(() => {
    Promise.all([getAllCategories(), getAllBrands()])
      .then(([cats, brds]) => {
        setCategories(cats || []);
        setBrands(brds || []);
      })
      .catch(console.error);
  }, []);

  // Fetch products when filters or page changes
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        size: pagination.pageSize,
        ...appliedFilters,
      };

      // Clean empty values
      Object.keys(params).forEach((key) => {
        if (
          params[key] === "" ||
          params[key] === null ||
          params[key] === undefined
        ) {
          delete params[key];
        }
      });

      const response = await getFilteredProducts(params);
      setProducts(response.items || []);
      setPagination((prev) => ({
        ...prev,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0,
      }));
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, appliedFilters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedFilters.categoryId)
      params.set("category", appliedFilters.categoryId);
    if (appliedFilters.brandId) params.set("brand", appliedFilters.brandId);
    if (appliedFilters.condition)
      params.set("condition", appliedFilters.condition);
    if (appliedFilters.minPrice)
      params.set("minPrice", appliedFilters.minPrice);
    if (appliedFilters.maxPrice)
      params.set("maxPrice", appliedFilters.maxPrice);
    if (appliedFilters.search) params.set("search", appliedFilters.search);
    if (appliedFilters.sortBy !== "name")
      params.set("sortBy", appliedFilters.sortBy);
    if (appliedFilters.sortDesc) params.set("sortDesc", "true");

    setSearchParams(params, { replace: true });
  }, [appliedFilters, setSearchParams]);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setAppliedFilters({ ...filters });
    setMobileFiltersOpen(false);
  }, [filters]);

  const handleClearFilters = useCallback(() => {
    const defaultFilters = {
      categoryId: "",
      brandId: "",
      condition: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "name",
      sortDesc: false,
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleCategoryChipClick = useCallback(
    (categoryId) => {
      const newFilters = {
        ...filters,
        categoryId:
          filters.categoryId === categoryId.toString()
            ? ""
            : categoryId.toString(),
      };
      setFilters(newFilters);
      setAppliedFilters(newFilters);
      setPagination((prev) => ({ ...prev, page: 1 }));
    },
    [filters],
  );

  const handleSortChange = useCallback(
    (e) => {
      const value = e.target.value;
      const [sortBy, sortDesc] = value.split("-");
      const newFilters = {
        ...appliedFilters,
        sortBy,
        sortDesc: sortDesc === "desc",
      };
      setFilters(newFilters);
      setAppliedFilters(newFilters);
    },
    [appliedFilters],
  );

  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoized values
  const sortValue = useMemo(() => {
    return `${appliedFilters.sortBy}-${
      appliedFilters.sortDesc ? "desc" : "asc"
    }`;
  }, [appliedFilters.sortBy, appliedFilters.sortDesc]);

  const hasActiveFilters = useMemo(() => {
    return (
      appliedFilters.categoryId ||
      appliedFilters.brandId ||
      appliedFilters.condition ||
      appliedFilters.minPrice ||
      appliedFilters.maxPrice ||
      appliedFilters.search
    );
  }, [appliedFilters]);

  // Render pagination numbers
  const renderPaginationNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      pagination.page - Math.floor(maxVisiblePages / 2),
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1,
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${
            pagination.page === i ? styles.pageButtonActive : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }
    return pages;
  }, [pagination.page, pagination.totalPages, handlePageChange]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Sidebar Filters */}
        <aside
          className={`${styles.sidebar} ${
            mobileFiltersOpen ? styles.sidebarOpen : ""
          }`}
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className={styles.sidebarContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>Filters</h2>
              {hasActiveFilters && (
                <button
                  className={styles.clearButton}
                  onClick={handleClearFilters}
                >
                  Clear All
                </button>
              )}
            </div>

            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Search</label>
              <input
                className={styles.priceInput}
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search products..."
              />
            </div>

            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Category</label>
              <select
                className={styles.filterSelect}
                name="categoryId"
                value={filters.categoryId}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name?.value || cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Brand</label>
              <select
                className={styles.filterSelect}
                name="brandId"
                value={filters.brandId}
                onChange={handleFilterChange}
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name?.value || brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Condition</label>
              <select
                className={styles.filterSelect}
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
              >
                <option value="">All Conditions</option>
                <option value="1">New</option>
                <option value="2">Used</option>
              </select>
            </div>

            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Price Range</label>
              <div className={styles.priceInputContainer}>
                <input
                  className={styles.priceInput}
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  min="0"
                />
                <span className={styles.priceSeparator}>to</span>
                <input
                  className={styles.priceInput}
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>

            <button className={styles.applyButton} onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.topRow}>
              <div className={styles.titleSection}>
                <h1 className={styles.title}>Products</h1>
                <span className={styles.resultCount}>
                  {pagination.totalCount} product
                  {pagination.totalCount !== 1 ? "s" : ""} found
                </span>
              </div>

              <div className={styles.viewControls}>
                <button
                  className={styles.mobileFilterButton}
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <FilterIcon />
                  Filters
                </button>

                <select
                  className={styles.sortSelect}
                  value={sortValue}
                  onChange={handleSortChange}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="price-desc">Price (High-Low)</option>
                  <option value="stock-desc">Stock (High-Low)</option>
                </select>

                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewButton} ${
                      viewMode === "grid" ? styles.viewButtonActive : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <GridIcon />
                  </button>
                  <button
                    className={`${styles.viewButton} ${
                      viewMode === "list" ? styles.viewButtonActive : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Quick Filters */}
            <div className={styles.categoryChips}>
              <button
                className={`${styles.categoryChip} ${
                  !appliedFilters.categoryId ? styles.categoryChipActive : ""
                }`}
                onClick={() => handleCategoryChipClick("")}
              >
                All
              </button>
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.categoryChip} ${
                    appliedFilters.categoryId === cat.id.toString()
                      ? styles.categoryChipActive
                      : ""
                  }`}
                  onClick={() => handleCategoryChipClick(cat.id)}
                >
                  {cat.name?.value || cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className={styles.skeletonGrid}>
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className={styles.stateContainer}>
              <div className={styles.stateIcon}>
                <SearchIcon />
              </div>
              <h2 className={styles.stateTitle}>No products found</h2>
              <p className={styles.stateText}>
                Try adjusting your filters or search criteria.
              </p>
              <button
                className={styles.stateButton}
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div
                className={`${styles.productGrid} ${
                  viewMode === "list" ? styles.productGridList : ""
                }`}
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.page === 1}
                  >
                    First
                  </button>
                  <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeftIcon />
                  </button>

                  {renderPaginationNumbers}

                  <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    <ChevronRightIcon />
                  </button>
                  <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Last
                  </button>

                  <span className={styles.pageInfo}>
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
