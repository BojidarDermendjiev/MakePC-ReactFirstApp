import { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import commentService from "../../api/commentService";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Container = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Count = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 12px;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #c7f022;
  }
`;

const FormContainer = styled.div`
  margin-bottom: 24px;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #9ca3af;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const LoadMoreButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #c7f022;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background: #fef2f2;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
`;

const SkeletonComment = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const SkeletonAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonText = styled.div`
  height: ${(props) => props.$height || "14px"};
  width: ${(props) => props.$width || "100%"};
  border-radius: 4px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonBody = styled.div`
  margin-left: 48px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentSkeleton = () => (
  <SkeletonComment>
    <SkeletonHeader>
      <SkeletonAvatar />
      <div>
        <SkeletonText $width="120px" $height="14px" style={{ marginBottom: "4px" }} />
        <SkeletonText $width="80px" $height="12px" />
      </div>
    </SkeletonHeader>
    <SkeletonBody>
      <SkeletonText $width="100%" />
      <SkeletonText $width="80%" />
      <SkeletonText $width="60%" />
    </SkeletonBody>
  </SkeletonComment>
);

export const CommentList = ({
  entityType,
  entityId,
  currentUserId,
  isAuthenticated = false,
}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchComments = useCallback(async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const response = await commentService.getCommentsByEntity(
        entityType,
        entityId,
        pageNum,
        20
      );

      if (append) {
        setComments((prev) => [...prev, ...response.comments]);
      } else {
        setComments(response.comments);
      }
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
      setPage(pageNum);
    } catch (err) {
      setError("Failed to load comments. Please try again.");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    fetchComments(1);
  }, [fetchComments]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchComments(page + 1, true);
    }
  };

  const handleCreate = async (content) => {
    try {
      const newComment = await commentService.createComment({
        entityType,
        entityId,
        bodyHtml: content,
      });
      setComments((prev) => [newComment, ...prev]);
      setTotalCount((prev) => prev + 1);
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      throw err;
    }
  };

  const handleReply = async (parentId, content) => {
    try {
      const reply = await commentService.createComment({
        entityType,
        entityId,
        parentId,
        bodyHtml: content,
      });

      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          return comment;
        })
      );
    } catch (err) {
      setError("Failed to post reply. Please try again.");
      throw err;
    }
  };

  const handleEdit = async (commentId, content) => {
    try {
      const updated = await commentService.updateComment(commentId, {
        bodyHtml: content,
      });

      const updateComment = (comments) =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, ...updated };
          }
          if (comment.replies) {
            return { ...comment, replies: updateComment(comment.replies) };
          }
          return comment;
        });

      setComments(updateComment);
    } catch (err) {
      setError("Failed to update comment. Please try again.");
      throw err;
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);

      const removeComment = (comments) =>
        comments
          .filter((comment) => comment.id !== commentId)
          .map((comment) => ({
            ...comment,
            replies: comment.replies ? removeComment(comment.replies) : [],
          }));

      setComments(removeComment);
      setTotalCount((prev) => prev - 1);
    } catch (err) {
      setError("Failed to delete comment. Please try again.");
      throw err;
    }
  };

  const handleReact = async (commentId, reactionType) => {
    try {
      const updated = await commentService.reactToComment(commentId, reactionType);

      const updateReaction = (comments) =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likeCount: updated.likeCount,
              dislikeCount: updated.dislikeCount,
              currentUserReaction: updated.currentUserReaction,
            };
          }
          if (comment.replies) {
            return { ...comment, replies: updateReaction(comment.replies) };
          }
          return comment;
        });

      setComments(updateReaction);
    } catch (err) {
      setError("Failed to react. Please try again.");
      throw err;
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Comments</Title>
        </Header>
        {[1, 2, 3].map((i) => (
          <CommentSkeleton key={i} />
        ))}
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          Comments
          {totalCount > 0 && <Count>{totalCount}</Count>}
        </Title>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormContainer>
        <CommentForm
          onSubmit={handleCreate}
          placeholder="Share your thoughts..."
          isAuthenticated={isAuthenticated}
        />
      </FormContainer>

      <CommentsContainer>
        {comments.length === 0 ? (
          <EmptyState>
            <EmptyIcon>💬</EmptyIcon>
            <EmptyText>No comments yet. Be the first to share your thoughts!</EmptyText>
          </EmptyState>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              onReact={handleReact}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </CommentsContainer>

      {page < totalPages && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loadingMore}>
          {loadingMore ? "Loading..." : `Load more comments (${totalCount - comments.length} remaining)`}
        </LoadMoreButton>
      )}
    </Container>
  );
};

CommentList.propTypes = {
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

export default CommentList;
