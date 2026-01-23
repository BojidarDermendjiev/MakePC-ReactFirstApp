import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as newsService from "../../api/newsService";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Subtitle = styled.p`
  color: #666;
  margin-top: 0.5rem;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const NewsCard = styled(Link)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const NewsImage = styled.div`
  height: 200px;
  background: ${(props) => (props.$src ? `url(${props.$src})` : "#e5e7eb")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 3rem;
`;

const NewsContent = styled.div`
  padding: 1.25rem;
`;

const NewsTitle = styled.h3`
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const NewsSummary = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

const Tag = styled.span`
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
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

export default function NewsHome() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await newsService.getNews({ page, size: 12 });
        setNews(data.items || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  if (loading) {
    return <Loading>{t("loading", "Loading...")}</Loading>;
  }

  return (
    <Container>
      <Header>
        <Title>{t("news.title", "Hardware News")}</Title>
        <Subtitle>{t("news.subtitle", "Latest updates from the tech world")}</Subtitle>
      </Header>

      {news.length === 0 ? (
        <EmptyState>{t("news.noNews", "No news articles yet")}</EmptyState>
      ) : (
        <NewsGrid>
          {news.map((article) => (
            <NewsCard key={article.id} to={`/news/${article.slug}`}>
              <NewsImage $src={article.imageUrl}>
                {!article.imageUrl && "📰"}
              </NewsImage>
              <NewsContent>
                {article.tags?.length > 0 && (
                  <TagList>
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <Tag key={i}>{tag}</Tag>
                    ))}
                  </TagList>
                )}
                <NewsTitle>{article.title}</NewsTitle>
                <NewsSummary>{article.summary}</NewsSummary>
                <NewsMeta>
                  <span>{article.authorName}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </NewsMeta>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PageButton onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            {t("pagination.prev", "Prev")}
          </PageButton>
          {[...Array(Math.min(totalPages, 5))].map((_, i) => (
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
