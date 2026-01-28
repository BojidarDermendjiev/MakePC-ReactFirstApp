import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as forumService from "../../api/forumService";
import { AuthContext } from "../../context/AuthContextProvider";
import styles from "../../assets/styles/forumCreateThread.module.css";

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
        setCategories(data || []);
        if (!formData.forumCategoryId && data && data.length > 0) {
          setFormData((prev) => ({ ...prev, forumCategoryId: data[0].id }));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
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
    } catch (err) {
      console.error("Error creating thread:", err);
      setError(
        t(
          "forum.errorCreatingThread",
          "Error creating thread. Please try again.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {t("forum.createThread", "Create New Thread")}
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t("forum.category", "Category")}
          </label>
          <select
            className={styles.select}
            name="forumCategoryId"
            value={formData.forumCategoryId}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t("forum.threadTitle", "Thread Title")}
          </label>
          <input
            className={styles.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t(
              "forum.titlePlaceholder",
              "Enter a descriptive title",
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t("forum.content", "Content")}
          </label>
          <textarea
            className={styles.textarea}
            name="initialPostBody"
            value={formData.initialPostBody}
            onChange={handleChange}
            placeholder={t(
              "forum.contentPlaceholder",
              "Write your message here...",
            )}
          />
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate(-1)}
          >
            {t("common.cancel", "Cancel")}
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {submitting
              ? t("forum.creating", "Creating...")
              : t("forum.createThread", "Create Thread")}
          </button>
        </div>
      </form>
    </div>
  );
}
