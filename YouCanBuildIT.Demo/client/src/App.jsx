import "./assets/styles/style.css";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { Auth0Provider } from "@auth0/auth0-react";
import {useLocation} from "react-router-dom"

function App() {
  const history = useLocation()

  const onRedirectCallback = (appState) =>{
    history.push(appState?.returnTo || window.location.pathname)
  }
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <Header />
      <Main />
      <Footer />
    </Auth0Provider>
  );
}

export default App;
