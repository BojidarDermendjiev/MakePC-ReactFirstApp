
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productService";
import ProductForm from "../../pages/Product/ProductForm";
import { navigation } from "../../common/navigations";

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {
    setLoading(true);
    try {
      await createProduct(productData);
      navigate(navigation.getProductsUrl());
    } catch (err) {
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default ProductCreate;
