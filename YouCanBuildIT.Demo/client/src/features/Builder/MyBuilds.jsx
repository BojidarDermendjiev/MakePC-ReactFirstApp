import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContextProvider";
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

const BuildGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const BuildCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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

const CardPurpose = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const PublicBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #dcfce7;
  color: #166534;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
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
  gap: 0.75rem;
`;

const CardButton = styled(Link)`
  flex: 1;
  padding: 0.625rem 1rem;
  text-align: center;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;

  ${(props) =>
    props.$primary
      ? `
    background: #2563eb;
    color: white;
    &:hover { background: #1d4ed8; }
  `
      : `
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
    &:hover { background: #f3f4f6; }
  `}
`;

const DeleteButton = styled.button`
  padding: 0.625rem 1rem;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: #fecaca;
  }
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

const LoginPrompt = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #fef3c7;
  border-radius: 12px;

  h2 {
    color: #92400e;
    margin-bottom: 1rem;
  }

  a {
    color: #2563eb;
    font-weight: 600;
  }
`;

export default function MyBuilds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBuilds();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchBuilds = async () => {
    try {
      const data = await buildService.getMyBuilds();
      setBuilds(data || []);
    } catch (error) {
      console.error("Error fetching builds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("builder.confirmDelete", "Are you sure you want to delete this build?"))) {
      return;
    }

    try {
      await buildService.deleteBuild(id);
      setBuilds(builds.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting build:", error);
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

  if (!isAuthenticated) {
    return (
      <Container>
        <LoginPrompt>
          <h2>{t("builder.loginRequired", "Login Required")}</h2>
          <p>
            {t("builder.loginToView", "Please")}{" "}
            <Link to="/login">{t("builder.login", "log in")}</Link>{" "}
            {t("builder.toViewBuilds", "to view your saved builds.")}
          </p>
        </LoginPrompt>
      </Container>
    );
  }

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
        <Title>{t("builder.myBuilds", "My Builds")}</Title>
        <NewBuildButton to="/builder">
          ➕ {t("builder.newBuild", "New Build")}
        </NewBuildButton>
      </Header>

      {builds.length > 0 ? (
        <BuildGrid>
          {builds.map((build) => (
            <BuildCard key={build.id}>
              <CardHeader>
                <CardTitle>{build.name}</CardTitle>
                <CardPurpose>{build.purpose}</CardPurpose>
                {build.isPublic && <PublicBadge>{t("builder.public", "Public")}</PublicBadge>}
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
                  {build.items?.slice(0, 6).map((item) => (
                    <ComponentBadge key={item.id}>
                      {getComponentIcon(item.componentType)} {item.componentType}
                    </ComponentBadge>
                  ))}
                  {build.items?.length > 6 && (
                    <ComponentBadge>+{build.items.length - 6}</ComponentBadge>
                  )}
                </ComponentPreview>
              </CardBody>
              <CardFooter>
                <CardButton to={`/builder/${build.id}`} $primary>
                  {t("builder.edit", "Edit")}
                </CardButton>
                <CardButton to={`/builder/compare/${build.id}`}>
                  {t("builder.compare", "Compare")}
                </CardButton>
                <DeleteButton onClick={() => handleDelete(build.id)}>
                  {t("builder.delete", "Delete")}
                </DeleteButton>
              </CardFooter>
            </BuildCard>
          ))}
        </BuildGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>🖥️</EmptyIcon>
          <EmptyTitle>{t("builder.noBuilds", "No Builds Yet")}</EmptyTitle>
          <EmptyText>
            {t("builder.createFirst", "Create your first PC build to get started!")}
          </EmptyText>
          <NewBuildButton to="/builder">
            ➕ {t("builder.createBuild", "Create Build")}
          </NewBuildButton>
        </EmptyState>
      )}
    </Container>
  );
}
