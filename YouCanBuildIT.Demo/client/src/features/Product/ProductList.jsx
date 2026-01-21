import { useEffect, useState, useCallback, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { getFilteredProducts } from "../../api/productService";
import { getAllCategories } from "../../api/categoryService";
import { getAllBrands } from "../../api/brandService";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Layout Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  animation: ${fadeIn} 0.3s ease;
`;

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

// Sidebar Styles
const Sidebar = styled.aside`
  animation: ${slideIn} 0.4s ease;

  @media (max-width: 1024px) {
    display: ${props => props.$mobileOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    padding: 20px;
    overflow-y: auto;
  }
`;

const SidebarContent = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 24px;

  @media (max-width: 1024px) {
    max-width: 400px;
    margin: 0 auto;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f5f9;
`;

const SidebarTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: #fee2e2;
  color: #dc2626;
  transition: all 0.2s ease;

  &:hover {
    background: #fecaca;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;

  &:focus {
    outline: none;
    border-color: #c7f022;
    box-shadow: 0 0 0 3px rgba(199, 240, 34, 0.2);
  }
`;

const PriceInputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #c7f022;
    box-shadow: 0 0 0 3px rgba(199, 240, 34, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PriceSeparator = styled.span`
  color: #9ca3af;
  font-weight: 500;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

// Main Content Styles
const MainContent = styled.main`
  animation: ${fadeIn} 0.4s ease;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

const TitleSection = styled.div``;

const Title = styled.h1`
  margin: 0 0 4px 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
`;

const ResultCount = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MobileFilterButton = styled.button`
  display: none;
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  gap: 8px;
  align-items: center;

  @media (max-width: 1024px) {
    display: flex;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background: #fff;
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ViewButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #c7f022 0%, #a8d810 100%)' : 'transparent'};
  color: ${props => props.$active ? '#1f2937' : '#6b7280'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #c7f022 0%, #a8d810 100%)' : '#f3f4f6'};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SortSelect = styled.select`
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: #c7f022;
  }
`;

// Category Chips
const CategoryChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`;

const CategoryChip = styled.button`
  padding: 10px 18px;
  border: 2px solid ${props => props.$active ? '#c7f022' : '#e5e7eb'};
  border-radius: 25px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: ${props => props.$active ? 'linear-gradient(135deg, #c7f022 0%, #a8d810 100%)' : '#fff'};
  color: ${props => props.$active ? '#1f2937' : '#4b5563'};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: #c7f022;
    transform: translateY(-2px);
  }
`;

// Product Grid
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$viewMode === 'list'
    ? '1fr'
    : 'repeat(auto-fill, minmax(280px, 1fr))'};
  gap: 24px;
`;

// Pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  min-width: 44px;
  height: 44px;
  padding: 0 16px;
  border: 2px solid ${props => props.$active ? '#c7f022' : '#e5e7eb'};
  border-radius: 10px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #c7f022 0%, #a8d810 100%)' : '#fff'};
  color: ${props => props.$active ? '#1f2937' : '#4b5563'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover:not(:disabled) {
    border-color: #c7f022;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const PageInfo = styled.span`
  padding: 0 16px;
  color: #6b7280;
  font-size: 14px;
`;

// Empty & Loading States
const StateContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const StateIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
    color: #9ca3af;
  }
`;

const StateTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #1f2937;
`;

const StateText = styled.p`
  margin: 0 0 24px 0;
  color: #6b7280;
`;

const StateButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

// Skeleton Grid
const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

// Icons
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
  const [viewMode, setViewMode] = useState('grid');
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
    categoryId: searchParams.get('category') || "",
    brandId: searchParams.get('brand') || "",
    condition: searchParams.get('condition') || "",
    minPrice: searchParams.get('minPrice') || "",
    maxPrice: searchParams.get('maxPrice') || "",
    search: searchParams.get('search') || "",
    sortBy: searchParams.get('sortBy') || "name",
    sortDesc: searchParams.get('sortDesc') === 'true',
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
        if (params[key] === "" || params[key] === null || params[key] === undefined) {
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
    if (appliedFilters.categoryId) params.set('category', appliedFilters.categoryId);
    if (appliedFilters.brandId) params.set('brand', appliedFilters.brandId);
    if (appliedFilters.condition) params.set('condition', appliedFilters.condition);
    if (appliedFilters.minPrice) params.set('minPrice', appliedFilters.minPrice);
    if (appliedFilters.maxPrice) params.set('maxPrice', appliedFilters.maxPrice);
    if (appliedFilters.search) params.set('search', appliedFilters.search);
    if (appliedFilters.sortBy !== 'name') params.set('sortBy', appliedFilters.sortBy);
    if (appliedFilters.sortDesc) params.set('sortDesc', 'true');

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

  const handleCategoryChipClick = useCallback((categoryId) => {
    const newFilters = {
      ...filters,
      categoryId: filters.categoryId === categoryId.toString() ? "" : categoryId.toString(),
    };
    setFilters(newFilters);
    setAppliedFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [filters]);

  const handleSortChange = useCallback((e) => {
    const value = e.target.value;
    const [sortBy, sortDesc] = value.split('-');
    const newFilters = { ...appliedFilters, sortBy, sortDesc: sortDesc === 'desc' };
    setFilters(newFilters);
    setAppliedFilters(newFilters);
  }, [appliedFilters]);

  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoized values
  const sortValue = useMemo(() => {
    return `${appliedFilters.sortBy}-${appliedFilters.sortDesc ? 'desc' : 'asc'}`;
  }, [appliedFilters.sortBy, appliedFilters.sortDesc]);

  const hasActiveFilters = useMemo(() => {
    return appliedFilters.categoryId || appliedFilters.brandId ||
           appliedFilters.condition || appliedFilters.minPrice ||
           appliedFilters.maxPrice || appliedFilters.search;
  }, [appliedFilters]);

  // Render pagination numbers
  const renderPaginationNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          $active={pagination.page === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }
    return pages;
  }, [pagination.page, pagination.totalPages, handlePageChange]);

  return (
    <PageContainer>
      <Container>
        {/* Sidebar Filters */}
        <Sidebar $mobileOpen={mobileFiltersOpen}>
          <SidebarContent>
            <SidebarHeader>
              <SidebarTitle>Filters</SidebarTitle>
              {hasActiveFilters && (
                <ClearButton onClick={handleClearFilters}>Clear All</ClearButton>
              )}
            </SidebarHeader>

            <FilterSection>
              <FilterLabel>Search</FilterLabel>
              <PriceInput
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search products..."
              />
            </FilterSection>

            <FilterSection>
              <FilterLabel>Category</FilterLabel>
              <FilterSelect name="categoryId" value={filters.categoryId} onChange={handleFilterChange}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name?.value || cat.name}
                  </option>
                ))}
              </FilterSelect>
            </FilterSection>

            <FilterSection>
              <FilterLabel>Brand</FilterLabel>
              <FilterSelect name="brandId" value={filters.brandId} onChange={handleFilterChange}>
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name?.value || brand.name}
                  </option>
                ))}
              </FilterSelect>
            </FilterSection>

            <FilterSection>
              <FilterLabel>Condition</FilterLabel>
              <FilterSelect name="condition" value={filters.condition} onChange={handleFilterChange}>
                <option value="">All Conditions</option>
                <option value="1">New</option>
                <option value="2">Used</option>
              </FilterSelect>
            </FilterSection>

            <FilterSection>
              <FilterLabel>Price Range</FilterLabel>
              <PriceInputContainer>
                <PriceInput
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  min="0"
                />
                <PriceSeparator>to</PriceSeparator>
                <PriceInput
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  min="0"
                />
              </PriceInputContainer>
            </FilterSection>

            <ApplyButton onClick={handleApplyFilters}>Apply Filters</ApplyButton>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Header>
            <TopRow>
              <TitleSection>
                <Title>Products</Title>
                <ResultCount>
                  {pagination.totalCount} product{pagination.totalCount !== 1 ? "s" : ""} found
                </ResultCount>
              </TitleSection>

              <ViewControls>
                <MobileFilterButton onClick={() => setMobileFiltersOpen(true)}>
                  <FilterIcon />
                  Filters
                </MobileFilterButton>

                <SortSelect value={sortValue} onChange={handleSortChange}>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="price-desc">Price (High-Low)</option>
                  <option value="stock-desc">Stock (High-Low)</option>
                </SortSelect>

                <ViewToggle>
                  <ViewButton $active={viewMode === 'grid'} onClick={() => setViewMode('grid')}>
                    <GridIcon />
                  </ViewButton>
                  <ViewButton $active={viewMode === 'list'} onClick={() => setViewMode('list')}>
                    <ListIcon />
                  </ViewButton>
                </ViewToggle>
              </ViewControls>
            </TopRow>

            {/* Category Quick Filters */}
            <CategoryChips>
              <CategoryChip
                $active={!appliedFilters.categoryId}
                onClick={() => handleCategoryChipClick("")}
              >
                All
              </CategoryChip>
              {categories.slice(0, 8).map((cat) => (
                <CategoryChip
                  key={cat.id}
                  $active={appliedFilters.categoryId === cat.id.toString()}
                  onClick={() => handleCategoryChipClick(cat.id)}
                >
                  {cat.name?.value || cat.name}
                </CategoryChip>
              ))}
            </CategoryChips>
          </Header>

          {/* Product Grid */}
          {loading ? (
            <SkeletonGrid>
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </SkeletonGrid>
          ) : products.length === 0 ? (
            <StateContainer>
              <StateIcon>
                <SearchIcon />
              </StateIcon>
              <StateTitle>No products found</StateTitle>
              <StateText>Try adjusting your filters or search criteria.</StateText>
              <StateButton onClick={handleClearFilters}>Clear Filters</StateButton>
            </StateContainer>
          ) : (
            <>
              <ProductGrid $viewMode={viewMode}>
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </ProductGrid>

              {pagination.totalPages > 1 && (
                <Pagination>
                  <PageButton
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.page === 1}
                  >
                    First
                  </PageButton>
                  <PageButton
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeftIcon />
                  </PageButton>

                  {renderPaginationNumbers}

                  <PageButton
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    <ChevronRightIcon />
                  </PageButton>
                  <PageButton
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Last
                  </PageButton>

                  <PageInfo>
                    Page {pagination.page} of {pagination.totalPages}
                  </PageInfo>
                </Pagination>
              )}
            </>
          )}
        </MainContent>
      </Container>
    </PageContainer>
  );
};

export default ProductList;
