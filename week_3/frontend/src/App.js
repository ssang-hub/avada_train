// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import enTranslations from "@shopify/polaris/locales/en.json";
import {AppProvider, Frame} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

function App() {
  const logo = {
    topBarSource:
      "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    width: 86,
    url: "#",
    accessibilityLabel: "Shopify",
  };

  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <Frame>
          <Header topBar={Header} logo={logo} />
          <Home />
        </Frame>
      </AppProvider>
      ,
    </div>
  );
}

export default App;
