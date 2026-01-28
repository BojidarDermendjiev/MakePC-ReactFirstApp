import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAllListings } from "../../api/secondHandListingService";
import { getAllCategories } from "../../api/categoryService";
import { getAllBrands } from "../../api/brandService";
import { SecondHandCard, SecondHandCardSkeleton } from "./SecondHandCard";
import { AuthContext } from "../../context/AuthContextProvider";
import styles from "../../assets/styles/secondHandList.module.css";

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const SecondHandList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useContext(AuthContext);

  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = useState({
    categoryId: searchParams.get("category") || "",
    brandId: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "date",
    sortDesc: searchParams.get("sortDesc") !== "false",
  });

  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  useEffect(() => {
    Promise.all([getAllCategories(), getAllBrands()])
      .then(([cats, brds]) => {
        setCategories(cats || []);
        setBrands(brds || []);
      })
      .catch(console.error);
  }, []);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        size: pagination.pageSize,
        ...appliedFilters,
      };

      Object.keys(params).forEach((key) => {
        if (
          params[key] === "" ||
          params[key] === null ||
          params[key] === undefined
        ) {
          delete params[key];
        }
      });

      const response = await getAllListings(params);
      setListings(response.listings || response.items || []);
      setPagination((prev) => ({
        ...prev,
        totalCount: response.totalCount || 0,
        totalPages: Math.ceil((response.totalCount || 0) / prev.pageSize),
      }));
    } catch (err) {
      console.error("Failed to fetch listings:", err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, appliedFilters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedFilters.categoryId)
      params.set("category", appliedFilters.categoryId);
    if (appliedFilters.brandId) params.set("brand", appliedFilters.brandId);
    if (appliedFilters.minPrice)
      params.set("minPrice", appliedFilters.minPrice);
    if (appliedFilters.maxPrice)
      params.set("maxPrice", appliedFilters.maxPrice);
    if (appliedFilters.search) params.set("search", appliedFilters.search);
    if (appliedFilters.sortBy !== "date")
      params.set("sortBy", appliedFilters.sortBy);
    if (!appliedFilters.sortDesc) params.set("sortDesc", "false");

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
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "date",
      sortDesc: true,
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

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

  const sortValue = useMemo(() => {
    return `${appliedFilters.sortBy}-${appliedFilters.sortDesc ? "desc" : "asc"}`;
  }, [appliedFilters.sortBy, appliedFilters.sortDesc]);

  const hasActiveFilters = useMemo(() => {
    return (
      appliedFilters.categoryId ||
      appliedFilters.brandId ||
      appliedFilters.minPrice ||
      appliedFilters.maxPrice ||
      appliedFilters.search
    );
  }, [appliedFilters]);

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
          className={`${styles.pageButton} ${pagination.page === i ? styles.pageButtonActive : ""}`}
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
          className={`${styles.sidebar} ${mobileFiltersOpen ? styles.sidebarOpen : ""}`}
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
                className={styles.filterInput}
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search listings..."
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
              <label className={styles.filterLabel}>Price Range (BGN)</label>
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
                <h1 className={styles.title}>Second Hand Marketplace</h1>
                <span className={styles.resultCount}>
                  {pagination.totalCount} listing
                  {pagination.totalCount !== 1 ? "s" : ""} found
                </span>
              </div>

              <div className={styles.viewControls}>
                <button
                  className={styles.mobileFilterButton}
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  Filters
                </button>

                <select
                  className={styles.sortSelect}
                  value={sortValue}
                  onChange={handleSortChange}
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="price-desc">Price (High-Low)</option>
                  <option value="views-desc">Most Viewed</option>
                  <option value="title-asc">Title (A-Z)</option>
                </select>

                {isAuthenticated && (
                  <Link className={styles.createButton} to="/secondhand/create">
                    <PlusIcon />
                    Sell Item
                  </Link>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className={styles.skeletonGrid}>
              {[...Array(8)].map((_, i) => (
                <SecondHandCardSkeleton key={i} />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className={styles.stateContainer}>
              <div className={styles.stateIcon}>
                <SearchIcon />
              </div>
              <h2 className={styles.stateTitle}>No listings found</h2>
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
              <div className={styles.listingGrid}>
                {listings.map((listing, index) => (
                  <SecondHandCard
                    key={listing.id}
                    listing={listing}
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
                    Prev
                  </button>

                  {renderPaginationNumbers}

                  <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
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

export default SecondHandList;
