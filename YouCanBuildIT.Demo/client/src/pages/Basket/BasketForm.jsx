
import basketService from "../../API/basketService";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate, useParams } from "react-router-dom";

const BasketForm = ({ isEdit = false }) => {
  const { user } = useContext(AuthContext);
  const [basketData, setBasketData] = useState({ status: "", items: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      basketService
        .getBasketById(id)
        .then((data) => setBasketData(data))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setBasketData({ ...basketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newBasket;
    if (isEdit) {
      newBasket = await basketService.updateBasket(id, basketData);
    } else {
      newBasket = await basketService.createBasket({
        ...basketData,
        userId: user?.id,
      });
    }
    setLoading(false);
    navigate(`/basket/${newBasket.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <input
          name="status"
          value={basketData.status || ""}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Basket" : "Create Basket"}
      </button>
    </form>
  );
};

export default BasketForm;
