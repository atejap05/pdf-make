import "./App.css";
import geraPDF from "./pdfMake/geraPDF";
import DUMMY_DATA from "./assets/dev_data/DUMMY_DATA.json";

function App() {
  return (
    <div className="App">
      <button onClick={() => geraPDF(DUMMY_DATA)}>Open</button>
    </div>
  );
}

export default App;
