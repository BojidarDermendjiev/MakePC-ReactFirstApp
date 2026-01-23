import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as newsService from "../../api/newsService";
import { CommentList } from "../../features/Comments";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Breadcrumb = styled.div`
  margin-bottom: 1.5rem;
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

const Article = styled.article`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const HeroImage = styled.div`
  height: 400px;
  background: ${(props) => (props.$src ? `url(${props.$src})` : "#e5e7eb")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 5rem;
`;

const Content = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const Meta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9rem;
  color: #666;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Tag = styled(Link)`
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: #bae6fd;
  }
`;

const Body = styled.div`
  line-height: 1.8;
  color: #333;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
    color: #222;
  }

  h3 {
    font-size: 1.25rem;
    margin: 1.5rem 0 0.75rem;
    color: #333;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 4px solid #2563eb;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    color: #555;
    font-style: italic;
  }

  code {
    background: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre {
    background: #1f2937;
    color: #e5e7eb;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    margin-bottom: 1.5rem;

    code {
      background: none;
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 1.5rem 0;
  }
`;

const SourceLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  background: #eff6ff;
  border-radius: 6px;
  margin-top: 2rem;
  transition: background 0.2s;

  &:hover {
    background: #dbeafe;
  }
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #888;
`;

export default function NewsArticle() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const data = await newsService.getNewsBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate("/news");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug, navigate]);

  if (loading) {
    return <Loading>{t("loading", "Loading...")}</Loading>;
  }

  if (!article) {
    return <Loading>{t("news.notFound", "Article not found")}</Loading>;
  }

  return (
    <Container>
      <Breadcrumb>
        <Link to="/news">{t("news.title", "News")}</Link> / {article.title}
      </Breadcrumb>

      <Article>
        {article.imageUrl && <HeroImage $src={article.imageUrl} />}
        <Content>
          <Title>{article.title}</Title>
          <Meta>
            <MetaItem>
              <span>👤</span> {article.authorName}
            </MetaItem>
            <MetaItem>
              <span>📅</span> {new Date(article.publishedAt).toLocaleDateString()}
            </MetaItem>
            <MetaItem>
              <span>👁</span> {article.viewCount} {t("news.views", "views")}
            </MetaItem>
          </Meta>

          {article.tags?.length > 0 && (
            <TagList>
              {article.tags.map((tag, i) => (
                <Tag key={i} to={`/news/tag/${tag}`}>
                  {tag}
                </Tag>
              ))}
            </TagList>
          )}

          <Body dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />

          {article.sourceUrl && (
            <SourceLink href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
              🔗 {t("news.readOriginal", "Read Original Source")}
            </SourceLink>
          )}
        </Content>
      </Article>

      <CommentsSection>
        <CommentsTitle>{t("news.comments", "Comments")}</CommentsTitle>
        <CommentList entityType="News" entityId={article.id} />
      </CommentsSection>
    </Container>
  );
}
