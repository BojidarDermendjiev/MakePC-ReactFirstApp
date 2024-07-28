import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./assets/styles/style.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);
  const lng = navigator.language;
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
