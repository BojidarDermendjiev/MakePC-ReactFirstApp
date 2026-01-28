import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import KeyboardCard from "./KeyboardCard";
import KeyboardFilters from "./KeyboardFilters";
import { getKeyboards } from "../../api/keyboardService";
import styles from "../../assets/styles/keyboardsPage.module.css";

const GuideIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const SizeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

const KeyboardsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyboards, setKeyboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const getFiltersFromParams = useCallback(() => {
    const filters = {};
    const boolParams = ["hasBacklight", "isHotswap", "hasNkro", "inStock"];

    for (const [key, value] of searchParams.entries()) {
      if (boolParams.includes(key)) {
        filters[key] = value === "true";
      } else if (key === "page" || key === "pageSize") {
        filters[key] = parseInt(value, 10);
      } else if (key === "minPrice" || key === "maxPrice") {
        filters[key] = parseFloat(value);
      } else {
        filters[key] = value;
      }
    }

    return {
      page: 1,
      pageSize: 12,
      ...filters,
    };
  }, [searchParams]);

  const [filters, setFilters] = useState(getFiltersFromParams);

  const fetchKeyboards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getKeyboards(filters);
      setKeyboards(data.items || []);
      setTotalCount(data.totalCount || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch keyboards:", err);
      setKeyboards([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchKeyboards();
  }, [fetchKeyboards]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== false
      ) {
        params.set(key, String(value));
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handleClearFilters = () => {
    setFilters({ page: 1, pageSize: 12 });
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters((prev) => ({ ...prev, searchTerm: value, page: 1 }));
  };

  const handleSort = (e) => {
    const [sortBy, sortDescending] = e.target.value.split("-");
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortDescending: sortDescending === "desc",
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Keyboards</span>
          </div>

          <div className={styles.titleRow}>
            <h1 className={styles.title}>Mechanical Keyboards</h1>
            <div className={styles.quickLinks}>
              <Link className={styles.quickLink} to="/keyboards/switch-guide">
                <GuideIcon />
                Switch Guide
              </Link>
              <Link className={styles.quickLink} to="/keyboards/size-guide">
                <SizeIcon />
                Size Guide
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.filtersColumn}>
            <KeyboardFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>

          <div className={styles.productsColumn}>
            <div className={styles.topBar}>
              <span className={styles.resultsCount}>
                {loading ? "Loading..." : `${totalCount} keyboards found`}
              </span>
              <div className={styles.sortRow}>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Search keyboards..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <span className={styles.sortLabel}>Sort by:</span>
                <select
                  className={styles.sortSelect}
                  value={`${filters.sortBy || "name"}-${filters.sortDescending ? "desc" : "asc"}`}
                  onChange={handleSort}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="brand-asc">Brand (A-Z)</option>
                </select>
              </div>
            </div>

            <div className={styles.productsGrid}>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={styles.skeletonCard}>
                    <div className={styles.skeletonImage} />
                    <div className={styles.skeletonContent}>
                      <div
                        className={styles.skeletonText}
                        style={{
                          width: "60px",
                          height: "12px",
                          marginBottom: "8px",
                        }}
                      />
                      <div
                        className={styles.skeletonText}
                        style={{
                          width: "90%",
                          height: "18px",
                          marginBottom: "12px",
                        }}
                      />
                      <div
                        className={styles.skeletonText}
                        style={{
                          width: "100%",
                          height: "14px",
                          marginBottom: "6px",
                        }}
                      />
                      <div
                        className={styles.skeletonText}
                        style={{
                          width: "80%",
                          height: "14px",
                          marginBottom: "12px",
                        }}
                      />
                      <div
                        className={styles.skeletonText}
                        style={{ width: "40%", height: "24px" }}
                      />
                    </div>
                  </div>
                ))
              ) : keyboards.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>⌨️</div>
                  <p className={styles.emptyText}>No keyboards found</p>
                  <p className={styles.emptySubtext}>
                    Try adjusting your filters or search term
                  </p>
                </div>
              ) : (
                keyboards.map((keyboard, index) => (
                  <KeyboardCard
                    key={keyboard.id}
                    keyboard={keyboard}
                    index={index}
                  />
                ))
              )}
            </div>

            {!loading && totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageButton}
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page <= 1}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (filters.page <= 3) {
                    pageNum = i + 1;
                  } else if (filters.page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = filters.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`${styles.pageButton} ${filters.page === pageNum ? styles.pageButtonActive : ""}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  className={styles.pageButton}
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardsPage;
