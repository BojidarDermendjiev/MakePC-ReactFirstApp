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

const Header = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ThreadMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  gap: 1rem;
`;

const Badge = styled.span`
  background: ${(props) => (props.$type === "pinned" ? "#fef3c7" : "#fee2e2")};
  color: ${(props) => (props.$type === "pinned" ? "#92400e" : "#991b1b")};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #666;
`;

const AuthorName = styled.span`
  font-weight: 500;
  color: #333;
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: #888;
`;

const PostBody = styled.div`
  padding: 1.5rem;
  line-height: 1.6;
  color: #333;

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const PostActions = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.75rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const ReplySection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const ReplyTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ReplyTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 2rem;

  a {
    color: #2563eb;
  }
`;

const LockedNotice = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #fef3c7;
  border-radius: 8px;
  margin-top: 2rem;
  color: #92400e;
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

export default function ThreadView() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useContext(AuthContext);
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchThread = async () => {
      setLoading(true);
      try {
        const threadData = await forumService.getThreadById(id);
        setThread(threadData);
        setPosts(threadData.posts || []);
      } catch (error) {
        console.error("Error fetching thread:", error);
        navigate("/forum");
      } finally {
        setLoading(false);
      }
    };
    fetchThread();
  }, [id, navigate]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSubmitting(true);
    try {
      const newPost = await forumService.createPost({
        threadId: id,
        bodyHtml: replyText,
      });
      setPosts([...posts, newPost]);
      setReplyText("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(t("forum.errorCreatingPost", "Error creating post"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm(t("forum.confirmDeletePost", "Are you sure you want to delete this post?"))) {
      return;
    }

    try {
      await forumService.deletePost(postId);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(t("forum.errorDeletingPost", "Error deleting post"));
    }
  };

  if (loading) {
    return <Loading>{t("loading", "Loading...")}</Loading>;
  }

  if (!thread) {
    return <Loading>{t("forum.threadNotFound", "Thread not found")}</Loading>;
  }

  return (
    <Container>
      <Breadcrumb>
        <Link to="/forum">{t("forum.title", "Forum")}</Link> /{" "}
        <Link to={`/forum/category/${thread.categoryName?.toLowerCase().replace(/\s+/g, "-")}`}>
          {thread.categoryName}
        </Link>{" "}
        / {thread.title}
      </Breadcrumb>

      <Header>
        <Title>
          {thread.isPinned && <Badge $type="pinned">{t("forum.pinned", "Pinned")}</Badge>}{" "}
          {thread.isLocked && <Badge $type="locked">{t("forum.locked", "Locked")}</Badge>}{" "}
          {thread.title}
        </Title>
        <ThreadMeta>
          <span>{t("forum.by", "by")} {thread.authorName}</span>
          <span>{new Date(thread.createdAt).toLocaleString()}</span>
          <span>👁 {thread.viewCount} {t("forum.views", "views")}</span>
        </ThreadMeta>
      </Header>

      <PostList>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostHeader>
              <AuthorInfo>
                <Avatar>{post.authorName?.charAt(0).toUpperCase()}</Avatar>
                <div>
                  <AuthorName>{post.authorName}</AuthorName>
                </div>
              </AuthorInfo>
              <PostDate>
                {new Date(post.createdAt).toLocaleString()}
                {post.isEdited && ` (${t("forum.edited", "edited")})`}
              </PostDate>
            </PostHeader>
            <PostBody dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
            {isAuthenticated && post.authorId === userId && !thread.isLocked && (
              <PostActions>
                <ActionButton onClick={() => handleDeletePost(post.id)}>
                  {t("forum.delete", "Delete")}
                </ActionButton>
              </PostActions>
            )}
          </PostCard>
        ))}
      </PostList>

      {thread.isLocked ? (
        <LockedNotice>{t("forum.threadLocked", "This thread is locked. No new replies can be posted.")}</LockedNotice>
      ) : isAuthenticated ? (
        <ReplySection>
          <ReplyTitle>{t("forum.postReply", "Post a Reply")}</ReplyTitle>
          <form onSubmit={handleSubmitReply}>
            <ReplyTextarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={t("forum.replyPlaceholder", "Write your reply here...")}
            />
            <SubmitButton type="submit" disabled={submitting || !replyText.trim()}>
              {submitting ? t("forum.posting", "Posting...") : t("forum.postReply", "Post Reply")}
            </SubmitButton>
          </form>
        </ReplySection>
      ) : (
        <LoginPrompt>
          <Link to="/login">{t("forum.loginToReply", "Log in to reply to this thread")}</Link>
        </LoginPrompt>
      )}
    </Container>
  );
}
