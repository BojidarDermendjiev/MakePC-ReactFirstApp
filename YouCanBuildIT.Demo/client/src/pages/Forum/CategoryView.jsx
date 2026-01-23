import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as forumService from "../../api/forumService";
import { AuthContext } from "../../context/AuthContextProvider";

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

const TitleArea = styled.div``;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
`;

const CreateButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

const Breadcrumb = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ThreadList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ThreadCard = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
  border-left: ${(props) => (props.$pinned ? "4px solid #f59e0b" : "none")};

  &:hover {
    background: #f8fafc;
  }
`;

const ThreadInfo = styled.div`
  flex: 1;
`;

const ThreadTitle = styled.h4`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ThreadMeta = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const ThreadStats = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #888;
  font-size: 0.85rem;
`;

const Stat = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: ${(props) => (props.$active ? "#2563eb" : "white")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? "#1d4ed8" : "#f3f4f6")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #888;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  color: #888;
`;

export default function CategoryView() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [category, setCategory] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryData = await forumService.getCategoryBySlug(slug);
        setCategory(categoryData);

        const threadsData = await forumService.getThreads({
          page,
          size: 20,
          categoryId: categoryData.id,
        });
        setThreads(threadsData.items || []);
        setTotalPages(threadsData.totalPages || 1);
      } catch (error) {
        console.error("Error fetching category:", error);
        navigate("/forum");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, page, navigate]);

  if (loading) {
    return <Loading>{t("loading", "Loading...")}</Loading>;
  }

  if (!category) {
    return <Loading>{t("forum.categoryNotFound", "Category not found")}</Loading>;
  }

  return (
    <Container>
      <Breadcrumb>
        <Link to="/forum">{t("forum.title", "Forum")}</Link> / {category.name}
      </Breadcrumb>

      <Header>
        <TitleArea>
          <Title>{category.name}</Title>
          <Description>{category.description}</Description>
        </TitleArea>
        {isAuthenticated && (
          <CreateButton to={`/forum/create?categoryId=${category.id}`}>
            {t("forum.createThread", "Create Thread")}
          </CreateButton>
        )}
      </Header>

      {threads.length === 0 ? (
        <EmptyState>{t("forum.noThreads", "No threads yet. Be the first to post!")}</EmptyState>
      ) : (
        <ThreadList>
          {threads.map((thread) => (
            <ThreadCard key={thread.id} to={`/forum/thread/${thread.id}`} $pinned={thread.isPinned}>
              <ThreadInfo>
                <ThreadTitle>
                  {thread.isPinned && "📌 "}
                  {thread.isLocked && "🔒 "}
                  {thread.title}
                </ThreadTitle>
                <ThreadMeta>
                  {t("forum.by", "by")} {thread.authorName} •{" "}
                  {new Date(thread.createdAt).toLocaleDateString()}
                </ThreadMeta>
              </ThreadInfo>
              <ThreadStats>
                <Stat>👁 {thread.viewCount}</Stat>
                <Stat>💬 {thread.postCount}</Stat>
              </ThreadStats>
            </ThreadCard>
          ))}
        </ThreadList>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PageButton onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            {t("pagination.prev", "Prev")}
          </PageButton>
          {[...Array(totalPages)].map((_, i) => (
            <PageButton
              key={i + 1}
              $active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
            {t("pagination.next", "Next")}
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
}
