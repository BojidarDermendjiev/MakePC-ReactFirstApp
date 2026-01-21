import { useEffect, useState } from "react";
import brandService from "../../api/brandService";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../common/navigations";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    brandService
      .getAllBrands()
      .then(setBrands)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading brands...</div>;
  if (!brands.length) return <div>No brands found.</div>;

  return (
    <div>
      <h2>Brands</h2>
      <button onClick={() => navigate(navigation.getBrandCreateUrl())}>
        Create New Brand
      </button>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            <span>{brand.name}</span>
            <button
              onClick={() => navigate(navigation.getBrandDetailsUrl(brand.id))}
            >
              Details
            </button>
            <button
              onClick={() => navigate(navigation.getBrandEditUrl(brand.id))}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;
