import "./App.css";
import { Frame } from "@shopify/polaris";
import TodoContainer from "../TodoContainer/TodoContainer";

function App() {
  return (
    <div className="App">
        <Frame topBar={topBarMarkup} logo={logo}>
            <TodoContainer />
        </Frame>
    </div>
  );
}

export default App;
