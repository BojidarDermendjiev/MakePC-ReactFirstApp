import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as buildService from "../../api/buildService";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const NewBuildButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const BuildGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const BuildCard = styled(Link)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
`;

const CardPurpose = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.$color || "#333"};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ComponentPreview = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ComponentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #4b5563;
`;

const CardFooter = styled.div`
  padding: 1rem 1.25rem;
  background: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewButton = styled.span`
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
`;

const AuthorInfo = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.$active ? "#2563eb" : "#d1d5db")};
  background: ${(props) => (props.$active ? "#eff6ff" : "white")};
  color: ${(props) => (props.$active ? "#2563eb" : "#374151")};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
  }
`;

export default function PublicBuilds() {
  const { t } = useTranslation();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBuilds();
  }, []);

  const fetchBuilds = async () => {
    try {
      const data = await buildService.getPublicBuilds(50);
      setBuilds(data || []);
    } catch (error) {
      console.error("Error fetching public builds:", error);
    } finally {
      setLoading(false);
    }
  };

  const getComponentIcon = (type) => {
    const icons = {
      CPU: "🧠",
      Motherboard: "📟",
      RAM: "💾",
      GPU: "🎮",
      Storage: "💿",
      PSU: "⚡",
      Case: "🖥️",
      Cooler: "❄️",
    };
    return icons[type] || "🔧";
  };

  const filteredBuilds = filter === "all"
    ? builds
    : builds.filter((b) => b.purpose?.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return (
      <Container>
        <Loading>{t("loading", "Loading...")}</Loading>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t("builder.communityBuilds", "Community Builds")}</Title>
        <NewBuildButton to="/builder">
          ➕ {t("builder.createYourOwn", "Create Your Own")}
        </NewBuildButton>
      </Header>

      <Description>
        {t("builder.communityDescription", "Get inspired by builds from other PC enthusiasts. See what components they chose and use them as a starting point for your own build.")}
      </Description>

      <FilterBar>
        <FilterButton $active={filter === "all"} onClick={() => setFilter("all")}>
          {t("builder.all", "All")}
        </FilterButton>
        <FilterButton $active={filter === "gaming"} onClick={() => setFilter("gaming")}>
          🎮 {t("builder.gaming", "Gaming")}
        </FilterButton>
        <FilterButton $active={filter === "office"} onClick={() => setFilter("office")}>
          💼 {t("builder.office", "Office")}
        </FilterButton>
        <FilterButton $active={filter === "content creation"} onClick={() => setFilter("content creation")}>
          🎬 {t("builder.content", "Content Creation")}
        </FilterButton>
        <FilterButton $active={filter === "workstation"} onClick={() => setFilter("workstation")}>
          🔧 {t("builder.workstation", "Workstation")}
        </FilterButton>
        <FilterButton $active={filter === "budget"} onClick={() => setFilter("budget")}>
          💰 {t("builder.budget", "Budget")}
        </FilterButton>
      </FilterBar>

      {filteredBuilds.length > 0 ? (
        <BuildGrid>
          {filteredBuilds.map((build) => (
            <BuildCard key={build.id} to={`/builder/view/${build.id}`}>
              <CardHeader>
                <CardTitle>{build.name}</CardTitle>
                <CardMeta>
                  <CardPurpose>{build.purpose}</CardPurpose>
                  <span>👤 {build.userName}</span>
                </CardMeta>
              </CardHeader>
              <CardBody>
                <StatsRow>
                  <Stat>
                    <StatValue $color="#2563eb">{build.totalPriceBgn?.toFixed(2)} лв.</StatValue>
                    <StatLabel>{t("builder.totalPrice", "Total Price")}</StatLabel>
                  </Stat>
                  <Stat>
                    <StatValue>{build.componentCount || 0}</StatValue>
                    <StatLabel>{t("builder.components", "Components")}</StatLabel>
                  </Stat>
                  <Stat>
                    <StatValue $color={build.isComplete ? "#10b981" : "#f59e0b"}>
                      {build.isComplete ? "✓" : "○"}
                    </StatValue>
                    <StatLabel>
                      {build.isComplete
                        ? t("builder.complete", "Complete")
                        : t("builder.incomplete", "Incomplete")}
                    </StatLabel>
                  </Stat>
                </StatsRow>
                <ComponentPreview>
                  {build.items?.slice(0, 4).map((item) => (
                    <ComponentBadge key={item.id}>
                      {getComponentIcon(item.componentType)} {item.componentType}
                    </ComponentBadge>
                  ))}
                  {build.items?.length > 4 && (
                    <ComponentBadge>+{build.items.length - 4}</ComponentBadge>
                  )}
                </ComponentPreview>
              </CardBody>
              <CardFooter>
                <AuthorInfo>
                  {new Date(build.createdAt).toLocaleDateString()}
                </AuthorInfo>
                <ViewButton>{t("builder.viewBuild", "View Build")}</ViewButton>
              </CardFooter>
            </BuildCard>
          ))}
        </BuildGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>🌐</EmptyIcon>
          <EmptyTitle>{t("builder.noPublicBuilds", "No Public Builds Yet")}</EmptyTitle>
          <EmptyText>
            {t("builder.beFirst", "Be the first to share a build with the community!")}
          </EmptyText>
          <NewBuildButton to="/builder">
            ➕ {t("builder.createBuild", "Create Build")}
          </NewBuildButton>
        </EmptyState>
      )}
    </Container>
  );
}
