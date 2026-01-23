import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactionButtons from "./ReactionButtons";
import CommentForm from "./CommentForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.$isReply ? "12px 0 12px 24px" : "16px 0")};
  border-bottom: ${(props) => (props.$isReply ? "none" : "1px solid #f3f4f6")};

  &:last-child {
    border-bottom: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AuthorName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

const Body = styled.div`
  margin-left: 48px;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 48px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  background: none;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #1f2937;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ReplyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const RepliesContainer = styled.div`
  margin-left: 24px;
  border-left: 2px solid #f3f4f6;
`;

const ShowRepliesButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 48px;
  margin-top: 8px;
  padding: 4px 0;
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #1f2937;
  }
`;

const ReplyFormContainer = styled.div`
  margin-left: 48px;
  margin-top: 12px;
`;

const EditedBadge = styled.span`
  font-size: 11px;
  color: #9ca3af;
  margin-left: 8px;
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const CommentItem = ({
  comment,
  currentUserId,
  isAuthenticated,
  onReact,
  onReply,
  onEdit,
  onDelete,
  isReply = false,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = currentUserId === comment.authorId;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReact = async (reactionType) => {
    await onReact(comment.id, reactionType);
  };

  const handleReply = async (content) => {
    await onReply(comment.id, content);
    setShowReplyForm(false);
  };

  const handleEdit = async (content) => {
    await onEdit(comment.id, content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await onDelete(comment.id);
    }
  };

  return (
    <Container $isReply={isReply}>
      <Header>
        <Avatar>{getInitials(comment.authorName)}</Avatar>
        <AuthorInfo>
          <AuthorName>
            {comment.authorName}
            {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
              <EditedBadge>(edited)</EditedBadge>
            )}
          </AuthorName>
          <Timestamp>{formatDate(comment.createdAt)}</Timestamp>
        </AuthorInfo>
      </Header>

      {isEditing ? (
        <ReplyFormContainer>
          <CommentForm
            onSubmit={handleEdit}
            onCancel={() => setIsEditing(false)}
            initialValue={comment.bodyHtml}
            submitLabel="Save"
            compact
            isAuthenticated
          />
        </ReplyFormContainer>
      ) : (
        <Body dangerouslySetInnerHTML={{ __html: comment.bodyHtml }} />
      )}

      {!isEditing && (
        <Actions>
          <ReactionButtons
            likeCount={comment.likeCount}
            dislikeCount={comment.dislikeCount}
            currentUserReaction={comment.currentUserReaction}
            onReact={handleReact}
            disabled={!isAuthenticated}
          />
          {isAuthenticated && !isReply && (
            <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
              <ReplyIcon />
              Reply
            </ActionButton>
          )}
          {isOwner && (
            <>
              <ActionButton onClick={() => setIsEditing(true)}>
                <EditIcon />
                Edit
              </ActionButton>
              <ActionButton onClick={handleDelete}>
                <DeleteIcon />
                Delete
              </ActionButton>
            </>
          )}
        </Actions>
      )}

      {showReplyForm && (
        <ReplyFormContainer>
          <CommentForm
            onSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
            placeholder={`Reply to ${comment.authorName}...`}
            submitLabel="Reply"
            compact
            isAuthenticated
          />
        </ReplyFormContainer>
      )}

      {hasReplies && (
        <>
          <ShowRepliesButton onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
            {comment.replies.length === 1 ? "reply" : "replies"}
          </ShowRepliesButton>
          {showReplies && (
            <RepliesContainer>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  isAuthenticated={isAuthenticated}
                  onReact={onReact}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isReply
                />
              ))}
            </RepliesContainer>
          )}
        </>
      )}
    </Container>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    bodyHtml: PropTypes.string.isRequired,
    likeCount: PropTypes.number,
    dislikeCount: PropTypes.number,
    currentUserReaction: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    replies: PropTypes.array,
  }).isRequired,
  currentUserId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  onReact: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isReply: PropTypes.bool,
};

export default CommentItem;
