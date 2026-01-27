import "./assets/styles/style.css";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { CookieConsent } from "./components/CookieConsent";

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Main />
      <Footer />
      <CookieConsent />
    </ErrorBoundary>
  );
}

export default App;
