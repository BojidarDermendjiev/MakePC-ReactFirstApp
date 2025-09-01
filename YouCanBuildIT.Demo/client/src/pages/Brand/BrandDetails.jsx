
import { useParams, useNavigate } from "react-router-dom";
import brandService from "../../API/brandService";
import { navigation } from "../../common/navigations";

const BrandDetails = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    brandService
      .getBrandById(id)
      .then(setBrand)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Delete this brand?")) {
      await brandService.deleteBrand(id);
      navigate(navigation.getBrandsUrl());
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!brand) return <div>Brand not found.</div>;

  return (
    <div>
      <button onClick={() => navigate(navigation.getBrandsUrl())}>
        Back to Brands
      </button>
      <h2>Brand: {brand.name}</h2>
      <div>ID: {brand.id}</div>
      <div>Description: {brand.description}</div>
      <button onClick={() => navigate(navigation.getBrandEditUrl(brand.id))}>
        Edit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BrandDetails;
