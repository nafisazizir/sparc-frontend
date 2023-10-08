import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";

function App() {
  return (
    <>
      <LocationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </>
  );
}

export default App;
