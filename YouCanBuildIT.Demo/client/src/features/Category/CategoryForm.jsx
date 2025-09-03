import React, { useState, useEffect } from "react";
import categoryService from "../../api/categoryService";
import { useNavigate, useParams } from "react-router-dom";
import { navigation } from "../../common/navigations";

const CategoryForm = ({ isEdit = false }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      categoryService
        .getCategoryById(id)
        .then((data) =>
          setForm({
            name: data.name || "",
            description: data.description || "",
          })
        )
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEdit) {
      await categoryService.updateCategory(id, form);
      navigate(navigation.getCategoryDetailsUrl(id));
    } else {
      await categoryService.createCategory(form);
      navigate(navigation.getCategoriesUrl());
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit" : "Create"} Category</h2>
      <label>
        Name:
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default CategoryForm;
