import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as forumService from "../../api/forumService";
import { AuthContext } from "../../context/AuthContextProvider";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const SubmitButton = styled(Button)`
  background: #2563eb;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: #666;
  border: 1px solid #ddd;

  &:hover {
    background: #f3f4f6;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export default function CreateThread() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    forumCategoryId: searchParams.get("categoryId") || "",
    title: "",
    initialPostBody: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchCategories = async () => {
      try {
        const data = await forumService.getCategories();
        setCategories(data);
        if (!formData.forumCategoryId && data.length > 0) {
          setFormData((prev) => ({ ...prev, forumCategoryId: data[0].id }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [isAuthenticated, navigate, formData.forumCategoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError(t("forum.titleRequired", "Title is required"));
      return;
    }

    if (!formData.initialPostBody.trim()) {
      setError(t("forum.contentRequired", "Content is required"));
      return;
    }

    setSubmitting(true);
    try {
      const thread = await forumService.createThread(formData);
      navigate(`/forum/thread/${thread.id}`);
    } catch (error) {
      console.error("Error creating thread:", error);
      setError(t("forum.errorCreatingThread", "Error creating thread. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>{t("forum.createThread", "Create New Thread")}</Title>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>{t("forum.category", "Category")}</Label>
          <Select
            name="forumCategoryId"
            value={formData.forumCategoryId}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>{t("forum.threadTitle", "Thread Title")}</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t("forum.titlePlaceholder", "Enter a descriptive title")}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("forum.content", "Content")}</Label>
          <Textarea
            name="initialPostBody"
            value={formData.initialPostBody}
            onChange={handleChange}
            placeholder={t("forum.contentPlaceholder", "Write your message here...")}
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            {t("common.cancel", "Cancel")}
          </CancelButton>
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? t("forum.creating", "Creating...") : t("forum.createThread", "Create Thread")}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
}
