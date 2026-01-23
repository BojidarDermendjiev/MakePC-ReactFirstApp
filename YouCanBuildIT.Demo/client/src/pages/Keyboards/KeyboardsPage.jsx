import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import KeyboardCard from "./KeyboardCard";
import KeyboardFilters from "./KeyboardFilters";
import { getKeyboards } from "../../api/keyboardService";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 24px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #6b7280;

  a {
    color: #6b7280;
    text-decoration: none;
    &:hover {
      color: #1f2937;
    }
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 12px;
`;

const QuickLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c7f022;
    background: #f7fee7;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FiltersColumn = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ProductsColumn = styled.div``;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

const ResultsCount = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SortLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #c7f022;
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  width: 280px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #c7f022;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 16px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const EmptySubtext = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
`;

const PageButton = styled.button`
  padding: 8px 14px;
  border: 1px solid ${(props) => (props.$active ? "#c7f022" : "#e5e7eb")};
  border-radius: 8px;
  background: ${(props) => (props.$active ? "#c7f022" : "#fff")};
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  color: #1f2937;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #c7f022;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SkeletonCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SkeletonImage = styled.div`
  padding-top: 66%;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonContent = styled.div`
  padding: 16px;
`;

const SkeletonText = styled.div`
  height: ${(props) => props.$height || "14px"};
  width: ${(props) => props.$width || "100%"};
  border-radius: 4px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: ${(props) => props.$mb || "0"};
`;

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
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  // Parse filters from URL
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

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== false) {
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
    <PageContainer>
      <Container>
        <Header>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Keyboards</span>
          </Breadcrumb>
          <TitleRow>
            <Title>Mechanical Keyboards</Title>
            <QuickLinks>
              <QuickLink to="/keyboards/switch-guide">
                <GuideIcon />
                Switch Guide
              </QuickLink>
              <QuickLink to="/keyboards/size-guide">
                <SizeIcon />
                Size Guide
              </QuickLink>
            </QuickLinks>
          </TitleRow>
        </Header>

        <MainContent>
          <FiltersColumn>
            <KeyboardFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </FiltersColumn>

          <ProductsColumn>
            <TopBar>
              <ResultsCount>
                {loading ? "Loading..." : `${totalCount} keyboards found`}
              </ResultsCount>
              <SortRow>
                <SearchInput
                  type="text"
                  placeholder="Search keyboards..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <SortLabel>Sort by:</SortLabel>
                <SortSelect
                  value={`${filters.sortBy || "name"}-${filters.sortDescending ? "desc" : "asc"}`}
                  onChange={handleSort}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="brand-asc">Brand (A-Z)</option>
                </SortSelect>
              </SortRow>
            </TopBar>

            <ProductsGrid>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i}>
                    <SkeletonImage />
                    <SkeletonContent>
                      <SkeletonText $width="60px" $height="12px" $mb="8px" />
                      <SkeletonText $width="90%" $height="18px" $mb="12px" />
                      <SkeletonText $width="100%" $height="14px" $mb="6px" />
                      <SkeletonText $width="80%" $height="14px" $mb="12px" />
                      <SkeletonText $width="40%" $height="24px" />
                    </SkeletonContent>
                  </SkeletonCard>
                ))
              ) : keyboards.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>⌨️</EmptyIcon>
                  <EmptyText>No keyboards found</EmptyText>
                  <EmptySubtext>Try adjusting your filters or search term</EmptySubtext>
                </EmptyState>
              ) : (
                keyboards.map((keyboard, index) => (
                  <KeyboardCard key={keyboard.id} keyboard={keyboard} index={index} />
                ))
              )}
            </ProductsGrid>

            {!loading && totalPages > 1 && (
              <Pagination>
                <PageButton
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page <= 1}
                >
                  Previous
                </PageButton>
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
                    <PageButton
                      key={pageNum}
                      $active={filters.page === pageNum}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PageButton>
                  );
                })}
                <PageButton
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page >= totalPages}
                >
                  Next
                </PageButton>
              </Pagination>
            )}
          </ProductsColumn>
        </MainContent>
      </Container>
    </PageContainer>
  );
};

export default KeyboardsPage;
