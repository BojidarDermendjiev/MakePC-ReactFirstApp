import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: ${(props) => (props.$compact ? "60px" : "100px")};
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #c7f022;
    box-shadow: 0 0 0 3px rgba(199, 240, 34, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

const CancelButton = styled(Button)`
  background: #f3f4f6;
  color: #6b7280;

  &:hover:not(:disabled) {
    background: #e5e7eb;
  }
`;

const LoginPrompt = styled.div`
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;

  a {
    color: #1f2937;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CommentForm = ({
  onSubmit,
  onCancel,
  initialValue = "",
  placeholder = "Write a comment...",
  submitLabel = "Post Comment",
  compact = false,
  isAuthenticated = false,
}) => {
  const [content, setContent] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || loading) return;

    setLoading(true);
    try {
      await onSubmit(content.trim());
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginPrompt>
        Please <a href="/login">sign in</a> to leave a comment.
      </LoginPrompt>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        $compact={compact}
      />
      <ButtonRow>
        {onCancel && (
          <CancelButton type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </CancelButton>
        )}
        <SubmitButton type="submit" disabled={!content.trim() || loading}>
          {loading ? "Posting..." : submitLabel}
        </SubmitButton>
      </ButtonRow>
    </Form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  submitLabel: PropTypes.string,
  compact: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

export default CommentForm;
