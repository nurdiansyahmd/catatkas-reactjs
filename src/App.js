import {BrowserRouter, Routes, Route} from "react-router-dom";
import Stocklist from "./components/Stocklist";
import AddStock from "./components/AddStock";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/stocks" element={<Stocklist/>} /> 
          <Route path="/addstock" element={<AddStock/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
