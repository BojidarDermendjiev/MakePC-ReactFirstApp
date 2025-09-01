
import { useParams, useNavigate } from "react-router-dom";
import categoryService from "../../api/categoryService";
import { navigation } from "../../common/navigations";

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    categoryService
      .getCategoryById(id)
      .then(setCategory)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Delete this category?")) {
      await categoryService.deleteCategory(id);
      navigate(navigation.getCategoriesUrl());
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!category) return <div>Category not found.</div>;

  return (
    <div>
      <button onClick={() => navigate(navigation.getCategoriesUrl())}>
        Back to Categories
      </button>
      <h2>Category: {category.name}</h2>
      <div>ID: {category.id}</div>
      <div>Description: {category.description}</div>
      <button
        onClick={() => navigate(navigation.getCategoryEditUrl(category.id))}
      >
        Edit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CategoryDetails;
