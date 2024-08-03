import "./assets/styles/style.css";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Main />
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
