import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { useSearchParams, Link } from "react-router-dom";
import { getAllListings } from "../../api/secondHandListingService";
import { getAllCategories } from "../../api/categoryService";
import { getAllBrands } from "../../api/brandService";
import { SecondHandCard, SecondHandCardSkeleton } from "./SecondHandCard";
import { AuthContext } from "../../context/AuthContextProvider";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

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

const Sidebar = styled.aside`
  animation: ${slideIn} 0.4s ease;

  @media (max-width: 1024px) {
    display: ${(props) => (props.$mobileOpen ? "block" : "none")};
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

  &:focus {
    outline: none;
    border-color: #c7f022;
    box-shadow: 0 0 0 3px rgba(199, 240, 34, 0.2);
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #c7f022;
    box-shadow: 0 0 0 3px rgba(199, 240, 34, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PriceInputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const PriceInput = styled(FilterInput)`
  flex: 1;
  width: auto;
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

const CreateButton = styled(Link)`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

const ListingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

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
  border: 2px solid ${(props) => (props.$active ? "#c7f022" : "#e5e7eb")};
  border-radius: 10px;
  background: ${(props) =>
    props.$active ? "linear-gradient(135deg, #c7f022 0%, #a8d810 100%)" : "#fff"};
  color: ${(props) => (props.$active ? "#1f2937" : "#4b5563")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: #c7f022;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  padding: 0 16px;
  color: #6b7280;
  font-size: 14px;
`;

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

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

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
        if (params[key] === "" || params[key] === null || params[key] === undefined) {
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
    if (appliedFilters.categoryId) params.set("category", appliedFilters.categoryId);
    if (appliedFilters.brandId) params.set("brand", appliedFilters.brandId);
    if (appliedFilters.minPrice) params.set("minPrice", appliedFilters.minPrice);
    if (appliedFilters.maxPrice) params.set("maxPrice", appliedFilters.maxPrice);
    if (appliedFilters.search) params.set("search", appliedFilters.search);
    if (appliedFilters.sortBy !== "date") params.set("sortBy", appliedFilters.sortBy);
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
      const newFilters = { ...appliedFilters, sortBy, sortDesc: sortDesc === "desc" };
      setFilters(newFilters);
      setAppliedFilters(newFilters);
    },
    [appliedFilters]
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
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton key={i} $active={pagination.page === i} onClick={() => handlePageChange(i)}>
          {i}
        </PageButton>
      );
    }
    return pages;
  }, [pagination.page, pagination.totalPages, handlePageChange]);

  return (
    <PageContainer>
      <Container>
        <Sidebar $mobileOpen={mobileFiltersOpen}>
          <SidebarContent>
            <SidebarHeader>
              <SidebarTitle>Filters</SidebarTitle>
              {hasActiveFilters && <ClearButton onClick={handleClearFilters}>Clear All</ClearButton>}
            </SidebarHeader>

            <FilterSection>
              <FilterLabel>Search</FilterLabel>
              <FilterInput
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search listings..."
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
              <FilterLabel>Price Range (BGN)</FilterLabel>
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

        <MainContent>
          <Header>
            <TopRow>
              <TitleSection>
                <Title>Second Hand Marketplace</Title>
                <ResultCount>
                  {pagination.totalCount} listing{pagination.totalCount !== 1 ? "s" : ""} found
                </ResultCount>
              </TitleSection>

              <ViewControls>
                <MobileFilterButton onClick={() => setMobileFiltersOpen(true)}>
                  Filters
                </MobileFilterButton>

                <SortSelect value={sortValue} onChange={handleSortChange}>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="price-desc">Price (High-Low)</option>
                  <option value="views-desc">Most Viewed</option>
                  <option value="title-asc">Title (A-Z)</option>
                </SortSelect>

                {isAuthenticated && (
                  <CreateButton to="/secondhand/create">
                    <PlusIcon />
                    Sell Item
                  </CreateButton>
                )}
              </ViewControls>
            </TopRow>
          </Header>

          {loading ? (
            <SkeletonGrid>
              {[...Array(8)].map((_, i) => (
                <SecondHandCardSkeleton key={i} />
              ))}
            </SkeletonGrid>
          ) : listings.length === 0 ? (
            <StateContainer>
              <StateIcon>
                <SearchIcon />
              </StateIcon>
              <StateTitle>No listings found</StateTitle>
              <StateText>Try adjusting your filters or search criteria.</StateText>
              <StateButton onClick={handleClearFilters}>Clear Filters</StateButton>
            </StateContainer>
          ) : (
            <>
              <ListingGrid>
                {listings.map((listing, index) => (
                  <SecondHandCard key={listing.id} listing={listing} index={index} />
                ))}
              </ListingGrid>

              {pagination.totalPages > 1 && (
                <Pagination>
                  <PageButton onClick={() => handlePageChange(1)} disabled={pagination.page === 1}>
                    First
                  </PageButton>
                  <PageButton
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Prev
                  </PageButton>

                  {renderPaginationNumbers}

                  <PageButton
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
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

export default SecondHandList;
