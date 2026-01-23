import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as forumService from "../../api/forumService";

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

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CategoryCard = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  color: #2563eb;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const CategoryStats = styled.div`
  text-align: right;
  color: #888;
  font-size: 0.85rem;
`;

const RecentThreads = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
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

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #888;
`;

export default function ForumHome() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [recentThreads, setRecentThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, threadsRes] = await Promise.all([
          forumService.getCategories(),
          forumService.getThreads({ page: 1, size: 10 }),
        ]);
        setCategories(categoriesRes);
        setRecentThreads(threadsRes.items || []);
      } catch (error) {
        console.error("Error fetching forum data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading>{t("loading", "Loading...")}</Loading>;
  }

  return (
    <Container>
      <Header>
        <Title>{t("forum.title", "Forum")}</Title>
      </Header>

      <CategoryList>
        {categories.map((category) => (
          <CategoryCard key={category.id} to={`/forum/category/${category.slug}`}>
            <CategoryInfo>
              <CategoryName>{category.name}</CategoryName>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryInfo>
            <CategoryStats>
              <div>{category.threadCount} {t("forum.threads", "threads")}</div>
            </CategoryStats>
          </CategoryCard>
        ))}
      </CategoryList>

      <RecentThreads>
        <SectionTitle>{t("forum.recentThreads", "Recent Threads")}</SectionTitle>
        <ThreadList>
          {recentThreads.map((thread) => (
            <ThreadCard key={thread.id} to={`/forum/thread/${thread.id}`}>
              <ThreadInfo>
                <ThreadTitle>
                  {thread.isPinned && "📌 "}
                  {thread.isLocked && "🔒 "}
                  {thread.title}
                </ThreadTitle>
                <ThreadMeta>
                  {t("forum.by", "by")} {thread.authorName} • {thread.categoryName}
                </ThreadMeta>
              </ThreadInfo>
              <ThreadStats>
                <Stat>👁 {thread.viewCount}</Stat>
                <Stat>💬 {thread.postCount}</Stat>
              </ThreadStats>
            </ThreadCard>
          ))}
        </ThreadList>
      </RecentThreads>
    </Container>
  );
}
