import {BrowserRouter, Routes, Route} from "react-router-dom";
import Stocklist from "./components/StockProductComp/Stocklist";
import AddStock from "./components/StockProductComp/AddStock";
import Editstock from "./components/StockProductComp/EditStock";
import NavbarNav from "./components/NavbarComp/Navbar";
import HomePage from "./components/HomePageComp/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarNav />
        <Routes>
          <Route path="/" element={<HomePage/>} /> 
          <Route path="/stocks" element={<Stocklist/>} /> 
          <Route path="/addstock" element={<AddStock/>} /> 
          <Route path="/editstock/:id" element={<Editstock/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
