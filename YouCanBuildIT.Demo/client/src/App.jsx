import "./assets/styles/style.css";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const history = useLocation();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
