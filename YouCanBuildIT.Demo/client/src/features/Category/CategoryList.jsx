import { useEffect, useState } from "react";
import categoryService from "../../api/categoryService";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../common/navigations";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (!categories.length) return <div>No categories found.</div>;

  return (
    <div>
      <h2>Categories</h2>
      <button onClick={() => navigate(navigation.getCategoryCreateUrl())}>
        Create New Category
      </button>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <span>{cat.name}</span>
            <button
              onClick={() => navigate(navigation.getCategoryDetailsUrl(cat.id))}
            >
              Details
            </button>
            <button
              onClick={() => navigate(navigation.getCategoryEditUrl(cat.id))}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
