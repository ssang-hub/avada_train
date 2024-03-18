// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import enTranslations from "@shopify/polaris/locales/en.json";
import {AppProvider} from "@shopify/polaris";

import "@shopify/polaris/build/esm/styles.css";

function App() {
  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <Header />
        <Home />
      </AppProvider>
      ,
    </div>
  );
}

export default App;
